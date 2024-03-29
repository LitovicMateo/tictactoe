import TitleImage from "../assets/WELCOME TO.png";

import { AnimatePresence, motion } from "framer-motion";
import Button from "./button";
import GameTitle from "./game-title";

type Props = {
    startGame: () => void;
    gameIsStarted: boolean;
};

const Title: React.FC<Props> = ({ startGame, gameIsStarted }) => {
    return (
        <section className="flex flex-col gap-8 justify-center items-center">
            <AnimatePresence>
                {!gameIsStarted && (
                    <>
                        <motion.div className="w-[90%]">
                            <motion.img
                                key={1}
                                src={TitleImage}
                                initial={{ rotate: 0, scale: 0.05, y: 0 }}
                                animate={{
                                    rotate: [120, 240, 360, 540, 720, 1080],
                                    scale: [0.05, 0.15, 0.3, 0.5, 0.8, 1],
                                }}
                                exit={{
                                    y: -1000,
                                    opacity: 0.1,
                                    transition: {
                                        duration: 1.5,
                                    },
                                }}
                                transition={{
                                    duration: 3,
                                    ease: "circInOut",
                                    delay: 0,
                                    type: "spring",
                                }}
                            />
                        </motion.div>
                        <GameTitle />
                        <Button mode="play" callback={startGame} />
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Title;
