
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pathlib import Path
from uuid import uuid4

from database import create_tables, get_connection


app = FastAPI(
    title="UNSTUCK API",
    description="Backend for the UNSTUCK application",
    version="1.0.0"
)


# CONFIGURE CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# DATABASE INITIALIZATION
@app.on_event("startup")
def startup():
    create_tables()


# FILE UPLOAD CONFIGURATION
UPLOAD_DIR = Path(__file__).parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_EXTENSIONS = {".pdf", ".jpg", ".jpeg", ".png"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB


# HOME ENDPOINT
@app.get("/")
def home():
    return {
        "message": "Welcome to UNSTUCK API!",
        "status": "running"
    }


# HEALTH CHECK ENDPOINT
@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


# DOCUMENT UPLOAD ENDPOINT
@app.post("/documents/upload")
async def upload_document(file: UploadFile = File(...)):

    extension = Path(file.filename or "").suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, JPG and PNG files are allowed."
        )

    content = await file.read()

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File size must not exceed 5 MB."
        )

    unique_filename = f"{uuid4()}{extension}"
    file_path = UPLOAD_DIR / unique_filename

    try:
        # SAVE FILE TO UPLOADS FOLDER
        with file_path.open("wb") as buffer:
            buffer.write(content)

        # SAVE FILE DETAILS TO SQLITE
        connection = get_connection()

        try:
            cursor = connection.cursor()

            cursor.execute("""
                INSERT INTO documents (
                    original_filename,
                    stored_filename,
                    file_size
                )
                VALUES (?, ?, ?)
            """, (
                file.filename or "unknown",
                unique_filename,
                len(content)
            ))

            connection.commit()

        finally:
            connection.close()

        return {
            "message": "Document uploaded successfully!",
            "filename": unique_filename,
            "original_filename": file.filename,
            "size": len(content)
        }

    except Exception:
        # Avoid leaving an untracked file if the database operation fails.
        file_path.unlink(missing_ok=True)
        raise HTTPException(
            status_code=500,
            detail="Document upload could not be completed."
        )


# VIEW UPLOADED DOCUMENTS
@app.get("/documents")
def get_documents():

    connection = get_connection()

    try:
        cursor = connection.cursor()

        cursor.execute("""
            SELECT
                id,
                original_filename,
                stored_filename,
                file_size,
                uploaded_at
            FROM documents
            ORDER BY uploaded_at DESC
        """)

        documents = [dict(row) for row in cursor.fetchall()]

        return {
            "documents": documents,
            "total": len(documents)
        }

    finally:
        connection.close()
