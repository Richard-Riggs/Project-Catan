import TileGrid from './TileGrid';
import VertexMap from './VertexMap';
import Player from './Player';
import GameEventHandler from './GameEventHandler';
import { generateTileData } from './tileData';

// Includes a tile grid and vertex map
export default class GameSession {
    stateSetters: StateSetters;
    player: Player;
    mode: string;
    eventHandler: GameEventHandler;
    tileGrid: TileGrid;
    vertexMap: VertexMap;

    // TODO: interface for settings and stateSetters
    constructor(settings: GameSettings, stateSetters: StateSetters) {
        this.stateSetters = stateSetters;
        this.player = new Player('testUser');
        this.eventHandler = new GameEventHandler(this);
        this.tileGrid = new TileGrid(settings);
        this.vertexMap = new VertexMap(this.tileGrid, this.eventHandler);
        const tileData = generateTileData(this.tileGrid.tiles);
        this.tileGrid.populateBoard(tileData);
        this.mode = 'standby';
        this.updateGameSessionState();
    }

    setMode(mode: string) {
        this.mode = mode;
        this.updateGameSessionState();
    }

    updateStateWithMode(mode: string) {
        this.setMode(mode);
        this.updatePlayerDataState();
    }

    updatePlayerDataState() {
        // Call getDataState method on Player.js
        const playerData = this.player.getAllData();
        debugger;
        this.stateSetters.setPlayerData(playerData);
    }

    updateGameSessionState() {
        const gameState = {
            mode: this.mode
        };
        this.stateSetters.setGameState(gameState);
    }

    // vertexClick() {
    // }
}
