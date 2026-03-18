from sqlalchemy import Column, Integer, ForeignKey, Date, String
from app.database.database import Base

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    plan_id = Column(Integer, ForeignKey("plans.id"))
    start_date = Column(Date)
    expiry_date = Column(Date)
    status = Column(String, default="active")