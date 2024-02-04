import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import LoginPage from "./pages/LoginPage";
import { AuthContext } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  const user = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage user={user} />} />
        <Route path="/home" element={<HomePage user={user} />} />
      </Routes>
    </>
  );
}

export default App;
