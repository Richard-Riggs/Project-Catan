import * as paper from 'paper';
import { generateTileData } from './tileData';
import Board from './Board';
import { Path, view } from 'paper';

export function initBoard() {
    paper.setup('canvas');

    var backGround = new Path.Rectangle({
        point: [0, 0],
        size: [view.size.width, view.size.height]
    });
    backGround.sendToBack();
    backGround.fillColor = '#4287f5';

    var settings = {
        start: new paper.Point(150, 100),
        colNum: 7,
        minColHeight: 3,
        hexSize: 50,
    }

    return new Board(settings, generateTileData);
}
