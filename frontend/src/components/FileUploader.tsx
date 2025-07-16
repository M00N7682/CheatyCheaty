import React, { useState } from 'react';
import { uploadFile } from '../api';
import './FileUploader.css';

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
      setMessage(error.message || '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-uploader">
      <h2 className="file-uploader-title">File Upload</h2>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        className="file-uploader-input"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="file-uploader-button"
      >
        {loading ? '업로드 중...' : '업로드'}
      </button>
      {message && (
        <p
          className={`file-uploader-message ${
            message.includes('성공') ? 'success' : 'error'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default FileUploader;
