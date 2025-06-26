import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DATABASE_URL = "sqlite:///./task_details.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

Session = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

def get_db():
    db = Session()
    logger.info("DB session created.")
    try:
        yield db
    finally:
        db.close()
        logger.info("DB session closed.")