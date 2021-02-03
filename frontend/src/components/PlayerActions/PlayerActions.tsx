// import { useContext } from 'react';
import './PlayerActions.css';
import GameButton from '../GameButton';
// import { GameSessionContext } from '../../contexts/GameSessionContext';
import { useDispatch, useSelector } from 'react-redux';
import { incrementWood, setMode, rollDice } from '../../redux/gameSlice';
import { GameState } from '../../types/game';

interface ReduxState {
    game: GameState
}

const selectPlayerData = (state: ReduxState) => state.game.player;

export default function PlayerActions() {
    const dispatch = useDispatch();
    const playerData = useSelector(selectPlayerData);
    // const gameContext = useContext(GameSessionContext);
    // if (!gameContext) return <div className="PlayerActions" />
    // const { setGameMode, playerData, triggerEvent } = gameContext;
    return (
        <div className="PlayerActions">
            <h1>Player Actions</h1>
            <div className="PlayerActions__buttons">
                <GameButton name="Buy Road" enabled={playerData.canBuyRoad} onClick={() => dispatch(setMode('add_road'))} />
                <GameButton name="Buy Settlement" enabled={playerData.canBuySettlement} onClick={() => dispatch(setMode('add_settlement'))} />
                <GameButton name="Upgrade Settlement" enabled={true} onClick={() => dispatch(setMode('add_city'))} />
                <GameButton name="Trade" enabled={true} onClick={() => {}} />
                <GameButton name="Buy Development Card" enabled={true} onClick={() => {}} />
                <GameButton name="Roll Dice" enabled={true} onClick={() => dispatch(rollDice())} />
                <GameButton name="Increment Wood" enabled={true} onClick={() => dispatch(incrementWood())} />
            </div>
        </div>
    )
}
