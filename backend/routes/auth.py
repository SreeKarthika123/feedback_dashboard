# 
from decouple import config
# from fastapi import APIRouter, HTTPException, Body
# from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
# from passlib.hash import bcrypt
# from bson import ObjectId
# from datetime import timedelta

# from auth import create_token
# from db import db

# router = APIRouter()

# # SMTP config
# conf = ConnectionConfig(
#     MAIL_USERNAME = config("SMTP_USERNAME"),
#     MAIL_PASSWORD = config("SMTP_PASSWORD"),
#     MAIL_FROM = config("FROM_EMAIL"),
#     MAIL_PORT = config("SMTP_PORT", cast=int),
#     MAIL_SERVER = config("SMTP_SERVER"),
#     MAIL_TLS = True,
#     MAIL_SSL = False,
#     USE_CREDENTIALS = True
# )

# fm = FastMail(conf)