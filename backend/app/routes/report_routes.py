from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.report_service import revenue_summary
from app.utils.auth_dependency import get_current_admin

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/revenue-summary")
def get_revenue_report(
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return revenue_summary(db)