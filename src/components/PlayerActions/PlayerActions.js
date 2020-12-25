import React from 'react';
import './PlayerActions.css';
import GameButton from '../GameButton';

export default function PlayerActions() {
    return (
        <div className="PlayerActions">
            <h1>Player Actions</h1>
            <div className="PlayerActions__buttons">
                <GameButton name="Buy Road" />
                <GameButton name="Buy Settlement" />
                <GameButton name="Upgrade Settlement" />
                <GameButton name="Trade" />
                <GameButton name="Buy Development Card" />
                <GameButton name="Roll Dice" />
            </div>
        </div>
    )
}
