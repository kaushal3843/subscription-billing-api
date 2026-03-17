from sqlalchemy.orm import Session
from datetime import date, timedelta
from fastapi import HTTPException
from app.repositories.subscription_repository import create_subscription
from app.models.subscription_model import Subscription
from app.models.plan_model import Plan
from app.models.user_model import User

def subscribe_user(db: Session, user_id: int, plan_id: int):

    try:

        user = db.query(User).filter(User.id == user_id).first()
        if not user or user.role == "admin":
            raise HTTPException(
                status_code=403, 
                detail="Admins are not allowed to subscribe to plans"
            )
        
        existing_subscription = db.query(Subscription).filter(
            Subscription.user_id == user_id,
            Subscription.expiry_date >= date.today()
        ).first()

        if existing_subscription:
            raise HTTPException(
                status_code=400,
                detail="User already has an active subscription"
            )

        plan = db.query(Plan).filter(Plan.id == plan_id).first()

        if not plan:
            raise HTTPException(
                status_code=404,
                detail="Plan not found"
            )

        duration_days = plan.duration_days

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

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Service error while subscribing user"
        )


def cancel_subscription(db: Session, user_id: int):

    try:
        subscription = db.query(Subscription).filter(
            Subscription.user_id == user_id
        ).first()

        if not subscription:
            raise HTTPException(
                status_code=404,
                detail="Subscription not found"
            )

        db.delete(subscription)
        db.commit()

        return {"message": "Subscription cancelled"}

    except HTTPException:
        raise

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Service error while cancelling subscription"
        )