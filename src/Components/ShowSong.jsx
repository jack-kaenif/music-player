import React from 'react';
import { Music } from 'lucide-react';

const showSongStyles = {
  container: {
    textAlign: 'center',
  },
  artwork: {
    width: '180px',
    height: '180px',
    borderRadius: '12px',
    margin: '0 auto 1.8rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#300040', // Fallback color
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease-out',
  },
  artworkHover: {
    transform: 'scale(1.03)',
  },
  noSongArtwork: {
    width: '180px',
    height: '180px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    margin: '0 auto 1.8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#a0a0a0',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
  },
  noSongText: {
    fontSize: '1.2rem',
    fontWeight: '500',
    color: '#a0a0a0',
  },
  innerIcon: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '0.75rem',
    color: '#e0e0e0',
  },
  artist: {
    color: '#b0b0b0',
    marginBottom: '1.5rem',
    fontSize: '1.2rem',
  },
};

export const ShowSong = ({ currentSong }) => {
  const artworkStyle = currentSong && currentSong.cover ? 
    { ...showSongStyles.artwork, backgroundImage: `url(${currentSong.cover})` } : 
    showSongStyles.artwork;
    
  return (
    <div style={showSongStyles.container}>
      {currentSong ? (
        <>
          <div 
            style={artworkStyle}
            onMouseOver={e => e.currentTarget.style.transform = showSongStyles.artworkHover.transform}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {!currentSong.cover && <Music size={60} style={showSongStyles.innerIcon} />}
          </div>
          <h2 style={showSongStyles.title}>{currentSong.title}</h2>
          <p style={showSongStyles.artist}>{currentSong.artist}</p>
        </>
      ) : (
        <>
          <div style={showSongStyles.noSongArtwork}>
            <span style={showSongStyles.noSongText}>No Song</span>
          </div>
          <h2 style={showSongStyles.title}>Nothing is playing</h2>
          <p style={showSongStyles.artist}>Upload files to start listening</p>
        </>
      )}
    </div>
  );
};

export default ShowSong;