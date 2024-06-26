import React, { useState, useContext, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { PlayerContext } from "../context/game-context";

type Props = {
    gridId: number;
};

const PlayingGridField: React.FC<Props> = ({ gridId }) => {
    // Initialize variables
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    const [image, setImage] = useState<"./crash-bandicoot.png" | "./neo-cortex.png">("./crash-bandicoot.png");
    const [winnerGrid, setWinnerGrid] = useState(false);
    const playerCtx = useContext(PlayerContext);
    console.log(playerCtx.player);

    const handleClick = useCallback(
        (gridId: number) => {
            if (isFlipped) {
                return;
            }

            if (playerCtx.winner.length === 3) {
                return;
            }

            if (playerCtx.player === "Crash") {
                setImage("./crash-bandicoot.png");
                setIsFlipped(true);
                playerCtx.playerMoveHandler(gridId);
                return;
            } else if (playerCtx.player === "Neo") {
                setImage("./neo-cortex.png");
                setIsFlipped(true);
                playerCtx.compMoveHandler(gridId);
                return;
            }
        },
        [isFlipped, playerCtx]
    );

    useEffect(() => {
        if (playerCtx.player === "Neo" && gridId === playerCtx.aiMove) {
            console.log("AI on the move..");
            handleClick(gridId);
        }
    }, [gridId, playerCtx.player, playerCtx.aiMove, handleClick]);

    useEffect(() => {
        if (playerCtx.winner && playerCtx.winner && playerCtx.winner.includes(gridId)) {
            setWinnerGrid(true);
        }
    }, [playerCtx.winner, gridId]);

    // Game reset logic
    useEffect(() => {
        if (!playerCtx.gameState) {
            setIsFlipped(false);
            setWinnerGrid(false);
        }
    }, [playerCtx.gameState]);

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
            className="h-[90%] w-[90%] bg-[#CF9500] rounded-md my-auto mx-auto select-none"
            initial="initial"
            animate={!isFlipped ? "initail" : winnerGrid ? "winner" : "flipped"}
            variants={variants}
        >
            {isFlipped && <img src={image} alt="" />}
        </motion.div>
    );
};

export default PlayingGridField;
