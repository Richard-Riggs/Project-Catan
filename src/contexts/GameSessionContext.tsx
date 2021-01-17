import { createContext, useState, useEffect } from 'react';
import GameSession from '../game/GameSession';
import { initGame } from '../game/index';


/**
 * Context for interfacing with the game session logic.
 */
export const GameSessionContext = createContext<GameSessionContextData | null>(null);
export const GameSessionContextProvider: React.FC = ({ children }) => {
	const [ gameSession, setGameSession ] = useState<GameSession | null>(null);
	const [ gameState, setGameState ] = useState<GameState>({mode: 'standby'});
	const [ playerData, setPlayerData ] = useState<PlayerData>({
		name: '',
		brick: 0,
		ore: 0,
		sheep: 0,
		wheat: 0,
		wood: 0,
		cities: 0,
		devCards: 0,
		roads: 0,
		settlements: 0,
		ships: 0,
        canBuySettlement: false,
        canBuyRoad: false
	});

	/**
     * Initialize the game session.
     * @returns {void}
     */
	function initGameSession(): void {
		if (gameSession === null) {
			// TODO: instead of changing the game session, just call gameSession.init()
			const stateSetters = { setGameState, setPlayerData };
			setGameSession(initGame(stateSetters));
		}
	}

	useEffect(initGameSession, [ gameSession, playerData ]);

	/**
	 * Update the mode in the GameSession, which updates the context's gameState.
	 * 
	 * @param {GameMode} mode New mode to set.
	 * @returns {void}
	 */
	function setGameMode(mode: GameMode): void {
		if (gameSession) gameSession.setMode(mode);
	}

	return (
		<GameSessionContext.Provider value={{ playerData, gameState, setGameMode }}>
			{children}
		</GameSessionContext.Provider>
	);
}
