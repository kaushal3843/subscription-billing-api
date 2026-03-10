from fastapi import FastAPI
from app.database.database import engine, Base
from app.models import user_model, plan_model, subscription_model
from app.routes import auth_routes, plan_routes, subscription_routes
from app.routes import report_routes

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(auth_routes.router)
app.include_router(plan_routes.router)
app.include_router(subscription_routes.router)
app.include_router(report_routes.router)

@app.get("/")
def home():
    return {"message": "Subscription Billing API"}