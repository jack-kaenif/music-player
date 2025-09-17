import React from 'react';

const playingBarStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  time: {
    fontSize: '0.875rem',
    fontFamily: 'monospace',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  seekBar: {
    width: '100%',
    height: '0.25rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '9999px',
    cursor: 'pointer',
  },
  volumeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  volumeSlider: {
    width: '6rem',
    height: '0.25rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '9999px',
    cursor: 'pointer',
  },
};

export const PlayingBar = ({ 
  currentTime, 
  duration, 
  volume, 
  setVolume, 
  isMuted, 
  setIsMuted, 
  audioRef, 
  setCurrentTime 
}) => {

  const formatTime = (time) => {
    if (isNaN(time)) {
      return '0:00';
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (event) => {
    if (audioRef.current) {
      const newTime = event.target.value;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    if (audioRef.current) {
      audioRef.current.volume = event.target.value / 100;
      if (isMuted) {
        setIsMuted(false);
      }
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume / 100 : 0;
    }
  };

  return (
    <div style={playingBarStyles.container}>
      <span style={playingBarStyles.time}>{formatTime(currentTime)}</span>
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={handleSeek}
        style={playingBarStyles.seekBar}
      />
      <span style={playingBarStyles.time}>{formatTime(duration)}</span>
      <div style={playingBarStyles.volumeContainer}>
        <button onClick={handleToggleMute} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
          {isMuted ? '🔇' : '🔊'}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          style={playingBarStyles.volumeSlider}
        />
      </div>
    </div>
  );
};