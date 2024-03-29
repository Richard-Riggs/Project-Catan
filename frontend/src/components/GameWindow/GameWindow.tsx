import Game from '../Game';
import GameLobby from '../GameLobby';
// import { GameSessionContextProvider } from '../../contexts/GameSessionContext';
import { useState } from 'react';

type GameStage = "lobby" | "game";

export default function GameWindow() {
    const [ stage ] = useState<GameStage>('game');
    return (
        <div className="GameWindow">
            {stage === 'lobby' && (
                <GameLobby />
            )}
            {stage === 'game' && (
                <Game />
            )}
        </div>
    )
}
