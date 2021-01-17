import { GameEvent } from '../types/game';
import GameBoard from './GameBoard';
import GameSession from './GameSession';
import GameUpdater from './GameUpdater';
import Player from './Player';
import RoadPath from './RoadPath';
import Vertex from './Vertex';

export default class GameEventHandler {
    private _gameSession: GameSession;
    private _gameUpdater: GameUpdater;
    private _player: Player;

    constructor(gameSession: GameSession, gameUpdater: GameUpdater) {
        this._gameSession = gameSession;
        this._gameUpdater = gameUpdater;
        this._player = gameSession.player;
    }

    triggerGameEvent(event: GameEvent) {
        switch (event) {
            case 'roll_dice':
                const rollVal = GameBoard.rollDice();
                this._gameUpdater.dispatchUpdateFromEvent({
                    type: event,
                    value: rollVal
                });

        }
    }

    handleVertexClick(vertex: Vertex) {
        switch (this._gameSession.mode) { // TODO: Player mode? 
            case 'add_settlement':
                if (vertex.canAddPiece() && this._player.canBuySettlement()) {
                    vertex.addSettlement();
                    this._player.buySettlement(vertex);
                    this._gameSession.updater.setMode('standby');
                }
                break;
            default:
                break;
        }
    }

    handleVertexMouseEnter(vertex: Vertex) {
        switch (this._gameSession.mode) {
            case 'add_settlement':
                vertex.addHoverPiece();
                break;
            default:
                break;
        }
    }

    handleVertexMouseLeave(vertex: Vertex) {
        switch (this._gameSession.mode) {
            default:
                vertex.removeHoverPiece();
                break;
        }
    }

    handleRoadPathMouseEnter(roadPath: RoadPath) {
        switch (this._gameSession.mode) {
            case 'add_road':
                roadPath.addHoverPiece();
                break;
            default:
                break;
        }
    }

    handleRoadPathMouseLeave(roadPath: RoadPath) {
        switch (this._gameSession.mode) {
            default:
                roadPath.removeHoverPiece();
        }
    }

    handleRoadPathClick(roadPath: RoadPath) {
        switch (this._gameSession.mode) {
            case 'add_road':
                if (roadPath.canAddPiece() && this._player.canBuyRoad()) {
                    this._player.buyRoad();
                    roadPath.addRoadPiece();
                    this._gameSession.updater.setMode('standby');
                }
                break;
            default:
                break;
        }
    }
}
