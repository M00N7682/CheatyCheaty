import React, { useState } from 'react';
import { sendQuestion } from '../api';
import './ChatBox.css';

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
    <div className="chatbox-container">
      <h2 className="chatbox-title">Question</h2>
      <textarea
        className="chatbox-textarea"
        placeholder="질문을 입력하세요..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={3}
      />
      <button className="chatbox-button" onClick={handleSend} disabled={loading}>
        {loading ? '답변 생성 중...' : '질문하기'}
      </button>

      {error && <p className="chatbox-error">{error}</p>}
      {answer && (
        <div className="chatbox-answer">
          <strong>답변:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
