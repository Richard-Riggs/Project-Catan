import { Settlement } from './Pieces';

export default class EventHandler {
    constructor(gameSession) {
        this.gameSession = gameSession;
    }

    handleVertexClick(vertex) {
        switch (this.gameSession.mode) {
            case 'add_settlement':
                if (vertex.canAddPiece()) vertex.addSettlement();
                break;
            default:
                break;
        }
    }

    handleVertexMouseEnter(vertex) {
        switch (this.gameSession.mode) {
            case 'add_settlement':
                vertex.addHoverPiece();
                break;
            default:
                break;
        }
    }

    handleVertexMouseLeave(vertex) {
        switch (this.gameSession.mode) {
            default:
                vertex.removeHoverPiece();
                break;
        }
    }
}
