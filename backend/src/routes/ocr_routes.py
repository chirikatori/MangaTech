from fastapi import (
    APIRouter,
    File,
    UploadFile,
    HTTPException,
    Query,
    Request
)
from fastapi.responses import FileResponse, JSONResponse
import os
from src.ocr import EasyOCR, Magi  # noqa
from src.utils import save_upload_file
import glob
import time

ocr_router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@ocr_router.post("/text-detection")
async def text_detection(
    file: UploadFile = File(...), model_type: str = Query("magi")
):
    file_path = save_upload_file(file, UPLOAD_DIR)
    result_filename = f"result_{file.filename}"
    result_path = os.path.join(UPLOAD_DIR, result_filename)

    if model_type == "easyocr":
        ocr_engine = EasyOCR()
    elif model_type == "magi":
        ocr_engine = Magi()
    else:
        raise HTTPException(status_code=400, detail="Invalid model type")

    try:
        ocr_engine.text_detection(file_path, result_path)
        for _ in range(20):
            if os.path.exists(result_path):
                break
            time.sleep(0.1)

        if not os.path.exists(result_path):
            raise HTTPException(status_code=500,
                                detail="Result image not found.")

        return JSONResponse(
            content={"processed_image_url": f"/api/image/{result_filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))





@ocr_router.get("/api/image/{filename}")
async def get_image(filename: str):
    search_pattern = os.path.join(UPLOAD_DIR,
                                  f"{os.path.splitext(filename)[0]}.*")

    matching_files = glob.glob(search_pattern)

    if matching_files:
        return FileResponse(matching_files[0])
    return {"error": "File not found"}


@ocr_router.post("/api/image/{filename}/delete")
async def delete_image_via_post(filename: str, request: Request):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return {"message": f"File {filename} deleted successfully"}
    raise HTTPException(status_code=404, detail="File not found")
