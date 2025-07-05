// frontend/src/components/ChatBox.tsx

import React, { useState } from 'react';
import { sendQuestion } from '../api';

interface Props {
  userId: string;
}

const ChatBox: React.FC<Props> = ({ userId }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!userId || !question) {
      setError('user ID와 질문을 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');
    setAnswer('');

    try {
      const result = await sendQuestion(userId, question);
      setAnswer(result);
    } catch (err: any) {
      setError(err.message || '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2> 챗봇 질문</h2>
      <textarea
        placeholder="질문을 입력하세요..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={3}
        style={{ width: '100%', marginBottom: '0.5rem' }}
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? '답변 생성 중...' : '질문하기'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      {answer && (
        <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
          <strong>답변:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
