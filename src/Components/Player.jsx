import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';
import ShowSong from './ShowSong.jsx';

const playerStyles = {
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    borderRadius: '1.5rem',
    padding: '2rem',
    marginBottom: '1.5rem',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  button: {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    transition: 'background-color 0.3s',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
  },
  mainButton: {
    padding: '1rem',
    borderRadius: '9999px',
    background: 'linear-gradient(to right, #e56291, #8c52ff)',
    transition: 'all 0.3s',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
  },
  buttonDisabled: {
    opacity: '0.5',
    cursor: 'not-allowed',
  },
  shuffleActive: {
    backgroundColor: '#e56291',
    color: 'white',
  },
};

export const Player = ({ 
  currentSong, 
  isPlaying, 
  setIsPlaying, 
  songs, 
  handleNext, 
  handlePrevious, 
  shuffle, 
  setShuffle, 
  repeat, 
  setRepeat, 
  audioRef, 
  setErrors 
}) => {
  const togglePlayPause = () => {
    if (!audioRef.current || songs.length === 0) return;
    setIsPlaying(!isPlaying);
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };
  
  const toggleRepeat = () => {
    setRepeat((prev) => (prev + 1) % 3);
  };

  return (
    <div style={playerStyles.container}>
      <ShowSong currentSong={currentSong} />
      
      <div style={playerStyles.controls}>
        <button
          onClick={toggleShuffle}
          style={{ ...playerStyles.button, ...(shuffle && playerStyles.shuffleActive) }}
          title="Shuffle"
        >
          <Shuffle size={20} />
        </button>
        
        <button
          onClick={handlePrevious}
          disabled={songs.length === 0}
          style={{ ...playerStyles.button, ...(songs.length === 0 && playerStyles.buttonDisabled) }}
        >
          <SkipBack size={24} />
        </button>
        
        <button
          onClick={togglePlayPause}
          disabled={songs.length === 0}
          style={{ ...playerStyles.mainButton, ...(songs.length === 0 && playerStyles.buttonDisabled) }}
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        
        <button
          onClick={handleNext}
          disabled={songs.length === 0}
          style={{ ...playerStyles.button, ...(songs.length === 0 && playerStyles.buttonDisabled) }}
        >
          <SkipForward size={24} />
        </button>
        
        <button
          onClick={toggleRepeat}
          style={{ ...playerStyles.button, ...(repeat > 0 && playerStyles.shuffleActive) }}
          title={repeat === 0 ? 'No repeat' : repeat === 1 ? 'Repeat one' : 'Repeat all'}
        >
          <Repeat size={20} />
          {repeat === 1 && <span style={{ fontSize: '0.75rem', position: 'absolute', top: '-0.5rem', right: '-0.5rem' }}>1</span>}
        </button>
      </div>
    </div>
  );
};