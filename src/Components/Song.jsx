import React from 'react';
import { X } from 'lucide-react';

export const Song = ({ song, index, isCurrentSong, onSelect, onRemove }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
        isCurrentSong 
          ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-500/50' 
          : 'hover:bg-white/10'
      }`}
      onClick={onSelect}
    >
      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex-shrink-0"></div>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{song.name.replace(/\.[^/.]+$/, "")}</p>
        <p className="text-sm text-gray-400">{formatFileSize(song.size)}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded text-red-400 transition-all"
      >
        <X size={16} />
      </button>
    </div>
  );
};
