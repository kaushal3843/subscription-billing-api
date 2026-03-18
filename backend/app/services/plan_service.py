from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repositories.plan_repository import (
    create_plan,
    get_all_plans,
    update_plan,
    delete_plan
)

def add_plan(db: Session, name: str, price: float, duration_days: int):
    try:
        return create_plan(db, name, price, duration_days)

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Service error while creating plan: {str(e)}"
        )

def list_plans(db: Session):
    try:
        return get_all_plans(db)

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Service error while fetching plans: {str(e)}"
        )

def edit_plan(db: Session, plan_id: int, name: str, price: float, duration_days: int):
    try:
        return update_plan(db, plan_id, name, price, duration_days)

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Service error while updating plan: {str(e)}"
        )

def remove_plan(db: Session, plan_id: int):
    try:
        return delete_plan(db, plan_id)

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Service error while deleting plan: {str(e)}"
        )