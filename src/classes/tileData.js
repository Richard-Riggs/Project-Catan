/**
 * Function to generate random data to populate the board tiles.
 * 
 * @param {array} grid  Multidimensional array containing all tiles on the board.
 * @returns {array} Array of data for each tile in the grid.
 */
export function generateTileData(grid) {
    const types = ['sheep', 'ore', 'wheat', 'brick', 'wood'];
    const tileData = []
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            tileData.push({
                tile: [i, j],
                data: {
                    type: types[Math.floor(Math.random() * 5)],
                    rollVal: Math.ceil(Math.random() * 11) + 1
                }
            });
        }
    }
    return tileData;
}
