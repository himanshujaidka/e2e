// import React, { useState } from 'react';
// import { accessRemote } from '../api/backend';

// const RemoteAccess = () => {
//   const [data, setData] = useState('');
//   const [error, setError] = useState('');

//   const handleClick = async () => {
//     setError('');
//     const result = await accessRemote();
//     if (result.status === 'success') {
//       setData(JSON.stringify(result.data, null, 2));
//     } else {
//       setError(result.message || 'Error accessing remote');
//     }
//   };

//   return (
//     <div>
//       <h2>Access Remote Server</h2>
//       <button onClick={handleClick}>Access</button>
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//       <pre>{data}</pre>
//     </div>
//   );
// };

// export default RemoteAccess;

// src/components/RemoteAccess.js
import React, { useState } from "react";
import { connectToServer } from "../api/backend";

const RemoteAccess = ({ app, env, user }) => {
  const [status, setStatus] = useState("");

  const handleConnect = async (index) => {
    setStatus("Connecting...");

    const result = await connectToServer({ app, env, user, server_index: index });

    if (result.success) {
      setStatus(`Connected: ${JSON.stringify(result.data)}`);
    } else {
      setStatus(`Error: ${result.error}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{app.toUpperCase()} - {env.toUpperCase()}</h2>
      {(env === "qs" || env === "prod") ? (
        <>
          <button onClick={() => handleConnect(0)}>Connect to {env.toUpperCase()} 1</button>
          <button onClick={() => handleConnect(1)}>Connect to {env.toUpperCase()} 2</button>
        </>
      ) : (
        <button onClick={() => handleConnect(0)}>Connect to {env.toUpperCase()} Server</button>
      )}
      <p>{status}</p>
    </div>
  );
};

export default RemoteAccess;

