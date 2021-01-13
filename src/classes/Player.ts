export default class Player {
    name: string;
    wood: number;
    sheep: number;
    wheat: number;
    ore: number;
    brick: number;
    devCards: Array<{}>;
    roads: number;
    ships: number;
    settlements: number;
    cities: number;

    constructor(iName: string) {
        // TODO: add configurable default values
        this.name = iName;
        this.wood = 1;
        this.sheep = 1;
        this.wheat = 1;
        this.ore = 1;
        this.brick = 1;
        this.devCards = [];
        this.roads = 15;
        this.ships = 15;
        this.settlements = 5;
        this.cities = 3;
    }

    get totalResources(): number {
        return this.wood + this.sheep + this.wheat + this.ore + this.brick;
    }

    getAllData(): object {
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

    canBuyRoad(): boolean {
        if (this.wood >= 1 && this.ore >= 1) {
            return true;
        } else {
            return false;
        }
    }

    buyRoad(): void {
        this.wood--;
        this.ore--;
    }

    canBuyShip(): boolean {
        if (this.wood >= 1 && this.sheep >= 1) {
            return true;
        } else {
            return false;
        }
    }

    buyShip(): void {
        this.wood--;
        this.sheep--;
    }

    canBuySettlement(): boolean {
        return this.wood >= 1 && this.sheep >= 1 && this.brick >= 1 && this.wheat >= 1;
    }

    buySettlement(): void {
        this.wood--;
        this.wheat--;
        this.sheep--;
        this.brick--;
    }

    canBuyCity(): boolean {
        if (this.ore >= 3 && this.wheat >= 2) {
            return true;
        } else {
            return false;
        }
    }

    buyCity(): void {
        this.ore += -3;
        this.wheat += -2;
    }
}
