from sqlalchemy.orm import Session
from app.repositories.user_repository import create_user, get_user_by_email
from app.utils.jwt_handler import create_access_token
from app.repositories.user_repository import get_user_by_email

def register_user(db: Session, name: str, email: str, password: str):
    
    existing_user = get_user_by_email(db, email)

    if existing_user:
        raise Exception("User already exists")

    user = create_user(db, name, email, password)

    return user

def login_user(db, email, password):

    user = get_user_by_email(db, email)

    if not user:
        raise Exception("User not found")

    if user.password != password:
        raise Exception("Invalid password")

    token = create_access_token({"user_id": user.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }