import React from 'react';
import { Song } from './Song.jsx';

export const SongContainer = ({ 
  songs, 
  setSongs, 
  currentSongIndex, 
  setCurrentSongIndex, 
  setIsPlaying 
}) => {
  const selectSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(false);
  };
  
  const removeSong = (index) => {
    const songToRemove = songs[index];
    if (songToRemove.url) {
      URL.revokeObjectURL(songToRemove.url);
    }
    
    const newSongs = songs.filter((_, i) => i !== index);
    setSongs(newSongs);
    
    if (index === currentSongIndex && newSongs.length > 0) {
      setCurrentSongIndex(Math.min(currentSongIndex, newSongs.length - 1));
    } else if (index < currentSongIndex) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else if (newSongs.length === 0) {
      setCurrentSongIndex(0);
      setIsPlaying(false);
    }
  };

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {songs.map((song, index) => (
        <Song 
          key={index}
          song={song}
          index={index}
          isCurrentSong={index === currentSongIndex}
          onSelect={() => selectSong(index)}
          onRemove={() => removeSong(index)}
        />
      ))}
    </div>
  );
};