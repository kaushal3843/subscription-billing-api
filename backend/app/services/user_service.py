from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.schemas.user_schema import UserCreate, UserLogin
from app.repositories.user_repository import get_user_by_email, create_user
from app.utils.password import hash_password, verify_password
from app.utils.jwt_handler import create_access_token


already_exists_exception = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="Email already registered"
)

invalid_credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid credentials"
)


def register_user(db: Session, user: UserCreate):

    try:
        existing_user = get_user_by_email(db, user.email)

        if existing_user:
            raise already_exists_exception

        hashed_password = hash_password(user.password)

        new_user = create_user(
            db,
            name=user.name,
            email=user.email,
            password=hashed_password
        )

        return new_user

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Service error while registering user"
        )


def login_user(db: Session, user: UserLogin):

    try:
        db_user = get_user_by_email(db, user.email)

        if not db_user:
            raise invalid_credentials_exception

        if not verify_password(user.password, db_user.password):
            raise invalid_credentials_exception

        token = create_access_token(
            data={
                "user_id": db_user.id,
                "role": db_user.role
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "role": db_user.role
        }

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Service error while logging in"
        )