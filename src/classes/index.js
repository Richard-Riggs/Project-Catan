import * as paper from 'paper';
import GameSession from './GameSession';
import { Path, view } from 'paper';

export function initGame(playerData, setPlayerData) {
    paper.setup('canvas');

    const backGround = new Path.Rectangle({
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

    setPlayerData({
        ore: 1,
        wheat: 1,
        wood: 1,
        brick: 2,
        sheep: 4
    });

    return new GameSession(settings);
}
