export default class Player{
    constructor(iName){
        this.name = iName;
        this.wood = 0;
        this.sheep = 0;
        this.wheat = 0;
        this.ore = 0;
        this.brick = 0;
        this.devCards = []
        this.roads = 15;
        this.ships = 15;
        this.settlements = 5;
        this.cities = 3;
    }
    get totalResources(){
        return this.wood+this.sheep+this.wheat+this.ore+this.brick;
    }

    canBuyRoad(){
        if(this.wood >=1 && this.ore >= 1){
            return true;
        }
        else{ return false;}
    }
    buyRoad(){
        this.wood --;
        this.ore --;
    }

    canBuyShip(){
        if(this.wood>=1 && this.sheep >= 1){
            return true;
        }
        else {return false;}
    }
    buyShip(){
        this.wood --;
        this.sheep --;
    }

    canBuySettlement(){
        if(this.wood >= 1 && this.sheep >=1 && this.brick >= 1 && this.wheat >=1){
            return true;
        }
        else {false;}
    }

    buySettlement(){
        this.wood --;
        this.wheat --;
        this.sheep --;
        this.brick --;
    }

    canBuyCity(){
        if(this.ore >=3 && this.wheat >=2 ){
            return true;
        }
        else { false;}
    }
    buyCity(){
        this.ore += -3;
        this.wheat += -2;
    }
}