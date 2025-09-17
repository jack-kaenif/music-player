import React from 'react';

const showSongStyles = {
  container: {
    textAlign: 'center',
  },
  artwork: {
    width: '12rem',
    height: '12rem',
    background: 'linear-gradient(to bottom right, #e56291, #8c52ff)',
    borderRadius: '9999px',
    margin: '0 auto 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noSongArtwork: {
    width: '12rem',
    height: '12rem',
    backgroundColor: '#4a5568',
    borderRadius: '9999px',
    margin: '0 auto 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#a0aec0',
  },
  innerCircle: {
    width: '8rem',
    height: '8rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '9999px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  artist: {
    color: '#a0aec0',
    marginBottom: '1.5rem',
  },
};

export const ShowSong = ({ currentSong }) => {
  return (
    <div style={showSongStyles.container}>
      {currentSong ? (
        <>
          <div style={showSongStyles.artwork}>
            <div style={showSongStyles.innerCircle}></div>
          </div>
          <h2 style={showSongStyles.title}>{currentSong.name.replace(/\.[^/.]+$/, "")}</h2>
          <p style={showSongStyles.artist}>Unknown Artist</p>
        </>
      ) : (
        <>
          <div style={showSongStyles.noSongArtwork}>
            <span>No Song</span>
          </div>
          <h2 style={showSongStyles.title}>Select a song to play</h2>
          <p style={showSongStyles.artist}>Upload audio files to get started</p>
        </>
      )}
    </div>
  );
};

export default ShowSong;