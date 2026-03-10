from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

# load .env file
load_dotenv()

# PostgreSQL connection URL
DATABASE_URL = os.getenv("DATABASE_URL")

# Create engine (connect FastAPI to PostgreSQL)
engine = create_engine(DATABASE_URL)

# Create session for database operations
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for models (tables)
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()