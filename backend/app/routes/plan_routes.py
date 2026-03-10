from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.plan_schema import PlanCreate
from app.services.plan_service import add_plan, list_plans

router = APIRouter(prefix="/plans", tags=["Plans"])


@router.post("/")
def create_plan(plan: PlanCreate, db: Session = Depends(get_db)):
    return add_plan(db, plan.name, plan.price, plan.duration_days)


@router.get("/")
def get_plans(db: Session = Depends(get_db)):
    return list_plans(db)