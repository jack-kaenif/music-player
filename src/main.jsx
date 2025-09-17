import { MusicPlayer } from "./MusicPlayer.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MusicPlayer />
  </StrictMode>
);
