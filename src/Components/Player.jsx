import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';
import ShowSong from './ShowSong.jsx';

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
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        setErrors(prev => [...prev, 'Error playing audio: ' + error.message]);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };
  
  const toggleRepeat = () => {
    setRepeat((prev) => (prev + 1) % 3);
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 mb-6">
      <ShowSong currentSong={currentSong} />
      
      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <button
          onClick={toggleShuffle}
          className={`p-2 rounded-lg transition-colors ${
            shuffle ? 'bg-pink-500 text-white' : 'hover:bg-white/10'
          }`}
          title="Shuffle"
        >
          <Shuffle size={20} />
        </button>
        
        <button
          onClick={handlePrevious}
          disabled={songs.length === 0}
          className="p-3 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
        >
          <SkipBack size={24} />
        </button>
        
        <button
          onClick={togglePlayPause}
          disabled={songs.length === 0}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 p-4 rounded-full transition-all duration-300"
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
        
        <button
          onClick={handleNext}
          disabled={songs.length === 0}
          className="p-3 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
        >
          <SkipForward size={24} />
        </button>
        
        <button
          onClick={toggleRepeat}
          className={`p-2 rounded-lg transition-colors ${
            repeat > 0 ? 'bg-pink-500 text-white' : 'hover:bg-white/10'
          }`}
          title={repeat === 0 ? 'No repeat' : repeat === 1 ? 'Repeat one' : 'Repeat all'}
        >
          <Repeat size={20} />
          {repeat === 1 && <span className="text-xs absolute -mt-2 -mr-2">1</span>}
        </button>
      </div>
    </div>
  );
};