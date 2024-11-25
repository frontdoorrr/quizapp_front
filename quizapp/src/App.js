import React from "react";
import BackgroundVideo from "./components/BackgroundVideo";
import ScrollText from "./components/ScrollText";
import EmailSubscribe from "./components/EmailSubscribe";

function App() {
  return (
    <div>
      <BackgroundVideo />
      <ScrollText />
      <EmailSubscribe /> {/* ScrollText 바로 아래에 배치 */}
    </div>
  );
}

export default App;
