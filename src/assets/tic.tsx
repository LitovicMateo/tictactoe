import React from "react";
import { motion } from "framer-motion";

const Tic = () => {
	return (
		<svg
			width="100"
			height="200"
			viewBox="0 0 99 49"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<motion.line
				initial={{ scale: 0, opacity: 0 }}
				animate={{
					scale: 1,
					opacity: 1,
					transition: { duration: 2, delay: 5 },
				}}
				x1="41.5"
				y1="3"
				x2="41.5"
				y2="163"
				stroke="black"
				stroke-width="3"
			/>
			<motion.line
				initial={{ pathLength: 0, opacity: 0 }}
				animate={{
					pathLength: 1,
					opacity: 1,
					transition: { duration: 2, delay: 5 },
				}}
				y1="1.5"
				x2="80"
				y2="1.5"
				stroke="black"
				stroke-width="3"
			/>
		</svg>
	);
};

export default Tic;
