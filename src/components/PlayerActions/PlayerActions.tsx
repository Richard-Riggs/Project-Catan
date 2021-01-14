import { useContext } from 'react';
import './PlayerActions.css';
import GameButton from '../GameButton';
import { GameSessionContext } from '../../contexts/GameSessionContext';

export default function PlayerActions() {
    const gameContext = useContext(GameSessionContext);
    if (!gameContext) return <div className="PlayerActions" />
    const { setGameMode } = gameContext;
    return (
        <div className="PlayerActions">
            <h1>Player Actions</h1>
            {gameContext && 
                <div className="PlayerActions__buttons">
                    <GameButton name="Buy Road" onClick={() => {}} />
                    <GameButton name="Buy Settlement" onClick={() => setGameMode('add_settlement')} />
                    <GameButton name="Upgrade Settlement" onClick={() => {}} />
                    <GameButton name="Trade" onClick={() => {}} />
                    <GameButton name="Buy Development Card" onClick={() => {}} />
                    <GameButton name="Roll Dice" onClick={() => {}} />
                </div>
            }
        </div>
    )
}
