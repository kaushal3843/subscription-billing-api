from sqlalchemy.orm import Session
from app.repositories.plan_repository import create_plan, get_all_plans


def add_plan(db: Session, name: str, price: float, duration_days: int):
    return create_plan(db, name, price, duration_days)


def list_plans(db: Session):
    return get_all_plans(db)