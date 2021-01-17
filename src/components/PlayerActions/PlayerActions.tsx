import { useContext } from 'react';
import './PlayerActions.css';
import GameButton from '../GameButton';
import { GameSessionContext } from '../../contexts/GameSessionContext';

export default function PlayerActions() {
    const gameContext = useContext(GameSessionContext);
    if (!gameContext) return <div className="PlayerActions" />
    const { setGameMode, playerData, triggerEvent } = gameContext;
    return (
        <div className="PlayerActions">
            <h1>Player Actions</h1>
            <div className="PlayerActions__buttons">
                <GameButton name="Buy Road" enabled={playerData.canBuyRoad} onClick={() => setGameMode('add_road')} />
                <GameButton name="Buy Settlement" enabled={playerData.canBuySettlement} onClick={() => setGameMode('add_settlement')} />
                <GameButton name="Upgrade Settlement" enabled={true} onClick={() => {}} />
                <GameButton name="Trade" enabled={true} onClick={() => {}} />
                <GameButton name="Buy Development Card" enabled={true} onClick={() => {}} />
                <GameButton name="Roll Dice" enabled={true} onClick={() => triggerEvent('roll_dice')} />
            </div>
        </div>
    )
}
