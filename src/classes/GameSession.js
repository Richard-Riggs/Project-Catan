import TileGrid from './TileGrid';
import VertexMap from './VertexMap';
import Player from './Player';
import EventHandler from './EventHandler';
import { generateTileData } from './tileData';

// Includes a tile grid and vertex map
export default class GameSession {
	constructor(settings, stateSetters) {
		this.stateSetters = stateSetters;
		this.player = new Player('testUser');
		this.eventHandler = new EventHandler(this);
		this.tileGrid = new TileGrid(settings);
		this.vertexMap = new VertexMap(this.tileGrid, this.eventHandler);
		const tileData = generateTileData(this.tileGrid.tiles);
		this.tileGrid.populateBoard(tileData);
		this.mode = 'standby';
		this.updateGameSessionState();
	}

	setMode(mode) {
		this.mode = mode;
		this.updateGameSessionState();
	}

	updateStateWithMode(mode) {
		this.setMode(mode);
		this.updatePlayerDataState();
	}

	updatePlayerDataState() {
		// Call getDataState method on Player.js
		const playerData = this.player.getAllData();
		debugger;
		this.stateSetters.setPlayerData(playerData);
	}

	updateGameSessionState() {
		const gameState = {
			mode: this.mode
		};
		this.stateSetters.setGameState(gameState);
	}

	// vertexClick() {
	// }
}
