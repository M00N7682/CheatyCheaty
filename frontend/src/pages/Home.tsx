import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import ChatBox from '../components/ChatBox';
import './Home.css';

const Home: React.FC = () => {
  const [userId, setUserId] = useState('');

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
      </div>

      <FileUploader userId={userId} />
      <ChatBox userId={userId} />
    </div>
  );
};

export default Home;
