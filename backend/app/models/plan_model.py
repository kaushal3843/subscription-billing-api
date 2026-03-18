from sqlalchemy import Column, Integer, String, Float
from app.database.database import Base

class Plan(Base):
    __tablename__ = "plans"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    price = Column(Float)
    duration_days = Column(Integer)