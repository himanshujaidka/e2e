import React, { useState } from 'react';
import { fetchFiles } from '../api/backend';

const FileList = () => {
  const [files, setFiles] = useState('');
  const [error, setError] = useState('');

  const handleClick = async () => {
    setError('');
    const result = await fetchFiles();
    if (result.error) {
      setError(result.error);
    } else {
      setFiles(result.files || 'No files found');
    }
  };

  return (
    <div>
      <h2>List Remote Files</h2>
      <button onClick={handleClick}>Fetch Files</button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <pre>{files}</pre>
    </div>
  );
};

export default FileList;
