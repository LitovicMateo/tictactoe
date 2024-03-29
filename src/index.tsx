import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PlayerContextProvider } from "./context/game-context";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<PlayerContextProvider>
			<App />
		</PlayerContextProvider>
	</React.StrictMode>
);

