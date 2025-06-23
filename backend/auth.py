# from fastapi import HTTPException, Depends
# from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
# from jose import jwt, JWTError
# from decouple import config

# SECRET_KEY = config("SECRET_KEY", default="secret")
# ALGORITHM = "HS256"
# security = HTTPBearer()

# def create_token(data: dict):
#     return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

# def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
#     try:
#         payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
#         return payload
#     except JWTError:
#         raise HTTPException(status_code=401, detail="Invalid token")


from datetime import datetime, timedelta
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from decouple import config

SECRET_KEY = config("SECRET_KEY", default="secret")
ALGORITHM = "HS256"
security = HTTPBearer()

def create_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=30))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
