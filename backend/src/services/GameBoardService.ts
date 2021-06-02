type BoardDimensions = [number, number];

export default class GameBoardService {
    public static generateTileData(dimensions: BoardDimensions) {
        const colHeights = GameBoardService.getColHeights(dimensions);
        return colHeights;
    }

    private static getColHeights(dimensions: BoardDimensions) {
        // [7, 3]
        const colHeights: Array<number> = [];
        let currentHeight = dimensions[1];
        for (let i = 1; i <= dimensions[0]; i++) {
            colHeights.push(currentHeight);
            currentHeight += i > (dimensions[0] / 2) ? -1 : 1;
        }
        return colHeights;
    }
}
