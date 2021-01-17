export default class Player {
    name: string;
    wood: number;
    sheep: number;
    wheat: number;
    ore: number;
    brick: number;
    devCards: number;
    roads: number;
    ships: number;
    settlements: number;
    cities: number;

    constructor(iName: string) {
        // TODO: add configurable default values
        this.name = iName;
        this.wood = 3;
        this.sheep = 3;
        this.wheat = 3;
        this.ore = 3;
        this.brick = 3;
        this.devCards = 3;
        this.roads = 3;
        this.ships = 3;
        this.settlements = 3;
        this.cities = 3;
    }

    get totalResources(): number {
        return this.wood + this.sheep + this.wheat + this.ore + this.brick;
    }

    getAllData(): PlayerData {
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
            cities: this.cities,
            canBuySettlement: this.canBuySettlement(),
            canBuyRoad: this.canBuyRoad()
        };
    }

    canBuyRoad(): boolean {
        return this.wood >= 1 && this.ore >= 1 && this.roads > 0;
    }

    buyRoad(): void {
        this.wood--;
        this.ore--;
        this.roads--;
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
        return this.wood >= 1 && this.sheep >= 1 && this.brick >= 1 && this.wheat >= 1 && this.settlements > 0;
    }

    buySettlement(): void {
        this.wood--;
        this.wheat--;
        this.sheep--;
        this.brick--;
        this.settlements--;
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
