import React, { useState } from 'react';
import { runScript } from '../api/backend';

const ScriptRunner = () => {
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleClick = async () => {
    setError('');
    const result = await runScript();
    if (result.error) {
      setError(result.error);
    } else {
      setOutput(result.output || 'Script ran but returned no output');
    }
  };

  return (
    <div>
      <h2>Run Remote Script</h2>
      <button onClick={handleClick}>Run Script</button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <pre>{output}</pre>
    </div>
  );
};

export default ScriptRunner;
