# backend/app/utils/file.py

import os
from fastapi import UploadFile

TEMP_DIR = "app/temp"

# 임시 저장 디렉토리 생성 (없으면)
os.makedirs(TEMP_DIR, exist_ok=True)

def save_temp_file(user_id: str, file: UploadFile) -> str:
    """
    FastAPI UploadFile 객체를 임시 파일로 저장하고 경로 반환
    """
    filename = f"{user_id}_{file.filename}"
    temp_path = os.path.join(TEMP_DIR, filename)

    with open(temp_path, "wb") as f:
        content = file.file.read()
        f.write(content)

    return temp_path

def delete_file(path: str):
    """
    지정한 경로의 파일 삭제
    """
    if os.path.exists(path):
        os.remove(path)
