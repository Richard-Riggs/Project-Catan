import * as paper from 'paper';
import { generateTileData } from './tileData';
import Board from './Board';

export function initBoard() {
    paper.setup('canvas');

    var settings = {
        start: new paper.Point(100, 100),
        colNum: 7,
        minColHeight: 3,
        hexSize: 50,
    }

    var board = new Board(settings, generateTileData);
}
