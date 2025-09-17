import React from 'react';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Song } from './Song.jsx';

const playlistStyles = {
  container: {
    backgroundColor: 'rgba(20, 0, 30, 0.6)',
    borderRadius: '18px',
    padding: '1.5rem',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: '600',
    color: '#e0e0e0',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
  },
  button: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#e0e0e0',
    border: 'none',
    borderRadius: '10px',
    padding: '0.6rem',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  buttonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.05)',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    maxHeight: 'calc(100vh - 350px)', // Ajustar para altura dinámica
    overflowY: 'auto',
    flexGrow: 1, // Permitir que la lista crezca
  },
  emptyState: {
    textAlign: 'center',
    color: '#a0a0a0',
    padding: '2rem 0',
    fontSize: '1.1rem',
  },
  sortButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#e0e0e0',
    border: 'none',
    borderRadius: '10px',
    padding: '0.6rem 1rem',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    gap: '0.4rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  sortButtonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.02)',
  },
};

export const Playlist = ({ songs, setSongs, currentSongIndex, setCurrentSongIndex, clearPlaylist, setIsPlaying, sortOrder, setSortOrder }) => {
  const removeSong = (indexToRemove) => {
    setSongs(prevSongs => {
      const newSongs = prevSongs.filter((_, index) => index !== indexToRemove);
      if (newSongs.length === 0) {
        setIsPlaying(false);
      } else if (indexToRemove === currentSongIndex) {
        const nextIndex = indexToRemove % newSongs.length;
        setCurrentSongIndex(nextIndex);
      } else if (indexToRemove < currentSongIndex) {
        setCurrentSongIndex(prevIndex => prevIndex - 1);
      }
      return newSongs;
    });
  };

  const handleSort = (newOrder) => {
    const sortedSongs = [...songs].sort((a, b) => {
      if (newOrder === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      if (newOrder === 'title-desc') {
        return b.title.localeCompare(a.title);
      }
      if (newOrder === 'artist-asc') {
        return a.artist.localeCompare(b.artist);
      }
      if (newOrder === 'artist-desc') {
        return b.artist.localeCompare(a.artist);
      }
      return 0;
    });
    setSongs(sortedSongs);
    setSortOrder(newOrder);
  };
  
  return (
    <div style={playlistStyles.container}>
      <div style={playlistStyles.header}>
        <h3 style={playlistStyles.title}>Playlist</h3>
        <div style={playlistStyles.controls}>
          <button 
            style={playlistStyles.sortButton} 
            onClick={() => handleSort(sortOrder === 'title-asc' ? 'title-desc' : 'title-asc')}
            onMouseOver={e => e.currentTarget.style.backgroundColor = playlistStyles.sortButtonHover.backgroundColor}
            onMouseOut={e => e.currentTarget.style.backgroundColor = playlistStyles.sortButton.background}
          >
            Sort by Title {sortOrder.startsWith('title') && (sortOrder.endsWith('asc') ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
          </button>
          <button 
            style={playlistStyles.button} 
            onClick={clearPlaylist} 
            title="Clear Playlist"
            onMouseOver={e => e.currentTarget.style.backgroundColor = playlistStyles.buttonHover.backgroundColor}
            onMouseOut={e => e.currentTarget.style.backgroundColor = playlistStyles.button.background}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
      {songs.length > 0 ? (
        <ul style={playlistStyles.list}>
          {songs.map((song, index) => (
            <Song
              key={song.url + index}
              song={song}
              index={index}
              currentSongIndex={currentSongIndex}
              onSelect={setCurrentSongIndex}
              onRemove={removeSong}
            />
          ))}
        </ul>
      ) : (
        <div style={playlistStyles.emptyState}>
          <p>Your playlist is empty. Upload some songs!</p>
        </div>
      )}
    </div>
  );
};