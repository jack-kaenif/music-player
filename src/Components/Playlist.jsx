import React from 'react';
import { SortAsc, SortDesc, Trash2 } from 'lucide-react';
import { SongContainer } from './SongContainer.jsx';

const playlistStyles = {
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    borderRadius: '1.5rem',
    padding: '1.5rem',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '600',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  actionButton: {
    padding: '0.5rem',
    borderRadius: '0.5rem',
    transition: 'background-color 0.3s',
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
  emptyState: {
    textAlign: 'center',
    padding: '2rem 0',
    color: '#a0aec0',
  },
  emptyText: {
    fontSize: '0.875rem',
    marginTop: '0.5rem',
  },
};

export const Playlist = ({ 
  songs, 
  setSongs, 
  currentSongIndex, 
  setCurrentSongIndex, 
  clearPlaylist, 
  setIsPlaying,
  sortOrder,
  setSortOrder 
}) => {
  const sortSongs = () => {
    let newOrder;
    let sortedSongs = [...songs];
    if (sortOrder === 'none' || sortOrder === 'desc') {
      sortedSongs.sort((a, b) => a.name.localeCompare(b.name));
      newOrder = 'asc';
    } else {
      sortedSongs.sort((a, b) => b.name.localeCompare(a.name));
      newOrder = 'desc';
    }
    setSongs(sortedSongs);
    setSortOrder(newOrder);
  };

  return (
    <div style={playlistStyles.card}>
      <div style={playlistStyles.header}>
        <h2 style={playlistStyles.title}>Playlist</h2>
        <div style={playlistStyles.actions}>
          <button
            onClick={sortSongs}
            style={{ ...playlistStyles.actionButton, color: 'inherit' }}
            title="Sort by name"
          >
            {sortOrder === 'asc' ? <SortAsc size={18} /> : <SortDesc size={18} />}
          </button>
          <button
            onClick={clearPlaylist}
            style={{ ...playlistStyles.actionButton, color: '#f87171' }}
            title="Clear playlist"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      {songs.length === 0 ? (
        <div style={playlistStyles.emptyState}>
          <p>No songs loaded</p>
          <p style={playlistStyles.emptyText}>Upload some audio files to get started</p>
        </div>
      ) : (
        <SongContainer 
          songs={songs}
          setSongs={setSongs}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          setIsPlaying={setIsPlaying}
        />
      )}
    </div>
  );
};