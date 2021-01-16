import GameEventHandler from './GameEventHandler';
import TileGrid from './TileGrid';
import VertexMap from './VertexMap';
import { generateTileData } from './tileData';
import GameSession from './GameSession';
import RoadMap from './RoadMap';

export default class GameBoard {
    private _eventHandler: GameEventHandler;
    tileGrid: TileGrid;
    vertexMap: VertexMap;
    roadMap: RoadMap;

    constructor(settings: GameSettings, gameSession: GameSession) {
        this._eventHandler = new GameEventHandler(gameSession);
        this.tileGrid = new TileGrid(settings);
        const tileData = generateTileData(this.tileGrid.tiles);
        this.tileGrid.populateBoard(tileData);
        this.vertexMap = new VertexMap(this.tileGrid, this._eventHandler);
        this.roadMap = new RoadMap(this.vertexMap);
    }

    updateBoardMode(mode: GameMode) {
        switch(mode) {
            case 'add_settlement':
                this.vertexMap.enableVertexEvents();
                break;
            default:
                this.vertexMap.disableVertexEvents();
                break;
        }
    }
}