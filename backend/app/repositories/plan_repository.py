from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.plan_model import Plan

def create_plan(db: Session, name: str, price: float, duration_days: int):
    try:
        plan = Plan(
            name=name,
            price=price,
            duration_days=duration_days
        )

        db.add(plan)
        db.commit()
        db.refresh(plan)

        return plan

    except Exception as e:
        db.rollback()
        raise e

def get_all_plans(db: Session):
    try:
        plans = db.query(Plan).all()
        return plans

    except Exception as e:
        raise e

def update_plan(db: Session, plan_id: int, name: str, price: float, duration_days: int):
    try:
        plan = db.query(Plan).filter(Plan.id == plan_id).first()

        if not plan:
            raise HTTPException(status_code=404, detail="Plan not found")

        plan.name = name
        plan.price = price
        plan.duration_days = duration_days

        db.commit()
        db.refresh(plan)

        return plan

    except HTTPException:
        raise

    except Exception as e:
        db.rollback()
        raise e

def delete_plan(db: Session, plan_id: int):
    try:
        plan = db.query(Plan).filter(Plan.id == plan_id).first()

        if not plan:
            raise HTTPException(status_code=404, detail="Plan not found")

        db.delete(plan)
        db.commit()

        return {"message": "Plan deleted successfully"}

    except HTTPException:
        raise

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Error deleting plan: {str(e)}"
        )