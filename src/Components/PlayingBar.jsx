import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const playingBarStyles = {
  container: {
    padding: "2rem 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
  },
  progressContainer: {
    display: "flex",
    alignItems: "center",
    gap: "1.2rem",
    width: "100%",
  },
  progressTime: {
    fontSize: "1rem",
    color: "#b0b0b0",
    fontWeight: "500",
    width: "45px", // Ancho fijo para el tiempo
    textAlign: "center",
    flexShrink: 0,
  },
  progressBar: {
    flex: "1",
    height: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: "9999px",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    transition: "background-color 0.3s",
  },
  progressBarHover: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: "9999px",
    background: "linear-gradient(to right, #9C27B0, #7b1fa2)", // Degradado de acento
    width: "0%", // Se controla dinámicamente
  },
  volumeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.2rem",
    width: "100%",
    justifyContent: "center",
    position: "relative",
    top: "-10.5vw",
    left: "25vw",
  },
  volumeIcon: {
    color: "#b0b0b0",
    cursor: "pointer",
    transition: "color 0.3s, transform 0.2s",
  },
  volumeIconHover: {
    color: "#fff",
    transform: "scale(1.1)",
  },
  volumeSlider: {
    width: "120px", // Ancho fijo para el slider de volumen
    height: "8px",
    WebkitAppearance: "none",
    appearance: "none",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    borderRadius: "9999px",
    outline: "none",
    cursor: "pointer",
    transition: "background 0.3s",
    transform: "rotate(-90deg)",
  },
  volumeSliderThumb: {
    WebkitAppearance: "none",
    appearance: "none",
    width: "18px",
    height: "18px",
    borderRadius: "9999px",
    background: "#9C27B0", // Color de acento
    cursor: "pointer",
    border: "2px solid #fff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
    transition: "background 0.3s, border-color 0.3s",
  },
};

export const PlayingBar = ({
  currentTime,
  duration,
  volume,
  setVolume,
  isMuted,
  setIsMuted,
  audioRef,
  setCurrentTime,
}) => {
  const progressBarRef = useRef(null);
  const volumeInputRef = useRef(null);

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || !isFinite(timeInSeconds)) {
      return "0:00";
    }
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current || !progressBarRef.current) return;
    const barWidth = progressBarRef.current.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const newTime = (clickX / barWidth) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
      if (isMuted && newVolume > 0) {
        setIsMuted(false);
      }
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume / 100;
    }
  };

  const progressPercent = (currentTime / duration) * 100 || 0;
  const volumePercent = isMuted ? 0 : volume;

  // Actualizar el estilo de fondo del slider de volumen dinámicamente
  useEffect(() => {
    if (volumeInputRef.current) {
      volumeInputRef.current.style.background = `linear-gradient(to right, #9C27B0 0%, #9C27B0 ${volumePercent}%, rgba(255, 255, 255, 0.15) ${volumePercent}%, rgba(255, 255, 255, 0.15) 100%)`;
    }
  }, [volumePercent]);

  return (
    <div style={playingBarStyles.container}>
      <div style={playingBarStyles.progressContainer}>
        <span style={playingBarStyles.progressTime}>
          {formatTime(currentTime)}
        </span>
        <div
          style={playingBarStyles.progressBar}
          ref={progressBarRef}
          onClick={handleProgressClick}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              playingBarStyles.progressBarHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              "rgba(255, 255, 255, 0.15)")
          }
        >
          <div
            style={{
              ...playingBarStyles.progressBarFill,
              width: `${progressPercent}%`,
            }}
          ></div>
        </div>
        <span style={playingBarStyles.progressTime}>
          {formatTime(duration)}
        </span>
      </div>
      <div style={playingBarStyles.volumeContainer}>
        <input
          ref={volumeInputRef}
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          style={playingBarStyles.volumeSlider}
        />
        <button
          onClick={handleMute}
          style={{
            ...playingBarStyles.volumeIcon,
            background: "none",
            border: "none",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.color =
              playingBarStyles.volumeIconHover.color)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.color = playingBarStyles.volumeIcon.color)
          }
        >
          {isMuted || volume === 0 ? (
            <VolumeX size={20} />
          ) : (
            <Volume2 size={20} />
          )}
        </button>
      </div>
    </div>
  );
};
