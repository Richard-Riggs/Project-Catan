import GameEventHandler from './GameEventHandler';
import TileGrid from './TileGrid';
import VertexMap from './VertexMap';
import { generateTileData } from './tileData';
import RoadPathSet from './RoadPathSet';
import { GameMode, GameSettings } from '../types/game';

export default class GameBoard {
    private _eventHandler: GameEventHandler;
    tileGrid: TileGrid;
    vertexMap: VertexMap;
    roadPathSet: RoadPathSet;

    constructor(eventHandler: GameEventHandler, settings: GameSettings ) {
        this._eventHandler = eventHandler;
        this.tileGrid = new TileGrid(settings);
        const tileData = generateTileData(this.tileGrid.tiles);
        this.tileGrid.populateBoard(tileData);
        this.vertexMap = new VertexMap(this.tileGrid, this._eventHandler);
        this.roadPathSet = new RoadPathSet(this.vertexMap, this._eventHandler);
    }

    switchBoardMode(mode: GameMode) {
        switch(mode) {
            case 'add_settlement':
                this.vertexMap.enableVertexEvents();
                this.roadPathSet.disableRoadPathEvents();
                break;
            case 'add_road':
                this.roadPathSet.enableRoadPathEvents();
                this.vertexMap.disableVertexEvents();
                break;
            default:
                this.vertexMap.disableVertexEvents();
                this.roadPathSet.disableRoadPathEvents();
                break;
        }
    }

    static rollDice(): number {
        const roll1 = Math.floor(Math.random() * 6) + 1;
        const roll2 = Math.floor(Math.random() * 6) + 1;
        return roll1 + roll2;
    }

}