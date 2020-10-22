import React, { useState, useEffect } from "react";
import "./App.css";

import Login from "./Components/Login.component";
import Dashboard from "./Components/Dashboard.component";
import { clearUserInLocalStorage, getUserInLocalStorage } from "./Utils/utils";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = getUserInLocalStorage();
    if (user === null) {
      logOut();
    } else {
      logIn();
    }
  }, []);

  function logIn() {
    setIsAuthenticated(true);
  }

  function logOut() {
    clearUserInLocalStorage();
    setIsAuthenticated(false);
  }

  if (isAuthenticated) {
    return <Dashboard logOut={logOut} />;
  } else {
    return <Login logIn={logIn} />;
  }
}

export default App;
