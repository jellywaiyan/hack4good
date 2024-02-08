import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import LoginPage from "./pages/LoginPage";
import { AuthContext } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/ResgisterPage";
import UserPreferencesPage from "./pages/UserPreferencesPage";
import UserInformationPage from "./pages/UserInformationPage";

function App() {
  const user = useContext(AuthContext);
  console.log(user);

  if (user) {
    return (
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route
          path="/preferences"
          element={<UserPreferencesPage user={user} />}
        />
        <Route
          path="/information"
          element={<UserInformationPage user={user} />}
        />
        <Route path="/login" element={<LoginPage user={user} />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<LoginPage user={user} />} />
        <Route path="/register" element={<RegisterPage user={user} />} />
      </Routes>
    );
  }
}

export default App;
