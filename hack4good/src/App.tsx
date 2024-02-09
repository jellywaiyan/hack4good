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
import UserRegisteredOpportunities from "./pages/UserRegisteredOpportunities";

function App() {
  const user = useContext(AuthContext);
  console.log(user?.email);
  // console.log(firebase.auth().currentUser);

  var isLoggedIn = firebase.auth().currentUser;

  if (user && !user.email.startsWith("admin")) {
    return (
      <div style={{ paddingTop: 90 }}>
        {isLoggedIn ? <NavBar /> : <> </>}
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
          <Route
            path="/registered"
            element={<UserRegisteredOpportunities user={user} />}
          />
          {/* <Route path="/adminhome" element={<AdminHomePage user={user} />} /> */}
          {/* <Route path="/login" element={<LoginPage user={user} />} /> */}
        </Routes>
      </div>
    );
  } else if (user && user.email.startsWith("admin")) {
    return (
      <div style={{ paddingTop: 90 }}>
        {isLoggedIn ? <NavBar /> : <> </>}
        <Routes>
          <Route path="/" element={<AdminHomePage user={user} />} />
          {/* <Route path="/" element={<HomePage user={user} />} />
          <Route
            path="/preferences"
            element={<UserPreferencesPage user={user} />}
          />
          <Route
            path="/information"
            element={<UserInformationPage user={user} />}
          /> */}
          {/* <Route path="/login" element={<LoginPage user={user} />} /> */}
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
