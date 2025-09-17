import React from 'react';
import { X } from 'lucide-react';

const songStyles = {
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    position: 'relative',
    overflow: 'hidden',
  },
  current: {
    background: 'linear-gradient(to right, rgba(229, 98, 145, 0.3), rgba(140, 82, 255, 0.3))',
    border: '1px solid rgba(229, 98, 145, 0.5)',
  },
  thumbnail: {
    width: '2.5rem',
    height: '2.5rem',
    background: 'linear-gradient(to bottom right, #e56291, #8c52ff)',
    borderRadius: '9999px',
    flexShrink: '0',
  },
  info: {
    flex: '1',
    minWidth: '0',
  },
  name: {
    fontWeight: '500',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  size: {
    fontSize: '0.875rem',
    color: '#a0aec0',
  },
  removeButton: {
    padding: '0.25rem',
    borderRadius: '0.25rem',
    background: 'none',
    border: 'none',
    color: '#f87171',
    cursor: 'pointer',
    opacity: '0',
    transition: 'opacity 0.2s',
  },
};

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
      style={isCurrentSong ? { ...songStyles.item, ...songStyles.current } : songStyles.item}
      onClick={onSelect}
      onMouseEnter={(e) => e.currentTarget.querySelector('button').style.opacity = '1'}
      onMouseLeave={(e) => e.currentTarget.querySelector('button').style.opacity = '0'}
    >
      <div style={songStyles.thumbnail}></div>
      <div style={songStyles.info}>
        <p style={songStyles.name}>{song.name.replace(/\.[^/.]+$/, "")}</p>
        <p style={songStyles.size}>{formatFileSize(song.size)}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        style={songStyles.removeButton}
      >
        <X size={16} />
      </button>
    </div>
  );
};