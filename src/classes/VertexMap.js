import Vertex from './Vertex';

export default class VertexMap {
    constructor(tileGrid, eventHandler) {
        this.vertices = [];
        this.eventHandler = eventHandler;
        this.generateVertexMap(tileGrid);
        this.setupMapReferences(tileGrid);
    }

    generateVertexMap(tileGrid) {
        let isLeftHalf = true;
        const vertexCols = [];
        const tileRadius = tileGrid.radius;
        for (let i = 0; i < tileGrid.tiles.length; i++) {
            const col = [];
            for (let j = 0; j < tileGrid.tiles[i].length; j++) {
                const tile = tileGrid.tiles[i][j];
                const hexPoints = tile.hex.getPoints();
                if (isLeftHalf) {
                    if (j === 0) col.push(new Vertex(hexPoints[0], [this.vertices.length, col.length], tileRadius, this.eventHandler));
                    col.push(new Vertex(hexPoints[5], [this.vertices.length, col.length], tileRadius, this.eventHandler));
                    col.push(new Vertex(hexPoints[4], [this.vertices.length, col.length], tileRadius, this.eventHandler));
                } else {
                    if (j === 0) col.push(new Vertex(hexPoints[1], [this.vertices.length, col.length], tileRadius, this.eventHandler));
                    col.push(new Vertex(hexPoints[2], [this.vertices.length, col.length], tileRadius, this.eventHandler));
                    col.push(new Vertex(hexPoints[3], [this.vertices.length, col.length], tileRadius, this.eventHandler));
                }
            }
            this.vertices.push(col);
            if (isLeftHalf) {
                isLeftHalf = i < Math.floor(tileGrid.tiles.length / 2);
                if (!isLeftHalf) i--;
            }
        }
    }

    setupMapReferences(tileGrid) {
        for (const vertexCol of this.vertices) {
            for (const vertex of vertexCol) {
                vertex.setReferences(this, tileGrid);
            }
        }
    }
}
