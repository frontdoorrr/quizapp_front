import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Ranking from "./pages/Ranking";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ScrollText from "./components/common/ScrollText";
import EmailSubscribe from "./components/common/EmailSubscribe";
import AuthButtons from "./components/auth/AuthButtons";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Main from './pages/Main';
import Game from './pages/Game';
import CorrectAnswer from './pages/CorrectAnswer';

function App() {
  return (
    <Router>
      <div className="app">
        <AuthButtons />
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About  />} />
            <Route path="/game" element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            } />
            <Route path="/correct" element={<CorrectAnswer />} />
            <Route path="/ranking" element={<Ranking  />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login  />} />
            <Route path="/register" element={<Register  />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
