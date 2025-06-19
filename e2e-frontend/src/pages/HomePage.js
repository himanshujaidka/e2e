import React, { useState } from 'react';
import FileList from '../components/FileList';
import ScriptRunner from '../components/ScriptRunner';
import RemoteAccess from '../components/RemoteAccess';
import NavBar from '../components/NavBar';
import Drawer from '../components/Drawer';

const HomePage = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedEnv, setSelectedEnv] = useState(null);
  const [selectedServerIndex, setSelectedServerIndex] = useState(0);
  const [connectedIndex, setConnectedIndex] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const sshUser = "e2e";

  const showMLaaSButton = selectedEnv === "qs" || selectedEnv === "prod";

  const mlassLinks = {
    "prompt_qs": "https://mlaas.example.com/logs/prompt-qs",
    "prompt_prod": "https://e2e-prod.kb.mlaas-b.mls-ml.prd.eu.gs.aws.cloud.vwgroup.com/app/logs/stream?logView=(logViewId:default,type:log-view-reference)&flyoutOptions=(flyoutId:!n,flyoutVisibility:hidden,surroundingLogsId:!n)&logFilter=(filters:!(),query:(language:kuery,query:%27service.name:%20%22prompt%22%20%20%27),refreshInterval:(pause:!t,value:5000),timeRange:(from:now-15m,to:now))&logPosition=(position:(tiebreaker:55088,time:%272025-06-18T09:59:23.403Z%27))",

    "e2e-webstarter-service_qs": "https://mlaas.example.com/logs/e2e-qs",
    "e2e-webstarter-service_prod": "https://mlaas.example.com/logs/e2e-prod",

    "pluto_qs": "https://mlaas.example.com/logs/pluto-qs",
    "pluto_prod": "https://mlaas.example.com/logs/pluto-prod",

    "pkonline_qs": "https://mlaas.example.com/logs/pkonline-qs",
    "pkonline_prod": "https://mlaas.example.com/logs/pkonline-prod",

    "stages_qs": "https://mlaas.example.com/logs/stages-qs",
    "stages_prod": "https://mlaas.example.com/logs/stages-prod",

    "kong_qs": "https://mlaas.example.com/logs/kong-qs",
    "kong_prod": "https://mlaas.example.com/logs/kong-prod",

    "probench ng_qs": "https://mlaas.example.com/logs/probench-ng-qs",
    "probench ng_prod": "https://mlaas.example.com/logs/probench-ng-prod",

    "jump-server_": "https://mlaas.example.com/logs/jump-server"
  };

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
                connectedIndex={connectedIndex}
                setConnectedIndex={setConnectedIndex}
                serverIndex={selectedServerIndex}
                onConnected={setIsConnected}
              />

<<<<<<< Updated upstream
<<<<<<< Updated upstream
              {/* Conditionally show restart button and script runner */}
              {showRestartButton && (
                <div style={{ marginTop: "20px" }}>
                  <h3>Restart Server Controls</h3>
                  {/* Pass the props needed to ScriptRunner if necessary */}
                  <ScriptRunner
                    app={selectedApp}
                    env={selectedEnv}
                    user={sshUser}
                    serverIndex={connectedIndex} 
                  />
                </div>
=======
=======
>>>>>>> Stashed changes
              {/* MLaaS Button for QS or PROD */}
              {showMLaaSButton && (
                <button
                  style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#00695c",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const key = `${selectedApp}_${selectedEnv}`;
                    const link = mlassLinks[key];
                    if (link) {
                      window.open(link, "_blank");
                    } else {
                      alert(`No MLaaS link found for ${key}`);
                    }
                  }}
                >
                  Check Logs on MLaaS
                </button>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
              )}

              {/* Script Runner Section */}
              <div style={{ marginTop: "20px" }}>
                <ScriptRunner
                  app={selectedApp}
                  env={selectedEnv}
                  user={sshUser}
                  serverIndex={selectedServerIndex}
                />
              </div>
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
