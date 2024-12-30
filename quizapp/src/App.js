import React from "react";
import BackgroundVideo from "./components/layout/BackgroundVideo";
import ScrollText from "./components/common/ScrollText";
import EmailSubscribe from "./components/common/EmailSubscribe";

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
