from sqlalchemy import String, Column, Enum, DateTime
from sqlalchemy.sql import func
import enum
from ..core.database import Base

class TaskStatus(Enum.enum):
    pending = 'pending'
    completed = 'completed'

class Task(Base):
    __tablename__ = "task_details"
    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    status = Column(Enum(TaskStatus), default=TaskStatus.pending, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
