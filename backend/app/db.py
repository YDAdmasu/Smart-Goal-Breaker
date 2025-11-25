from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Fallback for when running outside docker without env var, though it should be set.
if not DATABASE_URL:
    # Default to a safe value or raise error. For now, let's assume it's provided or handle gracefully.
    # We'll let create_engine fail if it's None, which is better than a silent wrong DB.
    pass

engine = create_engine(DATABASE_URL, echo=False, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def init_db():
    import models
    Base.metadata.create_all(bind=engine)
