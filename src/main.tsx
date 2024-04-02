import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GameContextProvider } from "./context/game-context";
import { PlayerContextProvider } from "./context/players-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PlayerContextProvider>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </PlayerContextProvider>
  </React.StrictMode>
);
