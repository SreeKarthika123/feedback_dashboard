from fastapi import APIRouter, Depends, HTTPException
from db import db
from auth import verify_token
from bson import ObjectId
from datetime import datetime
from models import Notification  # ✅ Import your Pydantic Notification model

router = APIRouter()

# ✅ Get all notifications for the logged-in user
@router.get("/notifications", response_model=list[Notification])
async def get_notifications(user = Depends(verify_token)):
    cursor = db["notifications"].find({"user_id": ObjectId(user["id"])})
    results = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])                  # ✅ map _id -> id
        doc["user_id"] = str(doc["user_id"])         # ✅ stringify ObjectId
        doc.pop("_id")
        results.append(doc)
    return results

# ✅ Mark notification as read
@router.post("/notifications/read/{notif_id}")
async def mark_as_read(notif_id: str, user = Depends(verify_token)):
    notif = await db["notifications"].find_one({
        "_id": ObjectId(notif_id),
        "user_id": ObjectId(user["id"])
    })
    if not notif:
        raise HTTPException(status_code=404, detail="Notification not found")

    await db["notifications"].update_one(
        {"_id": ObjectId(notif_id)},
        {"$set": {"read": True}}
    )
    return {"msg": "Notification marked as read"}
