import Player from './Player';
import GameEventHandler from './GameEventHandler';
import GameBoard from './GameBoard';
import GameUpdater from './GameUpdater';
import { GameMode, GameSettings, StateSetters } from '../types/game';

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

    constructor(settings: GameSettings, stateSetters: StateSetters) {
        this.player = new Player('testUser');
        this.eventHandler = new GameEventHandler(this);
        this.gameBoard = new GameBoard(this, settings);
        this.updater = new GameUpdater(this, stateSetters);
        this.lastRolled = 0;
        this.mode = 'standby';
        this.updater.setMode(this.mode);
    }

}
