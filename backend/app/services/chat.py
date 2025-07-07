
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
import os
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv(dotenv_path="C:/Users/user/Desktop/react_project/.env")
openai_api_key = os.getenv("OPENAI_API_KEY")

def generate_answer(vectorstore, question: str) -> str:
    """
    사용자 질문을 받아 vectorstore 기반 QA 응답을 생성
    """
    # QA 체인 구성
    qa = RetrievalQA.from_chain_type(
        llm=ChatOpenAI(
            model_name="gpt-3.5-turbo",
            openai_api_key=openai_api_key
        ),
        chain_type="stuff",
        retriever=vectorstore.as_retriever()
    )

    # 답변 생성
    answer = qa.run(question)
    return answer
