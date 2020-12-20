import * as paper from 'paper';
import HexGrid from './HexGrid';
import { generateTileData } from './tileData';

paper.setup('canvas');

var settings = {
    start: new paper.Point(100, 100),
    colNum: 7,
    minColHeight: 3,
    hexSize: 50,
}

var grid = new HexGrid(settings);
var tileData = generateTileData(grid.grid);
grid.populateBoard(tileData);
