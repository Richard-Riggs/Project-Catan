import * as paper from 'paper';
import { GameSettings, StateSetters } from '../types/game';
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

    return new GameSession(settings, stateSetters);
}
