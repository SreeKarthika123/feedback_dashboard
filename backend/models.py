from pydantic import BaseModel, EmailStr
from typing import Literal
from typing import Literal, Optional
from datetime import datetime
class User(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Literal["manager", "employee"]

class Feedback(BaseModel):
    employee_id: str
    strengths: str
    areas_to_improve: str
    sentiment: Literal["positive", "neutral", "negative"]
# class AcknowledgeRequest(BaseModel):
#     feedback_id: str
class AcknowledgeRequest(BaseModel):
    feedback_id: str
    comment: Optional[str] = None

from pydantic import BaseModel

class FeedbackUpdate(BaseModel):
    strengths: str
    areas_to_improve: str
    sentiment: Literal["positive", "neutral", "negative"]
    comment: Optional[str] = None
class Notification(BaseModel):
    id: Optional[str]  # This is the _id as string, optional when creating
    user_id: str
    message: str
    read: bool = False
    created_at: datetime
class ForgotPasswordRequest(BaseModel):
    email: str
class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str