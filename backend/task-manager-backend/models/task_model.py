from sqlalchemy import String, Column, Integer, Enum, DateTime
from sqlalchemy.sql import func
from ..core.database import Base
import enum
class TaskStatus(enum.Enum):
    pending = 'pending'
    completed = 'completed'

class Task(Base):
    __tablename__ = "task_details"
    # Considered ID column as Integer to support autoincrement though as per instructions (String)
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    status = Column(Enum(TaskStatus), default=TaskStatus.pending, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
