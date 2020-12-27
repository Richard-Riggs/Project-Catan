export default class Player {
	constructor(iName) {
		// TODO: add configurable default values
		this.name = iName;
		this.wood = 0;
		this.sheep = 0;
		this.wheat = 0;
		this.ore = 0;
		this.brick = 0;
		this.devCards = [];
		this.roads = 15;
		this.ships = 15;
		this.settlements = 5;
		this.cities = 3;
	}

	get totalResources() {
		return this.wood + this.sheep + this.wheat + this.ore + this.brick;
	}

	getAllData() {
		return {
			name: this.name,
			wood: this.wood,
			wheat: this.wheat,
			sheep: this.sheep,
			ore: this.ore,
			brick: this.brick,
			devCards: this.devCards,
			roads: this.roads,
			ships: this.ships,
			settlements: this.settlements,
			cities: this.cities
		};
	}

	canBuyRoad() {
		if (this.wood >= 1 && this.ore >= 1) {
			return true;
		} else {
			return false;
		}
	}

	buyRoad() {
		this.wood--;
		this.ore--;
	}

	canBuyShip() {
		if (this.wood >= 1 && this.sheep >= 1) {
			return true;
		} else {
			return false;
		}
	}

	buyShip() {
		this.wood--;
		this.sheep--;
	}

	canBuySettlement() {
		return this.wood >= 1 && this.sheep >= 1 && this.brick >= 1 && this.wheat >= 1;
	}

	buySettlement() {
		this.wood--;
		this.wheat--;
		this.sheep--;
		this.brick--;
	}

	canBuyCity() {
		if (this.ore >= 3 && this.wheat >= 2) {
			return true;
		} else {
			return false;
		}
	}

	buyCity() {
		this.ore += -3;
		this.wheat += -2;
	}
}
