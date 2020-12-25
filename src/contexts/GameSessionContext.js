import React, { createContext, useState, useEffect } from 'react';
import { initBoard } from '../classes/index';

export const GameSessionContext = createContext();

export function GameSessionContextProvider({ children }) {
    const [ gameSession, setGameSession ] = useState(null);

    useEffect(() => {
        setGameSession(initBoard());
    }, []);

    return (
        <GameSessionContext.Provider>
            { children }
        </GameSessionContext.Provider>
    );
}
