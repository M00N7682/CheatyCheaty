# backend/app/api/routes.py
import os
from fastapi import APIRouter, UploadFile, File, Form
from pydantic import BaseModel
from fastapi.responses import JSONResponse

from app.services.vectorstore import save_vectorstore, load_vectorstore
from app.services.chat import generate_answer
from app.utils.file import save_temp_file, delete_file

router = APIRouter()

# 업로드 라우터
@router.post("/upload")
async def upload_file(user_id: str = Form(...), file: UploadFile = File(...)):
    try:
        # 1. 파일 임시 저장
        temp_path = save_temp_file(user_id, file)

        # 2. 벡터스토어 생성 및 저장
        save_vectorstore(user_id=user_id, pdf_file_path=temp_path)

        # 3. 임시 파일 삭제
        delete_file(temp_path)

        return {"message": f"{user_id}님의 문서 업로드 및 벡터 저장이 완료되었습니다."}

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

# 질문 응답 라우터
class QuestionRequest(BaseModel):
    user_id: str
    question: str

@router.post("/chat")
async def chat(request: QuestionRequest):
    try:
        vectorstore = load_vectorstore(request.user_id)
        answer = generate_answer(vectorstore, request.question)
        return {"answer": answer}

    except FileNotFoundError:
        return JSONResponse(status_code=404, content={"error": "해당 유저의 문서가 없습니다. 먼저 업로드하세요."})

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@router.get("/vectorstore/exists/{user_id}")
def vectorstore_exists(user_id: str):
    user_dir = os.path.join("app/vectorstores", user_id)
    return {"exists": os.path.exists(user_dir)}