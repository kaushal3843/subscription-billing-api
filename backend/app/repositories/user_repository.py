from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.user_model import User

def create_user(db: Session, name: str, email: str, password: str):

    try:
        user = User(
            name=name,
            email=email,
            password=password
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Error creating user: {str(e)}"
        )

def get_user_by_email(db: Session, email: str):

    try:
        user = db.query(User).filter(User.email == email).first()

        return user

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching user: {str(e)}"
        )