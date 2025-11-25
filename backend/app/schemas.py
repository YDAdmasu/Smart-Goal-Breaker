from pydantic import BaseModel
from typing import List, Optional

class GoalCreate(BaseModel):
    text: str

class GoalOut(BaseModel):
    id: int
    text: str
    tasks: List[str]
    complexity: Optional[int]

    class Config:
        orm_mode = True
