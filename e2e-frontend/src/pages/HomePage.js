import React, { useState } from 'react';
import FileList from '../components/FileList';
import ScriptRunner from '../components/ScriptRunner';
import RemoteAccess from '../components/RemoteAccess';
import NavBar from '../components/NavBar';
import Drawer from '../components/Drawer';

// const HomePage = () => {
//   return (
//     <div >
//       <NavBar />
//       <Drawer />
//       <hr />
//       <FileList />
//       <hr />
//       <ScriptRunner />
//       <hr />
//       <RemoteAccess />
//     </div>
//   );
// };

// export default HomePage;


const HomePage = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedEnv, setSelectedEnv] = useState(null);
  const [selectedServerIndex, setSelectedServerIndex] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const sshUser = "e2e";
  const showRestartButton = selectedApp === "prompt" && selectedEnv === "qs";

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* NavBar at the top */}
      <NavBar />

      {/* Content area: sidebar + main content */}
      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar on the left */}
        <Drawer
          setSelectedApp={setSelectedApp}
          setSelectedEnv={setSelectedEnv}
          setSelectedServerIndex={setSelectedServerIndex}
        />

        {/* Main content on the right */}
        <div style={{ flexGrow: 1, padding: "20px" }}>
          <h1>WELCOME TO E2E OneDashboard</h1>
          {selectedApp && selectedEnv ? (
            <>
              <RemoteAccess
                app={selectedApp}
                env={selectedEnv}
                user={sshUser}
                serverIndex={selectedServerIndex}
                onConnected={setIsConnected} 
              />

              {/* Conditionally show restart button and script runner */}
              {showRestartButton && (
                <div style={{ marginTop: "20px" }}>
                  <h3>Restart Server Controls</h3>
                  {/* Pass the props needed to ScriptRunner if necessary */}
                  <ScriptRunner
                    app={selectedApp}
                    env={selectedEnv}
                    user={sshUser}
                    serverIndex={selectedServerIndex}
                  />
                </div>
              )}
            </>
          ) : (
            <p>Please select an app and environment from the sidebar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
