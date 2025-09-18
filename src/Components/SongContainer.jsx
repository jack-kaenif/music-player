import React from "react";
import { Song } from "./Song.jsx";

const songContainerStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    maxHeight: "24rem",
    overflowY: "auto",
  },
};

export const SongContainer = ({
  songs,
  setSongs,
  currentSongIndex,
  setCurrentSongIndex,
  setIsPlaying,
}) => {
  const selectSong = (index) => {
    setCurrentSongIndex(index);
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
    <div style={songContainerStyles.container}>
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
