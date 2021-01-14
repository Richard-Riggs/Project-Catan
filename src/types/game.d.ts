// // https://medium.com/jspoint/typescript-type-declaration-files-4b29077c43

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

type GameMode = "add_settlement" | "standby";