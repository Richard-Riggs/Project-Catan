import React, { useContext } from 'react';
import './PlayerResources.css';
import ResourceItem from '../ResourceItem';
import { GameSessionContext } from '../../contexts/GameSessionContext';

export default function PlayerResources(props) {
    const { playerData } = useContext(GameSessionContext);
    debugger;
    return (
        <div className="PlayerResources">
            <h1 className="PlayerResources__header">Player Resources</h1>
            <div className="PlayerResources__info-pane">
                <div className="PlayerResources__column">
                    <ResourceItem name="Wood" count={ playerData.wood } />
                    <ResourceItem name="Ore" count={playerData.ore} />
                    <ResourceItem name="Brick" count={playerData.brick} />
                    <ResourceItem name="Wheat" count={playerData.wheat} />
                    <ResourceItem name="Sheep" count={playerData.sheep} />
                </div>
                <div className="PlayerResources__column">
                    <ResourceItem name="Settlements" count={props.settlements} />
                    <ResourceItem name="Cities" count={props.cities} />
                    <ResourceItem name="Roads" count={props.roads} />
                    <ResourceItem name="Ships" count={props.ships} />
                    <ResourceItem name="Dev Cards" count={props.devCards} />
                </div>
            </div>
        </div>
    )
}
