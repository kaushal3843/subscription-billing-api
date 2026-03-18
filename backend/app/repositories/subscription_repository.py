from sqlalchemy.orm import Session
from fastapi import HTTPException
from datetime import date
from app.models.subscription_model import Subscription
from app.models.user_model import User
from app.models.plan_model import Plan

def get_user_by_id(db: Session, user_id: int):
    try:
        return db.query(User).filter(User.id == user_id).first()
    except Exception as e:
        raise HTTPException(500, f"Error fetching user: {str(e)}")

def get_plan_by_id(db: Session, plan_id: int):
    try:
        return db.query(Plan).filter(Plan.id == plan_id).first()
    except Exception as e:
        raise HTTPException(500, f"Error fetching plan: {str(e)}")

def get_active_subscription(db: Session, user_id: int):
    try:
        subscription = db.query(Subscription).filter(
        Subscription.user_id == user_id,
        Subscription.status == "active"
        ).order_by(Subscription.id.desc()).first()

        if subscription and subscription.expiry_date <= date.today():
            subscription.status = "expired"
            db.add(subscription)
            db.commit()
            return None

        return subscription
        
    except Exception as e:
        raise HTTPException(500, f"Error fetching active subscription: {str(e)}")
    
def get_subscription_by_user(db: Session, user_id: int):
    try:
        return db.query(Subscription).filter(
            Subscription.user_id == user_id,
            Subscription.status == "active"
        ).first()
    except Exception as e:
        raise HTTPException(500, f"Error fetching subscription: {str(e)}")

def create_subscription(db: Session, user_id: int, plan_id: int, start_date, expiry_date):
    try:
        subscription = Subscription(
            user_id=user_id,
            plan_id=plan_id,
            start_date=start_date,
            expiry_date=expiry_date,
            status="active"
        )

        db.add(subscription)
        db.commit()
        db.refresh(subscription)

        return subscription

    except Exception as e:
        db.rollback()
        raise HTTPException(500, f"Error creating subscription: {str(e)}")

def update_subscription_status(db: Session, subscription: Subscription, status: str):
    try:
        subscription.status = status
        db.commit()
        db.refresh(subscription)
        return subscription

    except Exception as e:
        db.rollback()
        raise HTTPException(500, f"Error updating subscription: {str(e)}")