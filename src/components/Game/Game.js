import React, { useState, useEffect } from 'react';
import BoardCanvas from '../BoardCanvas';
import PlayerActions from '../PlayerActions';
import PlayerResources from '../PlayerResources';
import { initBoard } from './classes/index';
import './Game.css';

export default function Game() {
    const [board, setBoard] = useState(null);

    // useEffect is called after the Game component finishes rendering
    useEffect(() => {
        setBoard(initBoard());
    }, []);
    
    return (
        <div className="Game">
            <div className="Game__canvas-window">
                <BoardCanvas></BoardCanvas>
            </div>
            <div className="Game__player-info">
                <PlayerResources></PlayerResources>
                <PlayerActions></PlayerActions>
            </div>
        </div>
    )
}
