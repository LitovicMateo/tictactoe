import React from "react";
import { motion } from "framer-motion";

type Props = {
	mode: "play" | "restart";
	callback: () => void;
};

const Button: React.FC<Props> = ({ callback, mode }) => {
	const handleClick = () => {
		callback();
	};

		return (
			<motion.button
				onClick={handleClick}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.8 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { duration: 2, delay: mode === "play" ? 5 : mode === "restart" ? 1 : 5 } }}
				exit={{
					y: -1000,
					opacity: 0.1,
					transition: {
						duration: 1.5,
					},
				}}
				className=" text-[#CF9500] font-irish uppercase text-2xl border-[#CF9500] border-2 px-4 py-2 rounded-3xl"
			>
				{mode === "play" ? "Start New Game" : mode === "restart" ? "Play again" : "Error"}
			</motion.button>
		);
};

export default Button;
