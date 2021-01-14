import { createContext, useState, useEffect } from 'react';
import GameSession from '../game/GameSession';
import { initGame } from '../game/index';

interface GameSessionContextData {
	playerData: PlayerData,
	gameState: GameState,
	setGameMode: (mode: GameMode) => void;
}

interface GameState {
	mode: GameMode;
}

interface PlayerData {
	brick: number;
	ore: number;
	sheep: number;
	wheat: number;
	wood: number;
	cities: number;
	devCards: number;
	roads: number;
	settlements: number;
	ships: number;
}

/**
 * Context for interfacing with the game session logic.
 */
export const GameSessionContext = createContext<GameSessionContextData | null>(null);
export const GameSessionContextProvider: React.FC = ({ children }) => {
	const [ gameSession, setGameSession ] = useState<GameSession | null>(null);
	const [ gameState, setGameState ] = useState<GameState>({mode: 'standby'});
	const [ playerData, setPlayerData ] = useState<PlayerData>({
		brick: 0,
		ore: 0,
		sheep: 0,
		wheat: 0,
		wood: 0,
		cities: 0,
		devCards: 0,
		roads: 0,
		settlements: 0,
		ships: 0
	});

	/**
     * Initialize the game session.
     */
	function initGameSession() {
		if (gameSession === null) {
			// TODO: instead of changing the game session, just call gameSession.init()
			const stateSetters = { setGameState, setPlayerData };
			setGameSession(initGame(stateSetters));
		}
	}

	// Run initGameSession after children components render.
	useEffect(initGameSession, [ gameSession, playerData ]);

	const setGameMode = (mode: GameMode) => gameSession && gameSession.setMode(mode);

	return (
		<GameSessionContext.Provider value={{ playerData, gameState, setGameMode }}>
			{children}
		</GameSessionContext.Provider>
	);
}
