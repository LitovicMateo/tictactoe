import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";
import PlayingGrid from "./playing-grid";
import Scoreboard from "./ui/scoreboard";
import { GameContext } from "../context/game-context";
import Button from "./button";

type GameScreenProps = {
  gameIsStarted: boolean;
};

const initialOptions = { y: 1000, opacity: 0 };

const animateOptions = {
  y: 0,
  opacity: 1,
  transition: {
    duration: 1,
    delay: 0.6,
  },
};

const exitOptions = {
  y: -1000,
  opacity: 0.1,
  transition: {
    duration: 1.5,
  },
};

const transitionOptions = {
  duration: 3,
  ease: "circInOut",
  delay: 0,
  type: "spring",
};


const GameScreen: React.FC<GameScreenProps> = ({ gameIsStarted }) => {

  const gameCtx = useContext(GameContext);

  const resetGame = () => {
    gameCtx.resetGame();
  };

  return (
    <AnimatePresence>
      {gameIsStarted && (
        <>
          <Scoreboard />
          <motion.div
            initial={initialOptions}
            animate={animateOptions}
            exit={exitOptions}
            transition={transitionOptions}
            className=" relative bg-white rounded-lg max-w-[600px] aspect-square w-[90%] mx-auto"
          >
            <PlayingGrid />
            <div>
              {gameCtx.message && (
                <div className="absolute top-[100%] left-[50%] translate-x-[-50%] w-[100%] flex flex-col gap-2 justify-center items-center mt-4">
                  <p className="font-irish uppercase text-2xl text-[#CF9500]">{gameCtx.message}</p>
                  <Button mode="restart" callback={resetGame} />
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GameScreen;
