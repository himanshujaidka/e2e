// App.js
import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import LoginForm from './LoginForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
    {/* <HomePage /> */}
      {isLoggedIn ? <HomePage /> : <LoginForm onLoginSuccess={handleLoginSuccess} />}
    </>
  );
}

export default App;
