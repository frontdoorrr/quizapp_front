import React from 'react';
import styled from 'styled-components';
import ScrollText from '../components/common/ScrollText';
import EmailSubscribe from '../components/common/EmailSubscribe';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

function Home() {
  return (
    <HomeContainer>
      <ScrollText />
      <EmailSubscribe />
    </HomeContainer>
  );
}

export default Home;
