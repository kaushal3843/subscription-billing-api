from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.plan_schema import PlanCreate
from app.services.plan_service import add_plan, list_plans, edit_plan, remove_plan
from app.utils.auth_dependency import get_current_admin

router = APIRouter(prefix="/plans", tags=["Plans"])

@router.post("/")
def create_plan(
    plan: PlanCreate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return add_plan(db, plan.name, plan.price, plan.duration_days)

@router.get("/")
def get_plans(db: Session = Depends(get_db)):
    return list_plans(db)

@router.put("/{plan_id}")
def update_plan_route(
    plan_id: int,
    plan: PlanCreate,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return edit_plan(db, plan_id, plan.name, plan.price, plan.duration_days)

@router.delete("/{plan_id}")
def delete_plan_route(
    plan_id: int,
    db: Session = Depends(get_db),
    admin = Depends(get_current_admin)
):
    return remove_plan(db, plan_id)