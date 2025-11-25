from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from db import SessionLocal, init_db
from models import Goal
from schemas import GoalCreate, GoalOut
from llm import gemini_generate
from sqlalchemy.orm import Session
import os

app = FastAPI(title="Smart Goal Breaker")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
def on_startup():
    init_db()

@app.post("/api/goals", response_model=GoalOut)
def create_goal(payload: GoalCreate, db: Session = Depends(get_db)):
    # 1) generate via LLM
    ai_out = gemini_generate(payload.text)
    tasks = ai_out.get("tasks", [])
    complexity = int(ai_out.get("complexity", 5))

    # ensure 5 tasks
    if len(tasks) < 5:
        tasks = tasks + ["Refine this step."] * (5 - len(tasks))
    else:
        tasks = tasks[:5]

    goal = Goal(text=payload.text, tasks=tasks, complexity=complexity)
    db.add(goal)
    db.commit()
    db.refresh(goal)
    return goal

@app.get("/api/goals/{goal_id}", response_model=GoalOut)
def get_goal(goal_id: int, db: Session = Depends(get_db)):
    g = db.query(Goal).filter(Goal.id == goal_id).first()
    if not g:
        raise HTTPException(status_code=404, detail="Goal not found")
    return g

@app.get("/api/goals", response_model=list[GoalOut])
def list_goals(db: Session = Depends(get_db)):
    return db.query(Goal).order_by(Goal.id.desc()).limit(50).all()
