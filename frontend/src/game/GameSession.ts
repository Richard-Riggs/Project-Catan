import GameUpdater from './GameUpdater';
import { MiddlewareAPI } from '@reduxjs/toolkit';
import GameSocket from './GameSocket';
import Game from './Game';

/**
 * Top-level class for interfacing between the React GameSessionContext, the LiveSessionManager,
 * and the GameBoard logic.
 */
export default class GameSession {
    updater: GameUpdater;
    gameSocket: GameSocket;
    game: Game | null;

    constructor(store: MiddlewareAPI) {
        this.updater = new GameUpdater(this, store);
        this.gameSocket = new GameSocket(this.updater);
        this.game = null;
    }

    setupGame() {
        this.game = new Game(this.updater);
    }

}
