// frontend/src/components/FileUploader.tsx

import React, { useState } from 'react';
import { uploadFile } from '../api';

interface Props {
  userId: string;
}

const FileUploader: React.FC<Props> = ({ userId }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = async () => {
    if (!userId || !selectedFile) {
      setMessage('user ID와 파일을 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const result = await uploadFile(userId, selectedFile);
      setMessage(result);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2> File upload</h2>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        style={{ marginBottom: '0.5rem', display: 'block' }}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? '업로드 중...' : '업로드'}
      </button>
      {message && (
        <p style={{ marginTop: '1rem', color: message.includes('성공') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default FileUploader;
