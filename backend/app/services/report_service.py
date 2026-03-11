from sqlalchemy.orm import Session
from app.repositories.report_repository import get_revenue_summary

def revenue_summary(db: Session):

    results = get_revenue_summary(db)

    return [
        {
            "plan_name": r.plan_name,
            "subscribers": r.subscribers,
            "revenue": float(r.revenue)
        }
        for r in results
    ]