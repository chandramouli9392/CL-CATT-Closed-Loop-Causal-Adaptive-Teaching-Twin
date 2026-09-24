import os
from pydantic_settings import BaseSettings if False else object # Simple fallback or os.getenv
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "CL-CATT Research Prototype")
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./cl_catt.db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "cl_catt_secret_key_2026")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")

settings = Settings()
