import Player from './Player';
import GameEventHandler from './GameEventHandler';
import GameBoard from './GameBoard';

/**
 * Top-level class for interfacing between the React GameSessionContext, the LiveSessionManager,
 * and the GameBoard logic.
 */
export default class GameSession {
    private _stateSetters: StateSetters;
    private _mode: GameMode;
    private _gameBoard: GameBoard;
    player: Player;
    eventHandler: GameEventHandler;

    constructor(settings: GameSettings, stateSetters: StateSetters) {
        this._stateSetters = stateSetters;
        this.player = new Player('testUser');
        this.eventHandler = new GameEventHandler(this);
        this._gameBoard = new GameBoard(settings, this)
        this._mode = 'standby';
        this.updateContextStates();
    }

    get mode(): GameMode {
        return this._mode
    };

    set mode(mode: GameMode) {
        this.setMode(mode);
    }

    /**
     * Sets the game mode and updates GameSessionContext.
     * 
     * @param {GameMode} mode New mode to set.
     * @returns {void}
     */
    setMode(mode: GameMode): void {
        this._mode = mode;
        this._gameBoard.updateBoardMode(mode);
        this.updateContextStates();
    }

    /**
     * Updates all GameSessionContext states using state setters.
     * 
     * @returns {void}
     */
    updateContextStates(): void {
        this.updateGameSessionState();
        this.updatePlayerDataState();
    }

    updatePlayerDataState() {
        const playerData: PlayerData = this.player.getAllData();
        this._stateSetters.setPlayerData(playerData);
    }

    updateGameSessionState() {
        const gameState: GameState = {
            mode: this.mode
        };
        this._stateSetters.setGameState(gameState);
    }

}
