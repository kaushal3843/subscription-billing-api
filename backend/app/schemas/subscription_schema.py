from pydantic import BaseModel
from datetime import date

class SubscriptionCreate(BaseModel):
    plan_id: int


class SubscriptionResponse(BaseModel):
    id: int
    user_id: int
    plan_id: int
    start_date: date
    expiry_date: date

    class Config:
        from_attributes = True