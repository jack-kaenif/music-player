import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Playlist } from './Components/Playlist.jsx';
import { Player } from './Components/Player.jsx'; 
import { PlayingBar } from './Components/PlayingBar.jsx';
import { Upload } from 'lucide-react';

const musicPlayerStyles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #2b0c41, #360a3a)',
    color: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem 1rem',
  },
  mainContent: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    backgroundImage: 'linear-gradient(to right, #e56291, #8c52ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  uploadSection: {
    marginBottom: '1.5rem',
  },
  uploadButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    margin: '0 auto',
    padding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    fontWeight: '600',
    backgroundImage: 'linear-gradient(to right, #e56291, #8c52ff)',
    transition: 'all 0.3s ease',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    opacity: 1,
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    border: '1px solid rgba(239, 68, 68, 0.5)',
    borderRadius: '0.5rem',
    padding: '1rem',
    marginBottom: '1rem',
  },
  errorText: {
    color: '#fca5a5',
    fontSize: '0.875rem',
  },
  errorButton: {
    background: 'none',
    border: 'none',
    color: '#fca5a5',
    cursor: 'pointer',
    fontSize: '0.75rem',
    marginTop: '0.5rem',
    textDecoration: 'underline',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '2rem',
  },
};

const mediaQueryLg = '@media (min-width: 1024px)';
musicPlayerStyles.grid[mediaQueryLg] = {
  gridTemplateColumns: 'repeat(3, 1fr)',
};

