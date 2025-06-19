// import React, { useState } from 'react';
// import { runScript } from '../api/backend';

// const ScriptRunner = () => {
//   const [output, setOutput] = useState('');
//   const [error, setError] = useState('');

//   const handleClick = async () => {
//     setError('');
//     const result = await runScript();
//     if (result.error) {
//       setError(result.error);
//     } else {
//       setOutput(result.output || 'Script ran but returned no output');
//     }
//   };

//   return (
//     <div>
//       <h2>Run Remote Script</h2>
//       <button onClick={handleClick}>Run Script</button>
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//       <pre>{output}</pre>
//     </div>
//   );
// };

// export default ScriptRunner;

import React, { useState } from "react";
import { runScript } from "../api/backend";

const ScriptRunner = ({ app, env, user, serverIndex }) => {
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setError("");
    setLoading(true);
    setOutput("");

    const result = await runScript({
      app,
      env,
      user,
      server_index: serverIndex,
      script_path: "/home/e2e/script/prompt_restart.py",
    });

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setOutput(result.stdout || "No output from script");
      if (result.stderr) {
        setOutput((prev) => prev + "\nErrors:\n" + result.stderr);
      }
    }
  };

  return (
    <div>
      <h2>Run Remote Script</h2>
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Running..." : "Restart Application"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <pre>{output}</pre>
    </div>
  );
};

export default ScriptRunner;
