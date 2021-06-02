import { GameEvent } from '../types/game';
import Game from './Game';
import GameBoard from './GameBoard';
import Player from './Player';
import RoadPath from './RoadPath';
import Vertex from './Vertex';

export default class GameEventHandler {
    private _game: Game;
    private _player: Player;

    constructor(game: Game) {
        this._game = game;
        this._player = game.player;
    }

    // TODO: move logic to gameupdater, use dispatch instead
    triggerGameEvent(event: GameEvent, objectId: string = "") {
        switch (event) {
            case 'roll_dice':
                const rollVal = GameBoard.rollDice();
                this._game.updater.dispatchUpdateFromEvent({
                    type: event,
                    value: rollVal
                });
                break;
            default:
                this._game.updater.dispatchUpdateFromEvent({
                    type: event,
                    value: objectId
                });
                break;
        }
    }

    handleVertexClick(vertex: Vertex) {
        switch (this._game.mode) { // TODO: Player mode? 
            case 'add_settlement':
                if (vertex.canAddPiece() && this._player.canBuySettlement()) {
                    this.triggerGameEvent('add_settlement', vertex.id);
                }
                break;
            default:
                break;
        }
    }

    handleVertexMouseEnter(vertex: Vertex) {
        switch (this._game.mode) {
            case 'add_settlement':
                vertex.addHoverPiece();
                break;
            default:
                break;
        }
    }

    handleVertexMouseLeave(vertex: Vertex) {
        switch (this._game.mode) {
            default:
                vertex.removeHoverPiece();
                break;
        }
    }

    handleRoadPathMouseEnter(roadPath: RoadPath) {
        switch (this._game.mode) {
            case 'add_road':
                roadPath.addHoverPiece();
                break;
            default:
                break;
        }
    }

    handleRoadPathMouseLeave(roadPath: RoadPath) {
        switch (this._game.mode) {
            default:
                roadPath.removeHoverPiece();
        }
    }

    handleRoadPathClick(roadPath: RoadPath) {
        switch (this._game.mode) {
            case 'add_road':
                if (roadPath.canAddPiece() && this._player.canBuyRoad()) {
                    this.triggerGameEvent('add_road', roadPath.id);
                }
                break;
            default:
                break;
        }
    }
}
