import React, { useState } from "react";
import Title from "./components/title-screen";
import AudioControl from "./components/audio-toggle";
import GameScreen from "./components/game-screen";

export type ActivePlayer = "Crash" | "Neo";

const App: React.FC = () => {
  const [gameStatus, setGameStatus] = useState(false);

  const handleGameStatus = () => {
    console.log("Playing....");
    setGameStatus(true);
  };

  return (
    <div className="fixed bg-gray-950 h-screen w-screen items-center">
      <AudioControl />
      <div className="absolute w-full left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Title gameIsStarted={gameStatus} startGame={handleGameStatus} />
      </div>
      <div className="absolute w-full left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <GameScreen gameIsStarted={gameStatus} />
      </div>
    </div>
  );
};

export default App;
