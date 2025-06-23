from fastapi import APIRouter, Depends, Body, HTTPException
from bson import ObjectId
from db import db
from datetime import datetime
from auth import verify_token
from models import AcknowledgeRequest
router = APIRouter()
@router.post("/feedback")
async def submit_feedback(
    employee_id: str = Body(...),   # ✅ use id
    strengths: str = Body(...),
    areas_to_improve: str = Body(...),
    sentiment: str = Body(...),
    user = Depends(verify_token)
):
    if user["role"] != "manager":
        raise HTTPException(status_code=403, detail="Only managers can submit")

    # Find employee by ID instead of name
    employee = await db["users"].find_one({"_id": ObjectId(employee_id), "role": "employee"})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    feedback = {
        "manager_id": ObjectId(user["id"]),
        "employee_id": employee["_id"],
        "strengths": strengths,
        "areas_to_improve": areas_to_improve,
        "sentiment": sentiment,
        "acknowledged": False,
         "created_at": datetime.utcnow()
    }
    await db["feedbacks"].insert_one(feedback)
    await db["notifications"].insert_one({
        "user_id": employee["_id"],
        "message": f"New feedback submitted by your manager.",
        "read": False,
        "created_at": datetime.utcnow()
    })
    return {"msg": "Feedback submitted"}
@router.get("/employees")
async def get_employees(user = Depends(verify_token)):
    if user["role"] != "manager":
        raise HTTPException(status_code=403)
    cursor = db["users"].find({"role": "employee", "manager_id": ObjectId(user["id"])})
    employees = []
    async for emp in cursor:
        employees.append({
            "id": str(emp["_id"]),
            "name": emp["name"],
            "email": emp["email"]
        })
    return employees
@router.get("/feedback")
async def get_feedback(user = Depends(verify_token)):
    if user["role"] == "employee":
        cursor = db["feedbacks"].find({"employee_id": ObjectId(user["id"])})
    elif user["role"] == "manager":
        cursor = db["feedbacks"].find({"manager_id": ObjectId(user["id"])})
    else:
        raise HTTPException(status_code=403)

    results = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        doc["employee_id"] = str(doc["employee_id"])
        doc["manager_id"] = str(doc["manager_id"])
        doc.pop("_id")
        results.append(doc)

    return results
# @router.put("/feedback/{feedback_id}")
# async def update_feedback(
#     feedback_id: str,
#     strengths: str = Body(...),
#     areas_to_improve: str = Body(...),
#     sentiment: str = Body(...),
#     user = Depends(verify_token)
# ):
#     feedback = await db["feedbacks"].find_one({"_id": ObjectId(feedback_id)})
#     if not feedback or str(feedback["manager_id"]) != user["id"]:
#         raise HTTPException(status_code=403, detail="Unauthorized to update this feedback")

#     await db["feedbacks"].update_one(
#         {"_id": ObjectId(feedback_id)},
#         {"$set": {
#             "strengths": strengths,
#             "areas_to_improve": areas_to_improve,
#             "sentiment": sentiment
#         }}
#     )
#     return {"msg": "Feedback updated successfully"}



from datetime import datetime

@router.put("/feedback/{feedback_id}")
async def update_feedback(
    feedback_id: str,
    strengths: str = Body(...),
    areas_to_improve: str = Body(...),
    sentiment: str = Body(...),
    user = Depends(verify_token)
):
    # ✅ 1️⃣ Find the feedback first
    feedback = await db["feedbacks"].find_one({"_id": ObjectId(feedback_id)})
    if not feedback or str(feedback["manager_id"]) != user["id"]:
        raise HTTPException(status_code=403, detail="Unauthorized to update this feedback")

    # ✅ 2️⃣ Update the feedback
    await db["feedbacks"].update_one(
        {"_id": ObjectId(feedback_id)},
        {"$set": {
            "strengths": strengths,
            "areas_to_improve": areas_to_improve,
            "sentiment": sentiment,
            "acknowledged": False
        }}
    )

    # ✅ 3️⃣ Insert notification for employee
    await db["notifications"].insert_one({
        "user_id": feedback["employee_id"],
        "message": "Your manager has updated your feedback.",
        "read": False,
        "created_at": datetime.utcnow()
    })

    # ✅ 4️⃣ Return success response
    return {"msg": "Feedback updated successfully"}

@router.post("/feedback/acknowledge")
async def acknowledge(
    req: AcknowledgeRequest,
    user = Depends(verify_token)
):
    feedback_id = req.feedback_id
    comment = req.comment


    feedback = await db["feedbacks"].find_one({"_id": ObjectId(feedback_id)})
    if not feedback or feedback["employee_id"] != ObjectId(user["id"]):
        raise HTTPException(status_code=403)

    update_fields = {"acknowledged": True}
    if comment:
        update_fields["comment"] = comment

    await db["feedbacks"].update_one(
        {"_id": ObjectId(feedback_id)},
        {"$set": update_fields}
    )

    return {"msg": "Acknowledged and comment saved"}
@router.post("/feedback/request")
async def request_feedback(user = Depends(verify_token)):
    if user["role"] != "employee":
        raise HTTPException(status_code=403, detail="Only employees can request feedback")

    # Create a notification for the manager
    employee = await db["users"].find_one({"_id": ObjectId(user["id"])})
    manager_id = employee.get("manager_id")
    if not manager_id:
        raise HTTPException(status_code=400, detail="No manager assigned")

    await db["notifications"].insert_one({
        "user_id": manager_id,
        "message": f"{employee['name']} requested feedback.",
        "read": False,
        "created_at": datetime.utcnow()
    })

    return {"msg": "Feedback request sent to your manager"}