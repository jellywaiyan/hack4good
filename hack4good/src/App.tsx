import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { AuthContext } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/ResgisterPage";
import UserPreferencesPage from "./pages/UserPreferencesPage";
import UserInformationPage from "./pages/UserInformationPage";
import AdminHomePage from "./pages/AdminHomePage";
import NavBar from "./components/ui/navbar";
import firebase from "firebase/compat/app";
import GuestNavBar from "./components/ui/guestnavbar";
import WelcomePage from "./pages/WelcomePageLoggedIn";
import WelcomePageLoggedOut from "./pages/WelcomePageLoggedIn";
import WelcomePageLoggedIn from "./pages/WelcomePageLoggedOut";

function App() {
  const user = useContext(AuthContext);
  console.log(user);

  if (user) {
    return (
      <div style={{paddingTop:90}}>
        <NavBar/>
      <Routes>
        <Route path = "/wlc" element={<WelcomePageLoggedIn/>}/>
        <Route path="/home" element={<HomePage user={user} />} />
        <Route
          path="/preferences"
          element={<UserPreferencesPage user={user} />}
        />
        <Route
          path="/adminhome"
          element={<AdminHomePage user={ user } />}
          />
        <Route
          path="/information"
          element={<UserInformationPage user={user} />}
        />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
      </div>
    );
  } else {
    return (
      <div style={{paddingTop:90}}>
      <Routes>
        <Route path="/" element={<WelcomePageLoggedOut />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      </div>
    );
  }
}

export default App;
