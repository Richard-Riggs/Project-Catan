import GameSession from './GameSession';
import Player from './Player';
import Vertex from './Vertex';

export default class GameEventHandler {
    gameSession: GameSession;
    player: Player;

    constructor(gameSession: GameSession) {
        this.gameSession = gameSession;
        this.player = gameSession.player;
    }

    handleVertexClick(vertex: Vertex) {
        switch (this.gameSession.mode) {
            case 'add_settlement':
                if (vertex.canAddPiece() && this.player.canBuySettlement()) {
                    this.player.buySettlement();
                    vertex.addSettlement();
                    this.gameSession.setMode('standby');
                }
                break;
            default:
                break;
        }
    }

    handleVertexMouseEnter(vertex: Vertex) {
        switch (this.gameSession.mode) {
            case 'add_settlement':
                vertex.addHoverPiece();
                break;
            default:
                break;
        }
    }

    handleVertexMouseLeave(vertex: Vertex) {
        switch (this.gameSession.mode) {
            default:
                vertex.removeHoverPiece();
                break;
        }
    }
}
