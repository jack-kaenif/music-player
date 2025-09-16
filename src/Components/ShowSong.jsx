import React from 'react';

export const ShowSong = ({ currentSong }) => {
  return (
    <div className="text-center">
      {currentSong ? (
        <>
          <div className="w-48 h-48 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <div className="w-32 h-32 bg-white/20 rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold mb-2">{currentSong.name.replace(/\.[^/.]+$/, "")}</h2>
          <p className="text-gray-400 mb-6">Unknown Artist</p>
        </>
      ) : (
        <>
          <div className="w-48 h-48 bg-gray-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-gray-400">No Song</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Select a song to play</h2>
          <p className="text-gray-400 mb-6">Upload audio files to get started</p>
        </>
      )}
    </div>
  );
};

export default ShowSong;