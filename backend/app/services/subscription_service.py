from sqlalchemy.orm import Session
from datetime import date, timedelta
from app.repositories.subscription_repository import create_subscription
from app.models.subscription_model import Subscription


def subscribe_user(db: Session, user_id: int, plan_id: int, duration_days: int):

    start_date = date.today()
    expiry_date = start_date + timedelta(days=duration_days)

    subscription = create_subscription(
        db,
        user_id,
        plan_id,
        start_date,
        expiry_date
    )

    return subscription


def cancel_subscription(db: Session, user_id: int):

    subscription = db.query(Subscription).filter(
        Subscription.user_id == user_id
    ).first()

    if not subscription:
        raise Exception("Subscription not found")

    subscription.status = "cancelled"

    db.commit()

    return {"message": "Subscription cancelled"}


def check_subscription_expiry(db: Session, user_id: int):

    subscription = db.query(Subscription).filter(
        Subscription.user_id == user_id
    ).first()

    if not subscription:
        raise Exception("Subscription not found")

    # Expiry Logic
    if subscription.expiry_date < date.today():
        subscription.status = "expired"
        db.commit()

    return subscription