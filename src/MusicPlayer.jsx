import { Playlist } from './Playlist.jsx';
import { Player } from './Player.jsx'; 
import { PlayingBar } from './PlayingBar.jsx';

export const MusicPlayer = () => {
  // Estados principales
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  
  // Estados avanzados
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(0); // 0: no repeat, 1: repeat one, 2: repeat all
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'asc', 'desc'
  
  // Referencias
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Cargar datos del localStorage al montar
  useEffect(() => {
    const savedSongs = localStorage.getItem('musicPlayer_songs');
    const savedVolume = localStorage.getItem('musicPlayer_volume');
    const savedCurrentSong = localStorage.getItem('musicPlayer_currentSong');
    
    if (savedSongs) {
      try {
        setSongs(JSON.parse(savedSongs));
      } catch (error) {
        console.error('Error loading saved songs:', error);
      }
    }
    
    if (savedVolume) {
      setVolume(parseInt(savedVolume));
    }
    
    if (savedCurrentSong) {
      setCurrentSongIndex(parseInt(savedCurrentSong));
    }
  }, []);
  
  // Guardar en localStorage cuando cambian las canciones
  useEffect(() => {
    if (songs.length > 0) {
      localStorage.setItem('musicPlayer_songs', JSON.stringify(songs.map(song => ({
        name: song.name,
        size: song.size,
        type: song.type
      }))));
    }
  }, [songs]);
  
  // Guardar configuración en localStorage
  useEffect(() => {
    localStorage.setItem('musicPlayer_volume', volume.toString());
  }, [volume]);
  
  useEffect(() => {
    localStorage.setItem('musicPlayer_currentSong', currentSongIndex.toString());
  }, [currentSongIndex]);
  
  // Configurar audio cuando cambia la canción
  useEffect(() => {
    if (audioRef.current && songs[currentSongIndex]) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
      audioRef.current.load();
    }
  }, [currentSongIndex, songs]);
  
  // Actualizar volumen
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);
  
  // Event listeners del audio
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
  }, [currentSongIndex, repeat, songs.length]);
  
  // Funciones de utilidad
  const validateAudioFile = (file) => {
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/m4a'];
    const validExtensions = ['.mp3', '.wav', '.ogg', '.m4a'];
    const fileName = file.name.toLowerCase();
    const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
    const hasValidType = validTypes.includes(file.type);
    
    return hasValidExtension || hasValidType;
  };
  
  // Handlers de archivos
  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    
    setIsLoading(true);
    setErrors([]);
    
    const validFiles = [];
    const invalidFiles = [];
    
    for (const file of files) {
      if (validateAudioFile(file)) {
        const url = URL.createObjectURL(file);
        validFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          url: url,
          file: file
        });
      } else {
        invalidFiles.push(file.name);
      }
    }
    
    if (invalidFiles.length > 0) {
      setErrors([`Invalid audio files: ${invalidFiles.join(', ')}`]);
    }
    
    setSongs(prev => [...prev, ...validFiles]);
    setIsLoading(false);
    
    event.target.value = '';
  };
  
  // Handlers de reproducción
  const handleNext = () => {
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
    setIsPlaying(false);
  };
  
  const handlePrevious = () => {
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
    setIsPlaying(false);
  };
  
  const clearPlaylist = () => {
    songs.forEach(song => {
      if (song.url) {
        URL.revokeObjectURL(song.url);
      }
    });
    setSongs([]);
    setCurrentSongIndex(0);
    setIsPlaying(false);
    localStorage.removeItem('musicPlayer_songs');
  };
  
  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      songs.forEach(song => {
        if (song.url) {
          URL.revokeObjectURL(song.url);
        }
      });
    };
  }, []);
  
  const currentSong = songs[currentSongIndex];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">
            Music Player
          </h1>
          
          {/* Upload Section */}
          <div className="mb-6">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".mp3,.wav,.ogg,.m4a,audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <Upload size={20} />
              {isLoading ? 'Loading...' : 'Upload Songs'}
            </button>
          </div>
          
          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4">
              {errors.map((error, index) => (
                <p key={index} className="text-red-300 text-sm">{error}</p>
              ))}
              <button
                onClick={() => setErrors([])}
                className="text-red-300 hover:text-white text-xs mt-2"
              >
                Clear errors
              </button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Playlist Component */}
          <div className="lg:col-span-1">
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
          
          {/* Player Component */}
          <div className="lg:col-span-2">
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
              currentSong={currentSong}
            />
          </div>
        </div>
        
        {/* Hidden Audio Element */}
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