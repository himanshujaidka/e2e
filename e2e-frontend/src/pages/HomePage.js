// import React from 'react';
// import FileList from '../components/FileList';
// import ScriptRunner from '../components/ScriptRunner';
// import RemoteAccess from '../components/RemoteAccess';
// import NavBar from '../components/NavBar';
// import Drawer from '../components/Drawer';

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

import React, { useState } from 'react';
import RemoteAccess from '../components/RemoteAccess';
import NavBar from '../components/NavBar';
import Drawer from '../components/Drawer';

const HomePage = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedEnv, setSelectedEnv] = useState(null);
  const sshUser = "e2e"; // Replace with dynamic value if needed

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* NavBar at the top */}
      <NavBar />

      {/* Content area: sidebar + main content */}
      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar on the left */}
        <Drawer setSelectedApp={setSelectedApp} setSelectedEnv={setSelectedEnv} />

        {/* Main content on the right */}
        <div style={{ flexGrow: 1, padding: "20px" }}>
          {selectedApp && selectedEnv ? (
            <RemoteAccess app={selectedApp} env={selectedEnv} user={sshUser} />
          ) : (
            <p>Please select an app and environment from the sidebar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

