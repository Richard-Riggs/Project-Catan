import React from 'react';
import BoardCanvas from '../BoardCanvas';
import PlayerActions from '../PlayerActions';
import PlayerResources from '../PlayerResources';
import './Game.css';

export default function Game() {
    return (
        <div className="Game">
            <div className="Game__canvas-window">
                <BoardCanvas />
            </div>
            <div className="Game__player-info">
                <PlayerResources />
                <PlayerActions />
            </div>
        </div>
    )
}
