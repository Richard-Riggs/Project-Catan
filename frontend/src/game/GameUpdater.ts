import { EventUpdate, GameMode, GameState, GameUpdate, PlayerData, StateSetters } from "../types/game";
import GameBoard from "./GameBoard";
import GameSession from "./GameSession";
import Player from "./Player";

export default class GameUpdater {
    private _gameSession: GameSession;
    private _player: Player;
    private _stateSetters: StateSetters;
    private _gameBoard: GameBoard;

    constructor(gameSession: GameSession, stateSetters: StateSetters) {
        this._gameSession = gameSession;
        this._stateSetters = stateSetters;
        this._player = this._gameSession.player;
        this._gameBoard = this._gameSession.gameBoard;
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

    // TODO: Attempt to implement React Redux
    // see https://redux.js.org/faq/code-structure#where-should-websockets-and-other-persistent-connections-live
    // see https://github.com/PlatziDev/socket.io-redux

    handleUpdate(update: GameUpdate) {
        switch (update.data.type) {
            case 'roll_dice':
                this._player.getResourcesFromDiceRoll(update.data.value);
                this._gameSession.lastRolled = update.data.value;
                this.updateUIContext();
                break;
            case 'add_settlement':
                const vertex = this._gameBoard.vertexMap.getVertexById(update.data.value);
                if (vertex) {
                    vertex.addSettlement();
                    this._player.buySettlement(vertex);
                    this.setMode('standby');
                }
                break;
            case 'add_road':
                const road = this._gameBoard.roadPathSet.getRoadPathById(update.data.value);
                if (road) {
                    road.addRoadPiece();
                    this._player.buyRoad(road);
                    this.setMode('standby');
                }
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
        this._gameSession.gameBoard.switchBoardMode(mode);
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
