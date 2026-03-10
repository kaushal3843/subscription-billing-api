from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.subscription_service import subscribe_user
from app.utils.auth_dependency import get_current_user

router = APIRouter(prefix="/subscriptions", tags=["Subscriptions"])


@router.post("/{user_id}/{plan_id}/{duration}")
def subscribe(user_id: int, plan_id: int, duration: int, db: Session = Depends(get_db)):
    return subscribe_user(db, user_id, plan_id, duration)

@router.post("/{plan_id}")
def subscribe(plan_id: int,
              user_id: int = Depends(get_current_user),
              db: Session = Depends(get_db)):

    return subscribe_user(db, user_id, plan_id, 30)


@router.post("/cancel")
def cancel(user_id: int = Depends(get_current_user),
           db: Session = Depends(get_db)):
    
    return cancel_subscription(db, user_id)