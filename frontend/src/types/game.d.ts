// // https://medium.com/jspoint/typescript-type-declaration-files-4b29077c43

import RoadPath from "../game/RoadPath";

// import Tile from "../../classes/Tile";

interface GameSettings {
    start: paper.Point;
    colNum: number;
    minColHeight: number;
    hexSize: number;
}

interface StateSetter<T>{
    (arg: T): void;
}

interface StateSetters {
    setPlayerData: StateSetter<PlayerData>;
    setGameState: StateSetter<GameState>
}

interface TileColors {
    sheep: string;
    ore: string;
    wheat: string;
    wood: string;
    brick: string;
}

type TileArray = Array<Array<Tile>>;

type VerticeArray = Array<Array<Vertex>>;

type Coordinates = [number, number];

interface TileData {
    type: keyof TileColors;
    rollVal: number;
}

interface TileDataPackage {
    tile: Coordinates,
    data: TileData
}

type TileGridUpdate = Array<TileDataPackage>;

type GamePiece = Settlement;

type HexPoints = [paper.Point, paper.Point, paper.Point, paper.Point, paper.Point, paper.Point];

type GameMode = "add_settlement" | "add_road" | "standby";

type GameEvent = "roll_dice" | "add_road" | "add_settlement";

type EventUpdate = DiceRollUpdate | AddRoadUpdate | AddSettlmentUpdate;

interface DiceRollUpdate {
    type: "roll_dice";
    value: number;
}

interface AddRoadUpdate {
    type: "add_road";
    value: string;
}

interface AddSettlmentUpdate {
    type: "add_settlement";
    value: string;
}


interface GameUpdate {
    playerId: string;
    data: EventUpdate;
}

interface PlayerData {
    name: string;
	brick: number;
	ore: number;
	sheep: number;
	wheat: number;
	wood: number;
	cities: number;
	devCards: number;
	roads: number;
	settlements: number;
    ships: number;
    canBuySettlement: boolean;
    canBuyRoad: boolean;
}

interface GameSessionContextData {
	playerData: PlayerData,
	gameState: GameState,
    setGameMode: (mode: GameMode) => void;
    triggerEvent: (event: GameEvent) => void;
}

interface GameState {
    mode: GameMode,
    lastRolled: number
};

interface GameState2 {
    mode: GameMode,
    lastRolled: number,
    player: PlayerData
};
