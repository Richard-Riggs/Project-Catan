import { Settlement } from './Pieces';

export default class EventHandler {
    constructor(gameSession) {
        this.gameSession = gameSession;
    }

    handleVertexClick(vertex) {
        switch (this.gameSession.mode) {
            case 'add_settlement':
                vertex.piece = new Settlement(vertex.tileRadius / 4, vertex.center);
                break;
            default:
                break;
        }
    }
}
