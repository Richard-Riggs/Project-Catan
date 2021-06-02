import { MiddlewareAPI } from "@reduxjs/toolkit";
import { EventUpdate, GameMode, GameData, GameUpdate, PlayerData } from "../types/game";
import GameSession from "./GameSession";
import { setPlayerData, setGameState } from '../redux/gameSlice';
import Game from "./Game";

export default class GameUpdater {
    private _gameSession: GameSession;
    private _store: MiddlewareAPI;
    private _game: Game | null;

    constructor(gameSession: GameSession, store: MiddlewareAPI) {
        this._gameSession = gameSession;
        this._store = store;
        this._game = null;
    }

    // TODO: remove & replace with generic dispatch function
    rollDice() {
        if (!this._game) return;
        this._game.eventHandler.triggerGameEvent('roll_dice');
    }

    setupGame() {
        this._gameSession.setupGame();
    }

    useGame(game: Game) {
        this._game = game;
    }

    dispatchUpdate(update: GameUpdate) {
        // TODO: Send off to game server
        this.handleUpdate(update);
    }

    dispatchUpdateFromEvent(eventUpdate: EventUpdate) {
        if (!this._game) return;
        const update: GameUpdate = {
            playerId: this._game.player.id,
            data: eventUpdate
        };
        this.dispatchUpdate(update);
    }

    // TODO: Attempt to implement React Redux
    // see https://redux.js.org/faq/code-structure#where-should-websockets-and-other-persistent-connections-live
    // see https://github.com/PlatziDev/socket.io-redux

    handleUpdate(update: GameUpdate) {
        if (!this._game) return;
        switch (update.data.type) {
            case 'roll_dice':
                this._game.player.getResourcesFromDiceRoll(update.data.value);
                this._game.lastRolled = update.data.value;
                this.updateUIContext();
                break;
            case 'add_settlement':
                const vertex = this._game.gameBoard.vertexMap.getVertexById(update.data.value);
                if (vertex) {
                    vertex.addSettlement();
                    this._game.player.buySettlement(vertex);
                    this.setMode('standby');
                }
                break;
            case 'add_road':
                const road = this._game.gameBoard.roadPathSet.getRoadPathById(update.data.value);
                if (road) {
                    road.addRoadPiece();
                    this._game.player.buyRoad(road);
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
        if (!this._game) return;
        this._game.mode = mode;
        this._game.gameBoard.switchBoardMode(mode);
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
        if (!this._game) return;
        const playerData: PlayerData = this._game.player.getAllData();
        // this._stateSetters.setPlayerData(playerData);
        this._store.dispatch(setPlayerData(playerData));
    }

    updateGameSessionState() {
        if (!this._game) return;
        const gameState: GameData = {
            mode: this._game.mode,
            lastRolled: this._game.lastRolled
        };
        // this._stateSetters.setGameState(gameState);
        this._store.dispatch(setGameState(gameState));
    }
}
