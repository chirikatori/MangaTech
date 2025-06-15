import os
import shutil
from fastapi import UploadFile


def save_upload_file(upload_file: UploadFile, destination: str) -> None:
    file_path = os.path.join(destination, upload_file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    return file_path


def delete_file(file_path: str) -> None:
    if os.path.exists(file_path):
        os.remove(file_path)
    else:
        raise FileNotFoundError(f"The file {file_path} does not exist.")
