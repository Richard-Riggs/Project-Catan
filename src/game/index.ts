import * as paper from 'paper';
import GameSession from './GameSession';

export function initGame(stateSetters: StateSetters) {
    paper.setup('canvas');

    const backGround = new paper.Path.Rectangle({
        point: [0, 0],
        size: [paper.view.size.width, paper.view.size.height]
    });
    backGround.sendToBack();
    backGround.fillColor = new paper.Color('#4287f5');

    const settings: GameSettings = {
        start: new paper.Point(150, 100),
        colNum: 7,
        minColHeight: 3,
        hexSize: 50,
    }

    stateSetters.setPlayerData({
        ore: 1,
        wheat: 1,
        wood: 1,
        brick: 2,
        sheep: 4
    });

    return new GameSession(settings, stateSetters);
}
