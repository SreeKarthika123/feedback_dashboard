from fastapi import FastAPI

from routes import user_routes, feedback_routes,notifications_routes
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Or ["http://localhost:3000"] for safety
    allow_credentials=True,
    allow_methods=["*"],   # Allow POST, GET, OPTIONS, etc.
    allow_headers=["*"],
)
app.include_router(user_routes.router)
app.include_router(feedback_routes.router)
# app.include_router(feedback_routes.router)
app.include_router(notifications_routes.router)
# from routes.auth import router as auth_router

# app.include_router(auth_router)