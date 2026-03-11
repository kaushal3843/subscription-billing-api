from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.user_model import User
from app.schemas.user_schema import UserCreate, UserLogin
from app.utils.password import hash_password, verify_password
from app.utils.jwt_handler import create_access_token


def register_user(db: Session, user: UserCreate):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    hashed_pass = hash_password(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_pass,
        role = "user"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

def login_user(db: Session, user: UserLogin):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        data = {
            "user_id" : db_user.id,
            "role": db_user.role
        }
    )

    return {"access_token": token, "token_type": "bearer"}