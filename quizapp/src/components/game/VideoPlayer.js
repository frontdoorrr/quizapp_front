import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const VideoContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  aspect-ratio: 16/9;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

function VideoPlayer({ videoUrl }) {
  return (
    <VideoContainer>
      <Video
        src={videoUrl}
        controls
        autoPlay
        playsInline
      />
    </VideoContainer>
  );
}

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

export default VideoPlayer;
