import React, { createContext, useState, useEffect } from 'react';
import { initGame } from '../classes/index';

/**
 * Context for interfacing with the game session logic.
 */
export const GameSessionContext = createContext();
export function GameSessionContextProvider({ children }) {
    const [ gameSession, setGameSession ] = useState(null);
    const [ gameState, setGameState ] = useState({});
    const [ playerData, setPlayerData ] = useState({});

    /**
     * Initialize the game session.
     */
    function initGameSession() {
        if (gameSession === null) {
            setGameSession(initGame(playerData, setPlayerData));
        }
    }

    // Run initGameSession after children components render.
    useEffect(initGameSession, [gameSession, playerData]);

    return (
        <GameSessionContext.Provider value={{ playerData }}>
            { children }
        </GameSessionContext.Provider>
    );
}
