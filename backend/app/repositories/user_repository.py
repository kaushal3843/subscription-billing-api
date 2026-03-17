from sqlalchemy.orm import Session
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
        raise e

def get_user_by_email(db: Session, email: str):

    try:
        user = db.query(User).filter(User.email == email).first()

        return user

    except Exception as e:
        raise e