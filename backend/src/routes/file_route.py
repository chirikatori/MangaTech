from fastapi import (
    APIRouter,
    HTTPException
)
from fastapi.responses import JSONResponse, FileResponse
import os

file_router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@file_router.get("/api/image/{filename}")
async def get_image(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return {"error": "File not found"}


@file_router.post("/api/image/{filename}/delete")
async def delete_image(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return {"message": f"File {filename} deleted successfully"}
    raise HTTPException(status_code=404, detail="File not found")


@file_router.get("/api/output/{filename}")
async def get_output_file(filename: str):
    with open(os.path.join(UPLOAD_DIR, filename), "rb") as file:
        content = file.read()
    if content:
        return JSONResponse(content={"filename": filename, "content": content.decode('utf-8')})
    raise HTTPException(status_code=404, detail="Output file not found")


@file_router.post("/api/output/{filename}/delete")
async def delete_output_file(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return {"message": f"File {filename} deleted successfully"}
    raise HTTPException(status_code=404, detail="File not found")
