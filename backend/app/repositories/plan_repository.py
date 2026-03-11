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

def update_plan(db: Session, plan_id: int, name: str, price: float, duration_days: int):

    plan = db.query(Plan).filter(Plan.id == plan_id).first()

    if not plan:
        return None

    plan.name = name
    plan.price = price
    plan.duration_days = duration_days

    db.commit()
    db.refresh(plan)

    return plan

def delete_plan(db: Session, plan_id: int):

    plan = db.query(Plan).filter(Plan.id == plan_id).first()

    if not plan:
        return None

    db.delete(plan)
    db.commit()

    return plan