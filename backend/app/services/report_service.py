from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repositories.report_repository import get_revenue_summary

def revenue_summary(db: Session):

    try:
        results = get_revenue_summary(db)

        return [
            {
                "plan_name": r.plan_name,
                "subscribers": r.subscribers,
                "revenue": float(r.revenue)
            }
            for r in results
        ]
    
    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail="Service error while generating revenue summary"
        )