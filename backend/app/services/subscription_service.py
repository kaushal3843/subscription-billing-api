from sqlalchemy.orm import Session
from datetime import date, timedelta
from fastapi import HTTPException

from app.repositories.subscription_repository import (
    get_user_by_id,
    get_plan_by_id,
    get_active_subscription,
    get_subscription_by_user,
    create_subscription,
    update_subscription_status
)

def subscribe_user(db: Session, user_id: int, plan_id: int):

    try:
        user = get_user_by_id(db, user_id)

        if not user or user.role == "admin":
            raise HTTPException(
                status_code=403,
                detail="Admins are not allowed to subscribe to plans"
            )

        existing_subscription = get_active_subscription(db, user_id)

        if existing_subscription:
            raise HTTPException(
                status_code=400,
                detail="User already has an active subscription"
            )

        plan = get_plan_by_id(db, plan_id)

        if not plan:
            raise HTTPException(
                status_code=404,
                detail="Plan not found"
            )
        
        start_date = date.today()
        expiry_date = start_date + timedelta(days=plan.duration_days)

        return create_subscription(
            db,
            user_id,
            plan_id,
            start_date,
            expiry_date
        )

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Service error while subscribing user"
        )

def cancel_subscription(db: Session, user_id: int):

    try:
        subscription = get_subscription_by_user(db, user_id)

        if not subscription:
            raise HTTPException(
                status_code=404,
                detail="No active subscription found"
            )

        return update_subscription_status(db, subscription, "cancelled")

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Service error while cancelling subscription"
        )
def get_user_subscription(db, user_id):
    return get_active_subscription(db, user_id)