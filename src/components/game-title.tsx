import TitleWord from "./title-word";

const GameTitle = () => {
	return (
		<div className="flex gap-6 justify-center md:gap-8 md:justify-between w-[60%]">
			<TitleWord image={"./TIC.png"} delay={2} />
			<TitleWord image={"./TAC.png"} delay={3} />
			<TitleWord image={"./TOE.png"} delay={4} />
		</div>
	);
};

export default GameTitle;
