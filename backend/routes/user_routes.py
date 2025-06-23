# from fastapi import APIRouter, HTTPException, Body
# from passlib.hash import bcrypt
# from db import db
# from auth import create_token
# from fastapi import Depends
# from auth import verify_token
# from fastapi_mail import FastMail, MessageSchema, ConnectionConfig  # ✅ add this
# from decouple import config
# from auth import create_token
# from db import db
# from passlib.hash import bcrypt
# from bson import ObjectId
# from datetime import timedelta
# from fastapi import APIRouter, HTTPException, Body, Depends

# from bson import ObjectId
# router = APIRouter()
from fastapi import APIRouter, HTTPException, Body, Depends
from passlib.hash import bcrypt
from db import db
from auth import create_token, verify_token
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from decouple import config
from bson import ObjectId
from datetime import timedelta
from jose import jwt, JWTError
from models import ForgotPasswordRequest,ResetPasswordRequest

router = APIRouter()

# ✅ Setup FastAPI-Mail config once
conf = ConnectionConfig(
    MAIL_USERNAME = config("SMTP_USERNAME"),
    MAIL_PASSWORD = config("SMTP_PASSWORD"),
    MAIL_FROM = config("FROM_EMAIL"),
    MAIL_PORT = config("SMTP_PORT", cast=int),
    MAIL_SERVER = config("SMTP_SERVER"),
    MAIL_STARTTLS = True,     # ✅ correct new name
    MAIL_SSL_TLS = False, 
    # MAIL_TLS = True,
    # MAIL_SSL = False,
    USE_CREDENTIALS = True
)

fm = FastMail(conf)

# ✅ Secret for JWT
SECRET_KEY = config("SECRET_KEY", default="secret")
ALGORITHM = "HS256"

# -------------------------------
# 📩 Forgot Password
# -------------------------------
@router.post("/forgot-password")
async def forgot_password(data: ForgotPasswordRequest):
    email = data.email
    user = await db["users"].find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="Email not found")

    reset_token = create_token(
        {"id": str(user["_id"]), "purpose": "reset"},
        expires_delta=timedelta(minutes=30)
    )

    reset_link = f"http://localhost:3000/reset-password?token={reset_token}"

    message = MessageSchema(
        subject="Password Reset",
        recipients=[email],
        body=f"Click the link to reset your password: {reset_link}",
        subtype="plain"
    )

    await fm.send_message(message)
    return {"msg": "Reset link sent to your email!"}

# -------------------------------
# 🔑 Reset Password
# -------------------------------
@router.post("/reset-password")
async def reset_password(data: ResetPasswordRequest):
    token = data.token
    new_password = data.new_password

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("purpose") != "reset":
            raise HTTPException(status_code=400, detail="Invalid token purpose")
        user_id = payload["id"]
    except JWTError:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    hashed = bcrypt.hash(new_password)
    await db["users"].update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"password_hash": hashed}}
    )
    return {"msg": "Password has been reset successfully!"}
# -------------------------------
# 📝 Register
# -------------------------------
@router.post("/register")
async def register(
    name: str = Body(...),
    email: str = Body(...),
    password: str = Body(...),
    role: str = Body(...)
):
    existing = await db["users"].find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="Email exists")

    hashed = bcrypt.hash(password)
    user = {
        "name": name,
        "email": email,
        "password_hash": hashed,
        "role": role
    }
    await db["users"].insert_one(user)
    return {"msg": "User created"}



@router.post("/register")
async def register(name: str = Body(...), email: str = Body(...), password: str = Body(...), role: str = Body(...)):
    existing = await db["users"].find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="Email exists")
    hashed = bcrypt.hash(password)
    user = {"name": name, "email": email, "password_hash": hashed, "role": role}
    await db["users"].insert_one(user)
    return {"msg": "User created"}

# @router.post("/login")
# async def login(email: str = Body(...), password: str = Body(...)):
#     user = await db["users"].find_one({"email": email})
#     if not user or not bcrypt.verify(password, user["password_hash"]):
#         raise HTTPException(status_code=401, detail="Invalid credentials")
#     token = create_token({"id": str(user["_id"]), "role": user["role"]})
#     return {"token": token, "role": user["role"]}

from fastapi import HTTPException, Body, Depends

