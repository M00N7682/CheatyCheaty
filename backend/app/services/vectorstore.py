# backend/app/services/vectorstore.py

import os
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import TextLoader
from dotenv import load_dotenv

# 환경변수 로드 (백엔드에서 한 번만 실행되면 생략 가능)
load_dotenv(dotenv_path="C:/Users/user/Desktop/cheatycheaty/.env")
openai_api_key = os.getenv("OPENAI_API_KEY")

# 사용자별 저장 경로
VECTORSTORE_DIR = "app/vectorstores"

def save_vectorstore(user_id: str, text_file_path: str):
    """
    텍스트 문서를 받아서 벡터스토어를 생성하고 저장
    """
    # 문서 로드 및 쪼개기
    loader = TextLoader(text_file_path, encoding='utf-8')
    documents = loader.load()

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    split_docs = splitter.split_documents(documents)

    # 임베딩 및 벡터 저장
    embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
    vectorstore = FAISS.from_documents(split_docs, embeddings)

    # 디렉토리 생성
    user_dir = os.path.join(VECTORSTORE_DIR, user_id)
    os.makedirs(user_dir, exist_ok=True)

    # 저장
    vectorstore.save_local(user_dir)

def load_vectorstore(user_id: str) -> FAISS:
    """
    저장된 사용자 벡터스토어를 로드하여 반환
    """
    embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
    user_dir = os.path.join(VECTORSTORE_DIR, user_id)

    if not os.path.exists(user_dir):
        raise FileNotFoundError(f"{user_id}의 vectorstore가 존재하지 않습니다.")

    vectorstore = FAISS.load_local(user_dir, embeddings)
    return vectorstore
