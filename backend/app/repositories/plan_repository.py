from sqlalchemy.orm import Session
from app.models.plan_model import Plan


def create_plan(db: Session, name: str, price: float, duration_days: int):
    plan = Plan(name=name, price=price, duration_days=duration_days)
    db.add(plan)
    db.commit()
    db.refresh(plan)
    return plan


def get_all_plans(db: Session):
    return db.query(Plan).all()