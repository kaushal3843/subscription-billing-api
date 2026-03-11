from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.utils.jwt_handler import verify_token

security = HTTPBearer()


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):

    token = credentials.credentials

    payload = verify_token(token)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    return payload


def get_current_admin(current_user = Depends(get_current_user)):

    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return current_user