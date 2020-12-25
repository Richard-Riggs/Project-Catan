import React from 'react';
import './PlayerResources.css';
import ResourceItem from '../ResourceItem';

export default function PlayerResources(props) {
    return (
        <div className="PlayerResources">
            <h1 className="PlayerResources__header">Player Resources</h1>
            <div className="PlayerResources__info-pane">
                <div className="PlayerResources__column">
                    <ResourceItem name="Wood" count={props.wood} />
                    <ResourceItem name="Ore" count={props.ore} />
                    <ResourceItem name="Brick" count={props.wood} />
                    <ResourceItem name="Wheat" count={props.wheat} />
                    <ResourceItem name="Sheep" count={props.sheep} />
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
