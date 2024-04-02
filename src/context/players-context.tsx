import { createContext, useState } from "react";

type Player = {
  character: string;
  score: number;
};

type PlayerContextType = {
  playerOne: Player;
  playerTwo: Player;
  addScore: (player: "one" | "two") => void;
};

export const PlayerContext = createContext<PlayerContextType>({
  playerOne: {
    character: "crash-bandicoot",
    score: 0,
  },
  playerTwo: {
    character: "neo-cortex",
    score: 0,
  },
  addScore: () => {},
});

export const PlayerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [playerOne, setPlayerOne] = useState<Player>({
    character: "crash-bandicoot",
    score: 0,
  });
  const [playerTwo, setPlayerTwo] = useState<Player>({
    character: "neo-cortex",
    score: 0,
  });

  console.log(playerOne);

  const addScore = (player: "one" | "two") => {
    if (player === "one") {
      const obj = {...playerOne};
      obj.score++;
      setPlayerOne(obj)
    } else if (player === "two") {
        const obj = {...playerTwo};
        obj.score++;
        setPlayerTwo(obj)
      }
  };

  return (
    <PlayerContext.Provider
      value={{
        playerOne,
        playerTwo,
        addScore,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
