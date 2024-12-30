import React from 'react';
import BackgroundVideo from '../components/layout/BackgroundVideo';
import ScrollText from '../components/common/ScrollText';
import EmailSubscribe from '../components/common/EmailSubscribe';

function Home() {
  return (
    <div className="home">
      <BackgroundVideo />
      <ScrollText />
      <EmailSubscribe />
    </div>
  );
}

export default Home;
