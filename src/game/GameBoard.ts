import GameEventHandler from './GameEventHandler';
import TileGrid from './TileGrid';
import VertexMap from './VertexMap';
import { generateTileData } from './tileData';
import GameSession from './GameSession';
import RoadPathSet from './RoadPathSet';
import { GameMode, GameSettings } from '../types/game';

export default class GameBoard {
    private _eventHandler: GameEventHandler;
    tileGrid: TileGrid;
    vertexMap: VertexMap;
    roadMap: RoadPathSet;

    constructor(gameSession: GameSession, settings: GameSettings ) {
        this._eventHandler = gameSession.eventHandler;
        this.tileGrid = new TileGrid(settings);
        const tileData = generateTileData(this.tileGrid.tiles);
        this.tileGrid.populateBoard(tileData);
        this.vertexMap = new VertexMap(this.tileGrid, this._eventHandler);
        this.roadMap = new RoadPathSet(this.vertexMap, this._eventHandler);
    }

    updateBoardMode(mode: GameMode) {
        switch(mode) {
            case 'add_settlement':
                this.vertexMap.enableVertexEvents();
                this.roadMap.disableRoadPathEvents();
                break;
            case 'add_road':
                this.roadMap.enableRoadPathEvents();
                this.vertexMap.disableVertexEvents();
                break;
            default:
                this.vertexMap.disableVertexEvents();
                this.roadMap.disableRoadPathEvents();
                break;
        }
    }

    static rollDice(): number {
        const roll1 = Math.floor(Math.random() * 6) + 1;
        const roll2 = Math.floor(Math.random() * 6) + 1;
        return roll1 + roll2;
    }

}