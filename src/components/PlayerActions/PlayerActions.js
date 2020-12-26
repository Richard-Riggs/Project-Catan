import React, { useContext } from 'react';
import './PlayerActions.css';
import GameButton from '../GameButton';
import { GameSessionContext } from '../../contexts/GameSessionContext';

export default function PlayerActions() {
    const { setGameMode } = useContext(GameSessionContext);
    return (
        <div className="PlayerActions">
            <h1>Player Actions</h1>
            <div className="PlayerActions__buttons">
                <GameButton name="Buy Road" />
                <GameButton name="Buy Settlement" onClick={() => setGameMode('add_settlement')} />
                <GameButton name="Upgrade Settlement" />
                <GameButton name="Trade" />
                <GameButton name="Buy Development Card" />
                <GameButton name="Roll Dice" />
            </div>
        </div>
    )
}
