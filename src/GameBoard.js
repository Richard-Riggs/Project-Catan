import TileGrid from './TileGrid';
import VertexMap from './VertexMap';


// Includes a tile grid and vertex map
export default class GameBoard {
    constructor(settings, tileDataGenerator) {
        this.tileGrid = new TileGrid(settings);
        this.vertexMap = new VertexMap(this.tileGrid);
        const tileData = tileDataGenerator(this.tileGrid.tiles);
        this.tileGrid.populateBoard(tileData);
    }
}
