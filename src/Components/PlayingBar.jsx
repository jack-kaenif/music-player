import React from 'react';

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
    <div className="flex items-center gap-4 mt-6">
      {/* Time and duration display */}
      <span className="text-sm font-mono text-white/70">{formatTime(currentTime)}</span>

      {/* Seek bar */}
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={handleSeek}
        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
      />

      {/* Duration display */}
      <span className="text-sm font-mono text-white/70">{formatTime(duration)}</span>

      {/* Volume controls */}
      <div className="flex items-center gap-2">
        <button onClick={handleToggleMute}>
          {isMuted ? '🔇' : '🔊'}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};