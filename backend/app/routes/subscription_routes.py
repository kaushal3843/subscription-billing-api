from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.subscription_service import subscribe_user
from app.utils.auth_dependency import get_current_user
from app.services.subscription_service import cancel_subscription
from app.models.subscription_model import Subscription
router = APIRouter(prefix="/subscriptions", tags=["Subscriptions"])
 
 
@router.post("/{user_id}/{plan_id}/{duration}")
def subscribe(user_id: int, plan_id: int, duration: int, db: Session = Depends(get_db)):
    return subscribe_user(db, user_id, plan_id, duration)
 
@router.post("/cancel")
def cancel(user_id: int = Depends(get_current_user),
           db: Session = Depends(get_db)):
    
    return cancel_subscription(db, user_id)
 
 
@router.post("/{plan_id}")
def subscribe(plan_id: int,
              user_id: int = Depends(get_current_user),
              db: Session = Depends(get_db)):
 
    return subscribe_user(db, user_id, plan_id, 30)
 
 
@router.get("/me")
def get_my_subscription(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
 
    user_id = current_user
 
    subscription = db.query(Subscription).filter(
        Subscription.user_id == user_id
    ).first()
 
    if not subscription:
        return {"message": "No active subscription"}
 
    return subscription