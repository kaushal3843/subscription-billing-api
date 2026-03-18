from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import HTTPException
from app.models.plan_model import Plan
from app.models.subscription_model import Subscription

def get_revenue_summary(db: Session):

    try:
        results = (
            db.query(
                Plan.name.label("plan_name"),
                func.count(Subscription.id).label("subscribers"),
                (func.count(Subscription.id) * Plan.price).label("revenue")
            )
            .join(
                Subscription, 
                (Plan.id == Subscription.plan_id)&
                (Subscription.status == "active") 
            )
            .group_by(Plan.id)
            .all()
        )

        return results

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Error generating revenue summary: {str(e)}"
        )