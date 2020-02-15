import React, { useEffect } from "react";

import Home from "./pages/Home";

import "./App.css";

function App() {
  useEffect(() => {
    document.title = "Charity Button";
  }, []);
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
