import TileGrid from './TileGrid';
import VertexMap from './VertexMap';
import { generateTileData } from './tileData';

// Includes a tile grid and vertex map
export default class GameSession {
    constructor(settings) {
        this.tileGrid = new TileGrid(settings);
        this.vertexMap = new VertexMap(this.tileGrid);
        const tileData = generateTileData(this.tileGrid.tiles);
        this.tileGrid.populateBoard(tileData);
    }

    updatePlayerDataState() {
        // Call getDataState method on Player.js
    }

    updateGameSessionState() {
        // Call getGameState method on this
    }
}
