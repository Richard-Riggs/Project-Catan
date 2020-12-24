import * as paper from 'paper';
import { generateTileData } from './tileData';
import GameBoard from './GameBoard';

paper.setup('canvas');

var settings = {
    start: new paper.Point(100, 100),
    colNum: 7,
    minColHeight: 3,
    hexSize: 50,
}

var gameBoard = new GameBoard(settings, generateTileData);
