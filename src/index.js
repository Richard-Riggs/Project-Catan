import * as paper from 'paper';
import HexGrid from './HexGrid';

paper.setup('canvas')

var settings = {
  start: new paper.Point(200, 200),
  boardSize: 7,
  hexSize: 50
}

var grid = new HexGrid(settings);
