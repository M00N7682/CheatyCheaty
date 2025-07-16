import React, { useState, useEffect } from 'react';
import FileUploader from '../components/FileUploader';
import ChatBox from '../components/ChatBox';
import './Home.css';

const Home: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [vectorstoreExists, setVectorstoreExists] = useState<boolean | null>(null);

  useEffect(() => {
    const checkVectorstore = async () => {
      if (!userId) {
        setVectorstoreExists(null);
        return;
      }

      try {
        const res = await fetch(`/api/vectorstore/exists/${userId}`);
        const data = await res.json();
        setVectorstoreExists(data.exists);
      } catch (err) {
        console.error('파일 확인 중 오류 발생:', err);
        setVectorstoreExists(null);
      }
    };

    checkVectorstore();
  }, [userId]);

  return (
    <div className="home-container">
      <h1 className="home-title">CheatyCheaty</h1>

      <div className="user-id-section">
        <label htmlFor="user-id" className="user-id-label">🆔 User ID</label>
        <input
          id="user-id"
          type="text"
          placeholder="ID를 입력해주세요(영문)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="user-id-input"
        />
        {vectorstoreExists === true && (
          <p className="status-message success"> 업로드된 파일이 존재합니다.</p>
        )}
        {vectorstoreExists === false && userId && (
          <p className="status-message warning">⚠️ 파일이 존재하지 않습니다. 업로드해주세요.</p>
        )}
      </div>

      <FileUploader userId={userId} />
      <ChatBox userId={userId} />
    </div>
  );
};

export default Home;
