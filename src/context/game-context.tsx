import { createContext, useEffect, useState } from "react";
import { ActivePlayer } from "../App";

type PlayerContextType = {
	player: ActivePlayer;
	round: number;
	winner: number[];
	message: string;
	gameState: boolean;
	gameRoundHandler: (id: number) => void;
	resetGame: () => void;
};

const winConditions = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7],
];

export const PlayerContext = createContext<PlayerContextType>({
	player: "Crash",
	round: 0,
	winner: [],
	message: "",
	gameState: true,
	gameRoundHandler: () => {},
	resetGame: () => {},
});

export const PlayerContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [gameState, setGameState] = useState(true)
	const [player, setPlayer] = useState<ActivePlayer>("Crash");
	const [round, setRound] = useState<number>(0);
	const [winner, setWinner] = useState<number[]>([]);
	const [message, setMessage] = useState<string>("");
	const [crashFields, setCrashFields] = useState<number[]>([]);
	const [neoFields, setNeoFields] = useState<number[]>([]);

	// Update player arrays, update round, 
	const gameRoundHandler = (id: number) => {
		if (!gameState) { 
			setGameState(true)
		}
		// update round
		setRound((prev) => prev + 1);

		// update player's fields and change the player
		if (player === "Crash") {
			setCrashFields((prev) => [...prev, id]);
			setPlayer("Neo");
		} else if (player === "Neo") {
			setNeoFields((prev) => [...prev, id]);
			setPlayer("Crash");
		}
	};

	const resetGameHandler = () => {
		setPlayer("Crash");
		setRound(0);
		setMessage('');
		setCrashFields([]);
		setNeoFields([]);
		setGameState(false);
		setWinner([])
	}

	useEffect(() => {
		const check = () => {

			// Loop through the win codition arrays
			for (const arr of winConditions) {

				// Check if either player has all elements from
				// one of the winnable arrays
				const crashContains = arr.every((el) => crashFields.includes(el));
				const neoContains = arr.every((el) => neoFields.includes(el));

				// If there is a winner, set the message
				// and return the winning array
				if (crashContains) {
					setMessage("Crash Bandicoot wins!")
					return arr;
				} else if (neoContains) {
					setMessage("Neo Cortex wins!")
					return arr;
				}
			}
		};

		const result = check();

		// If result is not undefined that means
		// there is a winner
		if (result) {
			setWinner(result);
		}

		if (!result && round === 9) {
			setMessage("The game is tied!")
		}

	}, [crashFields, neoFields, round]);

	return (
		<PlayerContext.Provider value={{ player, round, message, winner, gameState, resetGame: resetGameHandler, gameRoundHandler }}>
			{children}
		</PlayerContext.Provider>
	);
};
