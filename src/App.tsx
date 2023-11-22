import React, { useState } from "react";
import PlayingGrid from "./components/playing-grid";
import Title from "./components/title-screen";
import AudioToggle from "./components/audio-toggle";

export type ActivePlayer = "Crash" | "Neo"

const App: React.FC = () => {
	const [audioPlaying, setAudioPlaying] = useState(false);
	const [gameStatus, setGameStatus] = useState(false);

	const handleGameStatus = () => {
		console.log("Playing...");
		setGameStatus(true);
	};

	const handleAudio = (audio: React.RefObject<HTMLAudioElement>) => {
		if (audioPlaying) {
			audio.current!.muted = true;
			setAudioPlaying(false);
		} else {
			if (audio.current!.muted) {
				audio.current!.muted = false;
				setAudioPlaying(true);
			} else {
				audio.current!.play();
				setAudioPlaying(true);
			}
		}
	};

	return (
		<div className="bg-gray-950 h-screen w-screen relative items-center">
			<AudioToggle handleAudio={handleAudio} isPlaying={audioPlaying} />
			<div className="absolute w-full left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
				<Title gameIsStarted={gameStatus} startGame={handleGameStatus} />
			</div>
			<div className="absolute w-full left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
				<PlayingGrid  gameStarted={gameStatus} />
			</div>
		</div>
	);
};

export default App;
