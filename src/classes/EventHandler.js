export default class EventHandler {
	constructor(gameSession) {
		this.gameSession = gameSession;
		this.player = gameSession.player;
	}

	handleVertexClick(vertex) {
		switch (this.gameSession.mode) {
			case 'add_settlement':
				if (vertex.canAddPiece() && this.player.canBuySettlement()) {
					this.player.buySettlement();
					vertex.addSettlement();
					this.gameSession.updateStateWithMode('standby');
				}
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
