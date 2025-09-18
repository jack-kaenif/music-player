import React from "react";
import {
  Play,
  Pause,
  FastForward,
  Rewind,
  Shuffle,
  Repeat,
} from "lucide-react";
import ShowSong from "./ShowSong.jsx";

const playerStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2.5rem",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "2.5rem",
  },
  mainControls: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  },
  controlButton: {
    background: "none",
    border: "none",
    color: "#e0e0e0",
    cursor: "pointer",
    transition: "color 0.3s, transform 0.2s",
  },
  controlButtonHover: {
    color: "#fff",
    transform: "scale(1.1)",
  },
  playPauseButton: {
    background: "linear-gradient(to right, #7b1fa2, #9c27b0)", // Degradado de acento
    color: "#fff",
    width: "4.5rem",
    height: "4.5rem",
    borderRadius: "9999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 25px rgba(156, 39, 176, 0.4)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  playPauseButtonHover: {
    transform: "scale(1.1)",
    boxShadow: "0 10px 30px rgba(156, 39, 176, 0.6)",
  },
  subControl: {
    color: "#b0b0b0",
    transition: "color 0.3s, transform 0.2s",
  },
  subControlActive: {
    color: "#9C27B0", // Color de acento activo
    transform: "scale(1.15)",
  },
  subControlHover: {
    color: "#e0e0e0",
    transform: "scale(1.1)",
  },
  disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
};

export const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  songs,
  handleNext,
  handlePrevious,
  shuffle,
  setShuffle,
  repeat,
  setRepeat,
}) => {
  const togglePlayPause = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const toggleRepeat = () => {
    setRepeat((prev) => (prev + 1) % 3);
  };

  return (
    <div style={playerStyles.container}>
      <ShowSong currentSong={currentSong} />
      <div style={playerStyles.controls}>
        <button
          onClick={toggleShuffle}
          disabled={songs.length === 0}
          style={{
            ...playerStyles.controlButton,
            ...playerStyles.subControl,
            ...(shuffle ? playerStyles.subControlActive : {}),
            ...(songs.length === 0 ? playerStyles.disabled : {}),
          }}
          onMouseOver={(e) => {
            if (songs.length > 0)
              e.currentTarget.style.color = playerStyles.subControlHover.color;
          }}
          onMouseOut={(e) => {
            if (songs.length > 0 && !shuffle)
              e.currentTarget.style.color = playerStyles.subControl.color;
            if (songs.length > 0 && shuffle)
              e.currentTarget.style.color = playerStyles.subControlActive.color;
          }}
        >
          <Shuffle size={24} />
        </button>
        <div style={playerStyles.mainControls}>
          <button
            onClick={handlePrevious}
            disabled={!currentSong}
            style={{
              ...playerStyles.controlButton,
              ...(!currentSong ? playerStyles.disabled : {}),
            }}
            onMouseOver={(e) => {
              if (currentSong)
                e.currentTarget.style.color =
                  playerStyles.controlButtonHover.color;
            }}
            onMouseOut={(e) => {
              if (currentSong)
                e.currentTarget.style.color = playerStyles.controlButton.color;
            }}
          >
            <Rewind size={32} />
          </button>
          <button
            onClick={togglePlayPause}
            disabled={!currentSong}
            style={{
              ...playerStyles.playPauseButton,
              ...(!currentSong ? playerStyles.disabled : {}),
            }}
            onMouseOver={(e) => {
              if (currentSong)
                e.currentTarget.style.transform =
                  playerStyles.playPauseButtonHover.transform;
              e.currentTarget.style.boxShadow =
                playerStyles.playPauseButtonHover.boxShadow;
            }}
            onMouseOut={(e) => {
              if (currentSong) e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                playerStyles.playPauseButton.boxShadow;
            }}
          >
            {isPlaying ? (
              <Pause size={36} fill="white" />
            ) : (
              <Play size={36} fill="white" />
            )}
          </button>
          <button
            onClick={handleNext}
            disabled={!currentSong}
            style={{
              ...playerStyles.controlButton,
              ...(!currentSong ? playerStyles.disabled : {}),
            }}
            onMouseOver={(e) => {
              if (currentSong)
                e.currentTarget.style.color =
                  playerStyles.controlButtonHover.color;
            }}
            onMouseOut={(e) => {
              if (currentSong)
                e.currentTarget.style.color = playerStyles.controlButton.color;
            }}
          >
            <FastForward size={32} />
          </button>
        </div>
        <button
          onClick={toggleRepeat}
          disabled={songs.length === 0}
          style={{
            ...playerStyles.controlButton,
            ...playerStyles.subControl,
            ...(repeat > 0 ? playerStyles.subControlActive : {}),
            ...(songs.length === 0 ? playerStyles.disabled : {}),
          }}
          onMouseOver={(e) => {
            if (songs.length > 0)
              e.currentTarget.style.color = playerStyles.subControlHover.color;
          }}
          onMouseOut={(e) => {
            if (songs.length > 0 && repeat === 0)
              e.currentTarget.style.color = playerStyles.subControl.color;
            if (songs.length > 0 && repeat > 0)
              e.currentTarget.style.color = playerStyles.subControlActive.color;
          }}
        >
          <Repeat size={24} />
          {repeat === 1 && (
            <span
              style={{
                fontSize: "0.8rem",
                position: "absolute",
                transform: "translate(10px, -10px)",
                fontWeight: "bold",
              }}
            >
              1
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
