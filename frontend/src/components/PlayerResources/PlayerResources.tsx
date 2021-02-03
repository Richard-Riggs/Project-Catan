// import { useContext } from 'react';
import './PlayerResources.css';
import ResourceItem from '../ResourceItem';
// import { GameSessionContext } from '../../contexts/GameSessionContext';
import { useSelector } from 'react-redux';
import { GameState } from '../../types/game';

interface ReduxState {
    game: GameState
}

// TODO: selectors file?
const selectPlayerData = (state: ReduxState) => state.game.player;
const selectGameState = (state: ReduxState) => {
    return { mode: state.game.mode, lastRolled: state.game.lastRolled }
}

export default function PlayerResources() {
    // const gameContext = useContext(GameSessionContext);
    const playerData = useSelector(selectPlayerData);
    const gameState = useSelector(selectGameState);
    // if (!gameContext) return <div className="PlayerResources" />;
    // const { gameState, playerData } = gameContext;
    return (
        <div className="PlayerResources">
            <h1 className="PlayerResources__header">Player Resources ({gameState.mode})({gameState.lastRolled})</h1>
            <div className="PlayerResources__info-pane">
                <div className="PlayerResources__column">
                    <ResourceItem name="Wood" count={ playerData.wood } />
                    <ResourceItem name="Ore" count={playerData.ore} />
                    <ResourceItem name="Brick" count={playerData.brick} />
                    <ResourceItem name="Wheat" count={playerData.wheat} />
                    <ResourceItem name="Sheep" count={playerData.sheep} />
                </div>
                <div className="PlayerResources__column">
                    <ResourceItem name="Settlements" count={playerData.settlements} />
                    <ResourceItem name="Cities" count={playerData.cities} />
                    <ResourceItem name="Roads" count={playerData.roads} />
                    <ResourceItem name="Ships" count={playerData.ships} />
                    <ResourceItem name="Dev Cards" count={playerData.devCards} />
                </div>
                <div className="PlayerResources__column">
                    <ResourceItem name="Redux-wood" count={0} />
                </div>
            </div>
        </div>
    )
}
