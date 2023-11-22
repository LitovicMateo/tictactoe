import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PlayingGridField from "./playing-grid-field";
import { PlayerContext } from "../context/game-context";
import Button from "./button";

type Props = {
	gameStarted: boolean;
};

const PlayingGrid: React.FC<Props> = ({ gameStarted }) => {
	const playerCtx = useContext(PlayerContext);

	const playingFields = [1, 2, 3, 4, 5, 6, 7, 8, 9]

	const resetGame = () => {
		playerCtx.resetGame()
	}

	return (
		<AnimatePresence>
			{gameStarted && (
				<motion.div
					initial={{ y: 1000, opacity: 0 }}
					animate={{
						y: 0,
						opacity: 1,
						transition: {
							duration: 1,
							delay: 0.6,
						},
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
					className=" relative bg-white rounded-lg max-w-[800px] aspect-square w-[90%] mx-auto"
				>
					<div className="h-full w-full grid grid-cols-3 grid-rows-3 gap-1">
						{playingFields.map((p) => <PlayingGridField key={p} gridId={p} />)}
					</div>
					<div>
						{playerCtx.message && (
							<div className="absolute top-[100%] left-[50%] translate-x-[-50%] w-[100%] flex flex-col gap-2 justify-center items-center mt-4">
								<p className="font-irish uppercase text-2xl text-[#CF9500]">
									{playerCtx.message}
								</p>
								<Button mode="restart" callback={resetGame} />
							</div>
						)}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default PlayingGrid;
