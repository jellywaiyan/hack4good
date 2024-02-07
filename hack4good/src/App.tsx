import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import LoginPage from "./pages/LoginPage";
import { AuthContext } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/ResgisterPage";

function App() {
  const user = useContext(AuthContext);
  console.log(user);
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage user={user} />} />
        <Route path="/home" element={<HomePage user={user} />} />
        <Route path="/register" element={<RegisterPage user={user} />} />
      </Routes>
    </>
  );
}

export default App;
