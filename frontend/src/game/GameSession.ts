import Player from './Player';
import GameEventHandler from './GameEventHandler';
import GameBoard from './GameBoard';
import GameUpdater from './GameUpdater';
import { GameMode, GameSettings } from '../types/game';
import * as paper from 'paper';
import { MiddlewareAPI } from '@reduxjs/toolkit';
import GameSocket from './GameSocket';

/**
 * Top-level class for interfacing between the React GameSessionContext, the LiveSessionManager,
 * and the GameBoard logic.
 */
export default class GameSession {
    mode: GameMode;
    updater: GameUpdater;
    gameBoard: GameBoard;
    player: Player;
    eventHandler: GameEventHandler;
    lastRolled: number;
    gameSocket: GameSocket;

    constructor(store: MiddlewareAPI) {
        console.log('initializing game');
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
    

        this.player = new Player('testUser');
        this.eventHandler = new GameEventHandler(this);
        this.gameBoard = new GameBoard(this, settings);
        this.updater = new GameUpdater(this, store);
        this.lastRolled = 0;
        this.mode = 'standby';
        this.updater.setMode(this.mode);
        this.gameSocket = new GameSocket(this.updater);
    }

}
