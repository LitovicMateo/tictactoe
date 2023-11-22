import React, { useState, useContext, useEffect } from "react";
import Crash from "../assets/crash-bandicoot.png";
import Neo from "../assets/neo-cortex.png";
import { motion } from "framer-motion";
import { PlayerContext } from "../context/game-context";

type Props = {
	gridId: number
}

const PlayingGridField: React.FC<Props> = ({gridId}) => {

	// Initialize variables
	const [isFlipped, setIsFlipped] = useState<boolean>(false);
	const [image, setImage] = useState<string>();
	const [winnerGrid, setWinnerGrid] = useState(false)

	// Fetch the player context
	const playerCtx = useContext(PlayerContext)	

	// Handle game logic on field click
	const handleClick = () => {
		// Return if the field had already been clicked
		console.log(isFlipped);
		if (isFlipped) {
			return
		}

		

		// Check if there is already a winning array
		// prevents click on unflipped fields if the
		// game is over
		if (playerCtx.winner.length === 3) {
			return;
		}
		console.log("Got here...")

		// If-statement to set the image in the field
		if (playerCtx.player === "Crash") {
			setImage(Crash)
		} else if (playerCtx.player === "Neo") {
			setImage(Neo)
		}

		// Send the gridId to the context for further
		// game logic operations
		playerCtx.gameRoundHandler(gridId)

		// Flip the field
		setIsFlipped(true);
	};

	useEffect(() => {
		if (!playerCtx.gameState) {
			setIsFlipped(false);
			setImage('');
			setWinnerGrid(false)
		}
	}, [playerCtx.gameState])

	// Set the field as the winner
	useEffect(() => {
		if (playerCtx.winner && playerCtx.winner && playerCtx.winner.includes(gridId)) {
			setWinnerGrid(true)
		}
	}, [playerCtx.winner, gridId])

	const variants = {
		initial: {
			background: "#CF9500"
		},
		flipped: {
			rotateY: isFlipped ? 360 : 180
		},
		winner: {
			background: "#00cf00",
			rotateY: 2160 * 4,
			scale: [1, 0.8, 1],
			transition: {
				duration: 1.4
			}
		}
	}

	return (
		<motion.div
			onClick={handleClick}
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
