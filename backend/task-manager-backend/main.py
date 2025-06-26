from datetime import datetime

from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
from datetime import datetime
from .core.database import get_db, engine, Base
from .models.task_model import Task, TaskStatus

Base.metadata.create_all(bind=engine)

app = FastAPI()

class TaskList(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    status: TaskStatus
    created_at: datetime
    class Config:
        orm_mode = True

class TaskNew(BaseModel):
    title: str
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.pending
    created_at: Optional[datetime] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None


@app.get("/tasks/", response_model=List[TaskList])
def list_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()

@app.post("/tasks/", response_model=TaskList, status_code=status.HTTP_201_CREATED)
def create_task(task: TaskNew, db: Session = Depends(get_db)):
    new_task = Task(title=task.title, description=task.description, status=task.status)
    if task.created_at:
        new_task.created_at = task.created_at
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@app.put("/tasks/{task_id}", response_model=TaskList)
def update_task(task_id: int, task_data: TaskUpdate, db: Session = Depends(get_db)):
    print('called')
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found.")

    if task_data.title is not None:
        task.title = task_data.title
    if task_data.description is not None:
        task.description = task_data.description
    if task_data.status is not None:
        task.status = task_data.status

    db.commit()
    db.refresh(task)
    return task
