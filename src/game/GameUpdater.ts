import { EventUpdate, GameMode, GameState, GameUpdate, PlayerData, StateSetters } from "../types/game";
import GameSession from "./GameSession";
import Player from "./Player";

export default class GameUpdater {
    private _gameSession: GameSession;
    private _player: Player;
    private _stateSetters: StateSetters;

    constructor(gameSession: GameSession, stateSetters: StateSetters) {
        this._gameSession = gameSession;
        this._player = this._gameSession.player;
        this._stateSetters = stateSetters;
    }

    dispatchUpdate(update: GameUpdate) {
        // TODO: Send off to game server
        this.handleUpdate(update);
    }

    dispatchUpdateFromEvent(eventUpdate: EventUpdate) {
        const update: GameUpdate = {
            playerId: this._player.id,
            data: eventUpdate
        };
        this.dispatchUpdate(update);
    }

    handleUpdate(update: GameUpdate) {
        switch (update.data.type) {
            case 'roll_dice':
                this._player.getResourcesFromDiceRoll(update.data.value);
                this._gameSession.lastRolled = update.data.value;
                this.updateUIContext();
                break;
            default:
                break;
        }
    }

    /**
     * Sets the game mode and updates GameSessionContext.
     * 
     * @param {GameMode} mode New mode to set.
     * @returns {void}
     */
    setMode(mode: GameMode): void {
        this._gameSession.mode = mode;
        this._gameSession.gameBoard.updateBoardMode(mode);
        this.updateUIContext();
    }

    /**
     * Updates all GameSessionContext states using state setters.
     * 
     * @returns {void}
     */
    updateUIContext(): void {
        this.updateGameSessionState();
        this.updatePlayerDataState();
    }

    updatePlayerDataState() {
        const playerData: PlayerData = this._player.getAllData();
        this._stateSetters.setPlayerData(playerData);
    }

    updateGameSessionState() {
        const gameState: GameState = {
            mode: this._gameSession.mode,
            lastRolled: this._gameSession.lastRolled
        };
        this._stateSetters.setGameState(gameState);
    }
}
