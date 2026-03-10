from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.report_service import revenue_summary

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/revenue")
def get_revenue(db: Session = Depends(get_db)):
    return revenue_summary(db)