from sqlalchemy.orm import Session
from app.models.subscription_model import Subscription


def create_subscription(db: Session, user_id: int, plan_id: int, start_date, expiry_date):
    subscription = Subscription(
        user_id=user_id,
        plan_id=plan_id,
        start_date=start_date,
        expiry_date=expiry_date
    )
    db.add(subscription)
    db.commit()
    db.refresh(subscription)
    return subscription