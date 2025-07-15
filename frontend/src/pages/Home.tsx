// frontend/src/pages/Home.tsx

import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import ChatBox from '../components/ChatBox';

const Home: React.FC = () => {
  const [userId, setUserId] = useState('');

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <h1> 사용자별 RAG 챗봇</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="user-id">🆔 User ID</label>
        <input
          id="user-id"
          type="text"
          placeholder="User ID 입력"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ display: 'block', marginTop: '0.5rem', width: '100%' }}
        />
      </div>

      <FileUploader userId={userId} />
      <ChatBox userId={userId} />
    </div>
  );
};

export default Home;
