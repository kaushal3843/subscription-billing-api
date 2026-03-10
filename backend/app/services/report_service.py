from sqlalchemy.orm import Session
from app.models.subscription_model import Subscription
from app.models.plan_model import Plan


def revenue_summary(db: Session):

    results = db.query(Plan.price).join(
        Subscription, Subscription.plan_id == Plan.id
    ).all()

    total_revenue = sum([r[0] for r in results])

    total_subscriptions = len(results)

    return {
        "total_revenue": total_revenue,
        "total_subscriptions": total_subscriptions
    }