@router.post("/login")
async def login(email: str = Body(...), password: str = Body(...)):
    user = await db["users"].find_one({"email": email})
    if not user or not bcrypt.verify(password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # ✅ Check if employee has a denied request
    if user["role"] == "employee":
        denied = await db["requests"].find_one({
            "employee_id": user["_id"],
            "status": "denied"
        })
        if denied:
            raise HTTPException(
                status_code=403,
                detail="Your manager has denied your access."
            )

    token = create_token({"id": str(user["_id"]), "role": user["role"]})
    return {"token": token, "role": user["role"]}

from datetime import datetime

@router.post("/register_employee")
async def register_employee(
    name: str = Body(...),
    email: str = Body(...),
    password: str = Body(...),
    user = Depends(verify_token)  # <-- logged-in manager
):
    if user["role"] != "manager":
        raise HTTPException(status_code=403, detail="Only managers can register employees")

    existing = await db["users"].find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed = bcrypt.hash(password)
    employee = {
        "name": name,
        "email": email,
        "password_hash": hashed,
        "role": "employee",
        "manager_id": ObjectId(user["id"])  # ✅ link to manager
    }

    result = await db["users"].insert_one(employee)

    # ✅ Create notification for new employee
    await db["notifications"].insert_one({
        "user_id": result.inserted_id,
        "message": "Your account has been created by your manager.",
        "read": False,
        "created_at": datetime.utcnow()
    })

    return {"msg": "Employee registered successfully"}




# Get all managers
@router.get("/managers")
async def get_managers():
    cursor = db["users"].find({"role": "manager"})
    managers = []
    async for m in cursor:
        managers.append({
            "id": str(m["_id"]),
            "name": m["name"],
            "email": m["email"]
        })
    return managers

# Employee sends request to manager
@router.post("/assign-request")
async def request_manager(manager_id: str, user = Depends(verify_token)):
    if user["role"] != "employee":
        raise HTTPException(status_code=403)
    await db["requests"].insert_one({
        "employee_id": ObjectId(user["id"]),
        "manager_id": ObjectId(manager_id),
        "status": "pending"
    })
    return {"msg": "Request sent"}

# Manager sees requests
@router.get("/requests")
async def get_requests(user = Depends(verify_token)):
    if user["role"] != "manager":
        raise HTTPException(status_code=403)
    cursor = db["requests"].find({
        "manager_id": ObjectId(user["id"]),
        "status": "pending"
    })
    results = []
    async for r in cursor:
        employee = await db["users"].find_one({"_id": r["employee_id"]})
        results.append({
            "id": str(r["_id"]),
            "employee_name": employee["name"],
            "employee_email": employee["email"]
        })
    return results

# Manager approves request
@router.post("/requests/{request_id}/approve")
async def approve_request(request_id: str, user = Depends(verify_token)):
    if user["role"] != "manager":
        raise HTTPException(status_code=403)
    req = await db["requests"].find_one({"_id": ObjectId(request_id)})
    if not req or str(req["manager_id"]) != user["id"]:
        raise HTTPException(status_code=404)
    # Update employee
    await db["users"].update_one(
        {"_id": req["employee_id"]},
        {"$set": {"manager_id": ObjectId(user["id"])}}
    )
    # Mark request approved
    await db["requests"].update_one(
        {"_id": ObjectId(request_id)},
        {"$set": {"status": "approved"}}
    )
    return {"msg": "Request approved & employee linked"}
from fastapi import HTTPException, Depends
from bson import ObjectId

@router.post("/requests/{request_id}/deny")
async def deny_request(request_id: str, user = Depends(verify_token)):
    if user["role"] != "manager":
        raise HTTPException(status_code=403)

    req = await db["requests"].find_one({"_id": ObjectId(request_id)})
    if not req or str(req["manager_id"]) != user["id"]:
        raise HTTPException(status_code=404)

    # Mark request as denied
    await db["requests"].update_one(
        {"_id": ObjectId(request_id)},
        {"$set": {"status": "denied"}}
    )

    return {"msg": "Request denied successfully"}

@router.get("/me")
async def me(user = Depends(verify_token)):
    db_user = await db["users"].find_one({"_id": ObjectId(user["id"])})
    return {
        "id": str(db_user["_id"]),
        "name": db_user["name"],
        "email": db_user["email"],
        "role": db_user["role"],
        "manager_id": str(db_user.get("manager_id")) if db_user.get("manager_id") else None
    }
