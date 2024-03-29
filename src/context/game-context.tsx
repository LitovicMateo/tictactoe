import { createContext, useEffect, useState } from "react";
import { ActivePlayer } from "../App";
import { aiMove } from "../lib/ai-move";

type PlayerContextType = {
	player: ActivePlayer;
	round: number;
	winner: number[];
	message: string;
	gameState: boolean;
	aiMove: number | null;
	playerMoveHandler: (id: number) => void;
	compMoveHandler: (id: number) => void;
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
	aiMove: null,
	playerMoveHandler: () => {},
	compMoveHandler: () => {},
	resetGame: () => {},
});

const initialArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const PlayerContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [gameState, setGameState] = useState(true);
	const [fields, setFields] = useState<number[]>(initialArr);
	const [player, setPlayer] = useState<ActivePlayer>("Crash");
	const [round, setRound] = useState<number>(0);
	const [aiChioce, setAiChoice] = useState<number | null>(null);
	const [winner, setWinner] = useState<number[]>([]);
	const [message, setMessage] = useState<string>("");
	const [crashFields, setCrashFields] = useState<number[]>([]);
	const [neoFields, setNeoFields] = useState<number[]>([]);

	console.log(crashFields, neoFields);
	
	const playerMoveHandler = (id: number) => {
		
		if (!gameState) {
			setGameState(true);
		}
		
		setRound((prev) => prev + 1);
		setPlayer("Neo");

		setCrashFields((prev) => {
			const newArr = [...prev, id];
			const result = checkWin(newArr, player)
			if (result) {
				setWinner(result);
				
			}
	
			return [...prev, id]

		});
		setFields((prev) => {
			const newArr = prev.filter((el) => el !== id);
			if (newArr.length === 0) {
				setMessage("The game is tied!")
			}

			setAiChoice(aiMove(newArr))
			return newArr;
		});

	};

	const compMoveHandler = (ai: number) => {

		if (!gameState) {
			setGameState(true);
		}

		setRound((prev) => prev + 1);
		setPlayer("Crash");

		setNeoFields((prev) => {
			const newArr = [...prev, ai];
			const result = checkWin(newArr, player)
			if (result) {
				setWinner(result);
				
			}
	
			return [...prev, ai]
		});
		setFields((prev) => {
			const newArr = prev.filter((el) => el !== ai);
			if (newArr.length === 0) {
				setMessage("The game is tied!")
			}
			return newArr;
		});
		setPlayer("Crash");
		setAiChoice(null);
		return;
	};

	const resetGameHandler = () => {
		setPlayer("Crash");
		setRound(0);
		setMessage("");
		setCrashFields([]);
		setNeoFields([]);
		setGameState(false);
		setWinner([]);
		setAiChoice(null);
		setFields(initialArr);
	};

	const checkWin = (array: number[], player: ActivePlayer) => {
		for (const arr of winConditions) {
			// Check if either player has all elements from
			// one of the winnable arrays
			const contains = arr.every((el) => array.includes(el));

			// If there is a winner, set the message
			// and return the winning array
			if (contains && player === "Crash" ) {
				setMessage("Crash Bandicoot wins!");
				return arr;
			} else if (contains && player === "Neo") {
				setMessage("Neo Cortex wins!");
				return arr;
			}
		}

	}

	useEffect(() => {

		if (fields.length === 0 && !winner) {
			setMessage("The game is tied!");
		}
	}, [winner, fields]);

	return (
		<PlayerContext.Provider
			value={{
				player,
				round,
				message,
				winner,
				gameState,
				aiMove: aiChioce,
				resetGame: resetGameHandler,
				playerMoveHandler,
				compMoveHandler,
			}}
		>
			{children}
		</PlayerContext.Provider>
	);
};
