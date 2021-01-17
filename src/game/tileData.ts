import { TileArray, TileGridUpdate, TileColors, Coordinates, TileData } from "../types/game";
import Tile from "./Tile";

/**
 * Function to generate random data to populate the board tiles.
 * 
 * @param {array} grid  Multidimensional array containing all tiles on the board.
 * @returns {array} Array of data for each tile in the grid.
 */
export function generateTileData(grid: TileArray): TileGridUpdate {
    const types: Array<keyof TileColors> = ['sheep', 'ore', 'wheat', 'brick', 'wood'];
    const tileData = [];
    for (let i = 0; i < grid.length; i++) {
        const col = grid[i] as Array<Tile>;
        for (let j = 0; j < col.length; j++) {
            const coords: Coordinates = [i, j];
            const data: TileData = {
                type: types[Math.floor(Math.random() * 5)] as keyof TileColors,
                rollVal: Math.ceil(Math.random() * 11) + 1
            }
            tileData.push({
                tile: coords,
                data: data
            });
        }
    }
    return tileData;
}
