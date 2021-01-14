import * as paper from 'paper';
import Tile from './Tile';

type TileArray = Array<Array<Tile>>;

export default class TileGrid {
    tiles: TileArray;
    start: paper.Point;
    radius: number;
    colNum: number;
    minColHeight: number;
    /**
     * Creates a TileGrid instance containing a multidimensional array of tiles.
     * Settings can be passed in to customize the grid configuration.
     * 
     * @param {GameSettings} settings Object containing settings for the grid configuration.
     */
    constructor(settings: GameSettings) {
        this.start = settings.start || new paper.Point(100, 100);
        this.radius = settings.hexSize || 50;
        this.colNum = settings.colNum || 7;
        this.minColHeight = settings.minColHeight || 3;
        this.tiles = this.generateBoard();
    }

    /**
     * Generates a multidemsional array of tiles and saves to this.grid.
     */
    generateBoard(): TileArray {
        const tiles = [];
        var centerCol = Math.ceil(this.colNum / 2) - 1;
        var colHeight = this.minColHeight;
        for (var i = 0; i < this.colNum; i++) {
            var col = [];
            var distFromCenter = Math.abs(centerCol - i);
            var colDisplacement = (distFromCenter * (this.radius * (Math.sqrt(3) / 2)));
            for (var j = 0; j < colHeight; j++) {
                var displacementX = this.radius * (i * 1.5);
                var displacementY = (j * this.radius * (Math.sqrt(3))) + colDisplacement;
                var hexStart = new paper.Point(
                    this.start.x + displacementX,
                    this.start.y + displacementY
                );
                col.push(new Tile(hexStart, [i, j], this.radius));
            }
            tiles.push(col);
            if (i + 1 < (this.colNum / 2)) {
                colHeight++;
            } else {
                colHeight--;
            }
        }
        return tiles as TileArray;
    }

    /**
     * 
     * @param {array} dataSet Array of data used to populate board tiles. 
     */
    populateBoard(dataSet: TileGridUpdate) {
        for (const tilePackage of dataSet) {
            const col = this.tiles[tilePackage.tile[0]];
            if (col !== undefined) {
                const tile = col[tilePackage.tile[1]];
                if (tile !== undefined) {
                    tile.update(tilePackage.data);
                }
            }
        }
    }
}
