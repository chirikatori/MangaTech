from fastapi import (
    APIRouter,
    File,
    UploadFile,
    HTTPException,
    Query,
)
from fastapi.responses import JSONResponse
import os
import time

from src.models.ocr import EasyOCR, Magi
from src.utils import save_upload_file


ocr_router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@ocr_router.post("/text-detection")
async def text_detection(
    file: UploadFile = File(...), model_type: str = Query("magi")
):
    # Save the uploaded file
    file_path = save_upload_file(file, UPLOAD_DIR)
    result_filename = f"result_{file.filename}"
    result_path = os.path.join(UPLOAD_DIR, result_filename)

    # Validate file type
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        raise HTTPException(status_code=400,
                            detail="Invalid file type. Only images are allowed.")

    # Initialize the OCR engine based on the model type
    if model_type == "easyocr":
        ocr_engine = EasyOCR()
    elif model_type == "magi":
        ocr_engine = Magi()
    else:
        raise HTTPException(status_code=400, detail="Invalid model type")

    try:
        ocr_engine.text_detection(file_path, result_path)

        # Wait for the result file to be created
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


@ocr_router.post("/text-recognition")
async def text_recognition(
    file: UploadFile = File(...), model_type: str = Query("magi")
):
    # Save the uploaded file
    file_path = save_upload_file(file, UPLOAD_DIR)
    file_name, _ = os.path.splitext(file.filename)
    result_filename = f"result_{file_name}.txt"
    result_path = os.path.join(UPLOAD_DIR, result_filename)

    # Validate file type
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        raise HTTPException(status_code=400,
                            detail="Invalid file type. Only images are allowed.")

    # Initialize the OCR engine based on the model type
    if model_type == "easyocr":
        ocr_engine = EasyOCR()
    elif model_type == "magi":
        ocr_engine = Magi()
    else:
        raise HTTPException(status_code=400, detail="Invalid model type")

    try:
        ocr_engine.text_recognition(file_path, result_path)

        # Wait for the result file to be created
        for _ in range(20):
            if os.path.exists(result_path):
                break
            time.sleep(0.1)

        if not os.path.exists(result_path):
            raise HTTPException(status_code=500,
                                detail="Result text file not found.")

        return JSONResponse(
            content={"processed_text_url": f"/api/image/{result_filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
