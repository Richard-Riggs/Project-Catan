import TileGrid from './TileGrid';
import VertexMap from './VertexMap';
import Player from './Player';
import GameEventHandler from './GameEventHandler';
import { generateTileData } from './tileData';

// Includes a tile grid and vertex map
export default class GameSession {
    private _stateSetters: StateSetters;
    private _mode: GameMode;
    player: Player;
    eventHandler: GameEventHandler;
    tileGrid: TileGrid;
    vertexMap: VertexMap;

    // TODO: interface for settings and stateSetters
    constructor(settings: GameSettings, stateSetters: StateSetters) {
        this._stateSetters = stateSetters;
        this.player = new Player('testUser');
        this.eventHandler = new GameEventHandler(this);
        this.tileGrid = new TileGrid(settings);
        this.vertexMap = new VertexMap(this.tileGrid, this.eventHandler);
        const tileData = generateTileData(this.tileGrid.tiles);
        this.tileGrid.populateBoard(tileData);
        this._mode = 'standby';
        this.updateContextStates();
    }

    get mode(): GameMode {
        return this._mode
    };

    set mode(mode: GameMode) {
        this.setMode(mode);
    }

    setMode(mode: GameMode): void {
        this._mode = mode;
        this.updateContextStates();
    }

    /**
     * Updates all GameSessionContext states using state setters.
     * 
     * @returns void
     */
    updateContextStates(): void {
        this.updateGameSessionState();
        this.updatePlayerDataState();
    }

    updatePlayerDataState() {
        // Call getDataState method on Player.js
        const playerData: PlayerData = this.player.getAllData();
        this._stateSetters.setPlayerData(playerData);
    }

    updateGameSessionState() {
        const gameState: GameState = {
            mode: this.mode
        };
        this._stateSetters.setGameState(gameState);
    }

}
