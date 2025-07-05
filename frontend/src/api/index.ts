// frontend/src/api/index.ts

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // FastAPI 서버 주소 (운영 시 변경)

export const uploadFile = async (user_id: string, file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('user_id', user_id);
  formData.append('file', file);

  try {
    const res = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.message;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || '파일 업로드 실패');
  }
};

export const sendQuestion = async (user_id: string, question: string): Promise<string> => {
  try {
    const res = await axios.post(`${API_BASE_URL}/chat`, {
      user_id,
      question,
    });

    return res.data.answer;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || '질문 처리 실패');
  }
};
