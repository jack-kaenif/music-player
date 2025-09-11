import React from 'react';
import { SortAsc, SortDesc, Trash2 } from 'lucide-react';
import SongContainer from './SongContainer.jsx';

const Playlist = ({ 
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
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Playlist</h2>
        <div className="flex gap-2">
          <button
            onClick={sortSongs}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Sort by name"
          >
            {sortOrder === 'asc' ? <SortAsc size={18} /> : <SortDesc size={18} />}
          </button>
          <button
            onClick={clearPlaylist}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-400"
            title="Clear playlist"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      {songs.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>No songs loaded</p>
          <p className="text-sm mt-2">Upload some audio files to get started</p>
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

export default Playlist;