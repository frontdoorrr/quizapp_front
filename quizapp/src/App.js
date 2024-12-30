import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Ranking from "./pages/Ranking";
import Profile from "./pages/Profile";
import BackgroundVideo from "./components/layout/BackgroundVideo";
import ScrollText from "./components/common/ScrollText";
import EmailSubscribe from "./components/common/EmailSubscribe";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={
              <div>
                <BackgroundVideo />
                <ScrollText />
                <EmailSubscribe /> {/* ScrollText 바로 아래에 배치 */}
              </div>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
