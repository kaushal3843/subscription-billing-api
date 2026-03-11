from sqlalchemy.orm import Session
from app.repositories.plan_repository import (
    create_plan,
    get_all_plans,
    update_plan,
    delete_plan
)

def add_plan(db: Session, name: str, price: float, duration_days: int):
    return create_plan(db, name, price, duration_days)

def list_plans(db: Session):
    return get_all_plans(db)

def edit_plan(db: Session, plan_id: int, name: str, price: float, duration_days: int):
    return update_plan(db, plan_id, name, price, duration_days)

def remove_plan(db: Session, plan_id: int):
    return delete_plan(db, plan_id)