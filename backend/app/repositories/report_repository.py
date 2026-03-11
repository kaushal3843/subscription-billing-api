from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.plan_model import Plan
from app.models.subscription_model import Subscription

def get_revenue_summary(db: Session):

    return (
        db.query(
            Plan.name.label("plan_name"),
            func.count(Subscription.id).label("subscribers"),
            (func.count(Subscription.id) * Plan.price).label("revenue")
        )
        .join(Subscription, Plan.id == Subscription.plan_id)
        .group_by(Plan.id)
        .all()
    )