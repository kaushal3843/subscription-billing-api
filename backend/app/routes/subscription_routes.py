from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.subscription_service import subscribe_user, cancel_subscription
from app.utils.auth_dependency import get_current_user
from app.models.subscription_model import Subscription

router = APIRouter(prefix="/subscriptions", tags=["Subscriptions"])

@router.post("/cancel")
def cancel(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    if current_user.get("role") == "admin":
        raise HTTPException(
            status_code=403, 
            detail="Admins are not allowed to subscribe to plans"
        )
    user_id = current_user["user_id"]
    return cancel_subscription(db, user_id)

@router.post("/{plan_id}")
def subscribe(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    user_id = current_user["user_id"]
    return subscribe_user(db, user_id, plan_id)
@router.get("/me")
def get_my_subscription(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    user_id = current_user["user_id"]

    subscription = db.query(Subscription).filter(
        Subscription.user_id == user_id
    ).first()

    if not subscription:
        return {"message": "No active subscription"}

    return subscription