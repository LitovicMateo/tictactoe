import React, { useState, useContext, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { GameContext } from "../context/game-context";

type Props = {
    gridId: number;
};

const PlayingGridField: React.FC<Props> = ({ gridId }) => {
    // Initialize variables
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [image, setImage] = useState<"./characters/crash-bandicoot.png" | "./characters/neo-cortex.png">("./characters/neo-cortex.png");
    const [winnerGrid, setWinnerGrid] = useState(false);
    const gameCtx = useContext(GameContext);

    const handleClick = useCallback(
        (gridId: number) => {
            if (isFlipped) {
                return;
            }

            if (gameCtx.winner.length === 3) {
                return;
            }

            if (gameCtx.player === "Crash") {
                setImage("./characters/crash-bandicoot.png");
                setIsFlipped(true);
                gameCtx.playerMoveHandler(gridId);
                return;
            } else if (gameCtx.player === "Neo") {
                setImage("./characters/neo-cortex.png");
                setIsFlipped(true);
                gameCtx.compMoveHandler(gridId);
                return;
            }
        },
        [isFlipped, gameCtx]
    );

    useEffect(() => {
        if (gameCtx.player === "Neo" && gridId === gameCtx.aiMove) {
            handleClick(gridId);
        }
    }, [gridId, gameCtx.player, gameCtx.aiMove, handleClick]);

    useEffect(() => {
        if (gameCtx.winner && gameCtx.winner.includes(gridId)) {
            setWinnerGrid(true);
        }
    }, [gameCtx.winner, gridId]);

    // Game reset logic
    useEffect(() => {
        if (!gameCtx.gameState) {
            setIsFlipped(false);
            setWinnerGrid(false);
        }
    }, [gameCtx.gameState]);

    const variants = {
        initial: {
            background: "#CF9500",
        },
        flipped: {
            rotateY: isFlipped ? 360 : 180,
        },
        winner: {
            background: "#00cf00",
            rotateY: 2160 * 4,
            scale: [1, 0.8, 1],
            transition: {
                duration: 1.4,
            },
        },
    };

    return (
        <motion.div
            onClick={handleClick.bind(null, gridId)}
            className="h-[90%] w-[90%] flex justify-center items-center bg-[#CF9500] rounded-md my-auto mx-auto select-none"
            initial="initial"
            animate={!isFlipped ? "initail" : winnerGrid ? "winner" : "flipped"}
            variants={variants}
        >
            {isFlipped && <img src={image} className="w-[80%] aspect-square" />}
        </motion.div>
    );
};

export default PlayingGridField;
