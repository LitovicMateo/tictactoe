import Tic from "/TIC.png";
import Tac from "/TAC.png";
import Toe from "/TOE.png";
import TitleWord from "./title-word";

const GameTitle = () => {
	return (
		<div className="flex gap-6 justify-center md:gap-8 md:justify-between w-[60%]">
			<TitleWord image={"/TIC.png"} delay={2} />
			<TitleWord image={Tac} delay={3} />
			<TitleWord image={Toe} delay={4} />
		</div>
	);
};

export default GameTitle;
