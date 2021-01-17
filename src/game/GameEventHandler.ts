import GameSession from './GameSession';
import Player from './Player';
import RoadPath from './RoadPath';
import Vertex from './Vertex';

export default class GameEventHandler {
    private _gameSession: GameSession;
    private _player: Player;

    constructor(gameSession: GameSession) {
        this._gameSession = gameSession;
        this._player = gameSession.player;
    }

    handleVertexClick(vertex: Vertex) {
        switch (this._gameSession.mode) {
            case 'add_settlement':
                if (vertex.canAddPiece() && this._player.canBuySettlement()) {
                    this._player.buySettlement();
                    vertex.addSettlement();
                    this._gameSession.setMode('standby');
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
                    this._gameSession.setMode('standby');
                }
                break;
            default:
                break;
        }
    }
}
