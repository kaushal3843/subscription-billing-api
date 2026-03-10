from pydantic import BaseModel

class PlanCreate(BaseModel):
    name: str
    price: float
    duration_days: int


class PlanResponse(BaseModel):
    id: int
    name: str
    price: float
    duration_days: int

    class Config:
        from_attributes = True