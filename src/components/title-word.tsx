import React from 'react'
import { motion } from "framer-motion";

type Props = {
	image: string,
	delay: number
}


const TitleWord: React.FC<Props> = ({image, delay}) => {
	return (
		<motion.img
		className="w-[20%] aspect-auto md:w-[30%] md:h-auto"
		initial={{ opacity: 0, scale: 20 }}
		animate={{
			opacity: [0, 0.5, 0.8, 1],
			scale: [20, 10, 5, 1],
		}}
		exit={{
			y: -1000,
			opacity: 0.1,
			transition: {
				duration: 1.5,
			},
		}}
transition={{
			duration: 0.5,
			ease: "easeIn",
			delay: delay,
		}}
		src={image}
	/>
)
}

export default TitleWord