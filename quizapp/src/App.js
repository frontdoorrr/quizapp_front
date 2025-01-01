import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Ranking from "./pages/Ranking";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BackgroundVideo from "./components/layout/BackgroundVideo";
import ScrollText from "./components/common/ScrollText";
import EmailSubscribe from "./components/common/EmailSubscribe";
import AuthButtons from "./components/auth/AuthButtons";

function App() {
  return (
    <Router>
      <div className="app">
        <AuthButtons />
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={
              <div>
                <BackgroundVideo />
                <ScrollText />
                <EmailSubscribe />
              </div>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
