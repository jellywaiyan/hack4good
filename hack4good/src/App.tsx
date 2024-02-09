import { useContext, useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { AuthContext } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/UserOpportunitiesPage";
import RegisterPage from "./pages/ResgisterPage";
import UserPreferencesPage from "./pages/UserPreferencesPage";
import UserInformationPage from "./pages/UserInformationPage";
import AdminHomePage from "./pages/AdminHomePage";
import firebase from "firebase/compat/app";
import UserRegisteredOpportunities from "./pages/UserRegisteredOpportunities";
import WelcomePageLoggedOut from "./pages/WelcomePageLoggedIn";
import WelcomePageLoggedIn from "./pages/WelcomePageLoggedOut";
import UserNavBar from "./components/ui/usernavbar";
import AdminNavBar from "./components/ui/adminnavbar";
import UserOpportunitiesPage from "./pages/UserOpportunitiesPage";

function App() {
  const user = useContext(AuthContext);
  console.log(user?.email);
  // console.log(firebase.auth().currentUser);

  var isLoggedIn = firebase.auth().currentUser;

  if (user && !user.email.startsWith("admin")) {
    return (
      <div style={{ paddingTop: 90 }}>
        {isLoggedIn ? <UserNavBar /> : <> </>}
        <Routes>
          <Route path="/wlc" element={<WelcomePageLoggedIn />} />
          <Route path="/wlc" element={<HomePage user={user}/> }/>
          <Route path="/opportunities" element={<UserOpportunitiesPage user={user}/> }/>
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
        </Routes>
      </div>
    );
  } else if (user && user.email.startsWith("admin")) {
    return (
      <div style={{ paddingTop: 90 }}>
        {isLoggedIn ? <AdminNavBar /> : <> </>}
        <Routes>
          <Route path="/adminhome" element={<AdminHomePage user={user} />} />
          <Route path="/wlc" element={<WelcomePageLoggedIn />} />
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
