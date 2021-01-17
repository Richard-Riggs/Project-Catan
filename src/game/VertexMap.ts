import { VerticeArray, HexPoints } from '../types/game';
import GameEventHandler from './GameEventHandler';
import TileGrid from './TileGrid';
import Vertex from './Vertex';

export default class VertexMap {
    vertices: VerticeArray;
    eventHandler: GameEventHandler;
    locked: boolean;

    constructor(tileGrid: TileGrid, eventHandler: GameEventHandler) {
        this.eventHandler = eventHandler;
        this.vertices = this.generateVertexMap(tileGrid);
        this.locked = true;
        this.setupMapReferences(tileGrid);
    }

    //TODO: Refactor this method
    generateVertexMap(tileGrid: TileGrid): VerticeArray {
        let isLeftHalf = true;
        const vertexCols = [];
        const tileRadius = tileGrid.radius;
        for (let i = 0; i < tileGrid.tiles.length; i++) {
            const tileCol = tileGrid.tiles[i];
            if (tileCol !== undefined) {
                const col = [];
                for (let j = 0; j < tileCol.length; j++) {
                    const tile = tileCol[j];
                    if (tile !== undefined) {
                        const hexPoints = tile.hex.getPoints() as HexPoints;
                        if (isLeftHalf) {
                            if (j === 0) col.push(new Vertex(hexPoints[0], [vertexCols.length, col.length], tileRadius, this.eventHandler));
                            col.push(new Vertex(hexPoints[5], [vertexCols.length, col.length], tileRadius, this.eventHandler));
                            col.push(new Vertex(hexPoints[4], [vertexCols.length, col.length], tileRadius, this.eventHandler));
                        } else {
                            if (j === 0) col.push(new Vertex(hexPoints[1], [vertexCols.length, col.length], tileRadius, this.eventHandler));
                            col.push(new Vertex(hexPoints[2], [vertexCols.length, col.length], tileRadius, this.eventHandler));
                            col.push(new Vertex(hexPoints[3], [vertexCols.length, col.length], tileRadius, this.eventHandler));
                        }
                    }
                }
                vertexCols.push(col);
                if (isLeftHalf) {
                    isLeftHalf = i < Math.floor(tileGrid.tiles.length / 2);
                    if (!isLeftHalf) i--;
                }
            }
        }

        return vertexCols;
    }

    setupMapReferences(tileGrid: TileGrid) {
        for (const vertexCol of this.vertices) {
            for (const vertex of vertexCol) {
                vertex.setReferences(this, tileGrid);
            }
        }
    }

    /**
     * Unlocks the clickBoundary on each vertex, which enables user interaction.
     */
    enableVertexEvents(): void {
        if (this.locked) {
            for (const vertexCol of this.vertices) {
                for (const vertex of vertexCol) {
                    vertex.clickBoundary.locked = false;
                }
            }
            this.locked = false;
        }

    }

    /**
     * Locks the clickBoundary on each vertex, which disables user interaction.
     */
    disableVertexEvents(): void {
        if (!this.locked) {
            for (const vertexCol of this.vertices) {
                for (const vertex of vertexCol) {
                    vertex.clickBoundary.locked = true;
                }
            }
            this.locked = true;
        }
    }

    getVertexById(id: string): Vertex | undefined {
        return this.vertices.flat().find(v => v.id === id);
    }
}
