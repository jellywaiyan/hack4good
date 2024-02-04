import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import LoginPage from "./pages/LoginPage";
import { AuthContext } from "./context/AuthContext";

function App() {
  const user = useContext(AuthContext);

  return (
    <>
      <LoginPage user={user} />
    </>
  );
}

export default App;