export const MusicPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(0);
  const [sortOrder, setSortOrder] = useState('none');
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleNext = useCallback(() => {
    if (songs.length === 0) return;
    let nextIndex;
    if (shuffle) {
      do {
        nextIndex = Math.floor(Math.random() * songs.length);
      } while (nextIndex === currentSongIndex && songs.length > 1);
    } else {
      nextIndex = (currentSongIndex + 1) % songs.length;
    }
    setCurrentSongIndex(nextIndex);
  }, [songs, currentSongIndex, shuffle]);

  const handlePrevious = useCallback(() => {
    if (songs.length === 0) return;
    let prevIndex;
    if (shuffle) {
      do {
        prevIndex = Math.floor(Math.random() * songs.length);
      } while (prevIndex === currentSongIndex && songs.length > 1);
    } else {
      prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    }
    setCurrentSongIndex(prevIndex);
  }, [songs, currentSongIndex, shuffle]);

  const clearPlaylist = useCallback(() => {
    songs.forEach(song => {
      if (song.url) {
        URL.revokeObjectURL(song.url);
      }
    });
    setSongs([]);
    setCurrentSongIndex(0);
    setIsPlaying(false);
    localStorage.removeItem('musicPlayer_songs');
  }, [songs, setCurrentSongIndex, setIsPlaying, setSongs]);

  const validateAudioFile = useCallback((file) => {
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/m4a'];
    const validExtensions = ['.mp3', '.wav', '.ogg', '.m4a'];
    const fileName = file.name.toLowerCase();
    const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
    const hasValidType = validTypes.includes(file.type);
    return hasValidExtension || hasValidType;
  }, []);

  const handleFileUpload = useCallback(async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    setIsLoading(true);
    setErrors([]);
    const newSongs = [];
    const invalidFiles = [];

    for (const file of files) {
      if (validateAudioFile(file)) {
        const url = URL.createObjectURL(file);
        
        let artist = 'Unknown Artist';
        let title = file.name.replace(/\.[^/.]+$/, "");
        const parts = file.name.split(' - ');
        
        if (parts.length > 1) {
            artist = parts[0];
            title = parts.slice(1).join(' - ').replace(/\.[^/.]+$/, "");
        }

        newSongs.push({
          name: file.name,
          size: file.size,
          type: file.type,
          url: url,
          file: file,
          artist: artist,
          title: title
        });
      } else {
        invalidFiles.push(file.name);
      }
    }

    if (invalidFiles.length > 0) {
      setErrors([`Invalid audio files: ${invalidFiles.join(', ')}`]);
    }
    
    setSongs(prev => [...prev, ...newSongs]);
    setIsLoading(false);
    event.target.value = '';
  }, [setSongs, setIsLoading, setErrors, validateAudioFile]);

  useEffect(() => {
    localStorage.removeItem('musicPlayer_songs');
    console.log('Se limpiaron las canciones de la sesión anterior.');

    const savedVolume = localStorage.getItem('musicPlayer_volume');
    if (savedVolume) {
      setVolume(parseInt(savedVolume));
    }
  }, []);

  useEffect(() => {
    if (songs.length > 0) {
      localStorage.setItem('musicPlayer_songs', JSON.stringify(songs.map(song => ({
        name: song.name,
        size: song.size,
        type: song.type
      }))));
    }
  }, [songs]);

  useEffect(() => {
    localStorage.setItem('musicPlayer_volume', volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('musicPlayer_currentSong', currentSongIndex.toString());
  }, [currentSongIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || songs.length === 0) return;
    const newSong = songs[currentSongIndex];
    if (audio.src !== newSong.url) {
      audio.src = newSong.url;
      audio.load();
    }
    // Lógica nueva: Si el reproductor estaba en estado de "reproduciendo"
    // al cambiar de canción, la nueva debe iniciar automáticamente.
    if (isPlaying) {
      audio.play().catch(error => {
        setErrors(prev => [...prev, 'Error playing audio: ' + error.message]);
      });
    }
  }, [currentSongIndex, songs]); // Agrega `isPlaying` a las dependencias si quieres que se dispare al cambiar de estado también.

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(error => {
        setErrors(prev => [...prev, 'Error playing audio: ' + error.message]);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      if (repeat === 1) {
        audio.currentTime = 0;
        audio.play();
      } else if (repeat === 2 || currentSongIndex < songs.length - 1) {
        handleNext();
      } else {
        setIsPlaying(false);
      }
    };
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', (e) => {
      setErrors(prev => [...prev, `Error playing song: ${e.message}`]);
      setIsPlaying(false);
    });
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleEnded);
    };
  }, [currentSongIndex, repeat, songs.length, handleNext, setIsPlaying]);

  useEffect(() => {
    return () => {
      songs.forEach(song => {
        if (song.url) {
          URL.revokeObjectURL(song.url);
        }
      });
    };
  }, [songs]);

  const currentSong = songs[currentSongIndex];

  return (
    <div style={musicPlayerStyles.container}>
      <div style={musicPlayerStyles.mainContent}>
        <div style={musicPlayerStyles.header}>
          <h1 style={musicPlayerStyles.title}>Music Player</h1>
          <div style={musicPlayerStyles.uploadSection}>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".mp3,.wav,.ogg,.m4a,audio/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              style={isLoading ? {...musicPlayerStyles.uploadButton, ...musicPlayerStyles.buttonDisabled} : musicPlayerStyles.uploadButton}
            >
              <Upload size={20} />
              {isLoading ? 'Loading...' : 'Upload Songs'}
            </button>
          </div>
          {errors.length > 0 && (
            <div style={musicPlayerStyles.errorBox}>
              {errors.map((error, index) => (
                <p key={index} style={musicPlayerStyles.errorText}>{error}</p>
              ))}
              <button onClick={() => setErrors([])} style={musicPlayerStyles.errorButton}>
                Clear errors
              </button>
            </div>
          )}
        </div>
        <div style={musicPlayerStyles.grid}>
          <div style={{ '@media (min-width: 1024px)': { gridColumn: 'span 1' } }}>
            <Playlist 
              songs={songs}
              setSongs={setSongs}
              currentSongIndex={currentSongIndex}
              setCurrentSongIndex={setCurrentSongIndex}
              clearPlaylist={clearPlaylist}
              setIsPlaying={setIsPlaying}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>
          <div style={{ '@media (min-width: 1024px)': { gridColumn: 'span 2' } }}>
            <Player 
              currentSong={currentSong}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              songs={songs}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              shuffle={shuffle}
              setShuffle={setShuffle}
              repeat={repeat}
              setRepeat={setRepeat}
              audioRef={audioRef}
              setErrors={setErrors}
            />
            <PlayingBar 
              currentTime={currentTime}
              duration={duration}
              volume={volume}
              setVolume={setVolume}
              isMuted={isMuted}
              setIsMuted={setIsMuted}
              audioRef={audioRef}
              setCurrentTime={setCurrentTime}
            />
          </div>
        </div>
        {currentSong && (
          <audio
            ref={audioRef}
            src={currentSong.url}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            preload="metadata"
          />
        )}
      </div>
    </div>
  );
};