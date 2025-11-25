from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from db import Base

class Goal(Base):
    __tablename__ = "goals"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    complexity = Column(Integer, nullable=True)  # 1-10
    tasks = Column(JSON, nullable=True)  # store list of tasks as JSON
