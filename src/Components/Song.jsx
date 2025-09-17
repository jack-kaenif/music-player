import React from "react";
import { Music, Trash2 } from "lucide-react";

const songStyles = {
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.8rem 1.2rem",
    borderRadius: "12px",
    cursor: "pointer",
    marginBottom: "0.6rem",
    transition: "background-color 0.3s, transform 0.1s ease",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  listItemHover: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    transform: "scale(1.02)",
  },
  activeItem: {
    backgroundColor: "rgba(120, 0, 190, 0.3)", // Color de acento con opacidad
    borderLeft: "4px solid #9C27B0", // Borde vibrante
  },
  songInfo: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    flex: "1",
    overflow: "hidden",
  },
  thumbnail: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
    objectFit: "cover",
  },
  songIcon: {
    color: "#9C27B0", // Color de acento para el icono
  },
  songDetails: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  songName: {
    fontWeight: "500",
    fontSize: "1.1rem",
    color: "#e0e0e0",
  },
  songArtist: {
    fontSize: "0.9rem",
    color: "#b0b0b0",
  },
  removeButton: {
    background: "none",
    border: "none",
    color: "#e0e0e0",
    cursor: "pointer",
    opacity: "0.6",
    transition: "opacity 0.3s, transform 0.2s",
  },
  removeButtonHover: {
    opacity: "1",
    color: "#FF4500", // Rojo naranja para la acción de eliminar
    transform: "scale(1.1)",
  },
};

export const Song = ({ song, index, currentSongIndex, onSelect, onRemove }) => {
  return (
    <li
      onClick={() => onSelect(index)}
      style={{
        ...songStyles.listItem,
        ...(index === currentSongIndex ? songStyles.activeItem : {}),
      }}
      onMouseOver={(e) => {
        if (index !== currentSongIndex)
          e.currentTarget.style.backgroundColor =
            songStyles.listItemHover.backgroundColor;
      }}
      onMouseOut={(e) => {
        if (index !== currentSongIndex)
          e.currentTarget.style.backgroundColor =
            songStyles.listItem.backgroundColor;
      }}
    >
      <div style={songStyles.songInfo}>
        <div style={songStyles.thumbnail}>
          {song.cover ? (
            <img
              src={song.cover}
              alt="Cover"
              style={songStyles.thumbnailImage}
            />
          ) : (
            <Music size={20} style={songStyles.songIcon} />
          )}
        </div>
        <div style={songStyles.songDetails}>
          <div style={songStyles.songName}>{song.title}</div>
          <div style={songStyles.songArtist}>{song.artist}</div>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
        style={songStyles.removeButton}
        onMouseOver={(e) => {
          e.currentTarget.style.opacity = songStyles.removeButtonHover.opacity;
          e.currentTarget.style.color = songStyles.removeButtonHover.color;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.opacity = songStyles.removeButton.opacity;
          e.currentTarget.style.color = songStyles.removeButton.color;
        }}
      >
        <Trash2 size={16} />
      </button>
    </li>
  );
};

export default Song;
