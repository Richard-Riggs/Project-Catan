import { Color, Path } from 'paper';
import { Settlement } from './Pieces';

export default class Vertex {
    constructor(point, coordinates, tileRadius, eventHandler) {
        this.id = `${coordinates[0]}-${coordinates[1]}-V`;
        this.piece = null;
        this.center = point;
        this.coordinates = coordinates;
        this.tileRadius = tileRadius;
        this.setClickBoundary(this.tileRadius * 0.6);
        this.eventHandler = eventHandler;
    }

    setClickBoundary(circleRadius) {
        if (this.clickBoundary) this.clickBoundary.remove();
        this.clickBoundary = new Path.Circle({
            center: this.center,
            strokeColor: new Color(0, 0, 255, 0.01),
            fillColor: new Color(0, 0, 255, 0.01),
            radius: circleRadius,
            opacity: 0.1
        });
    }

    setReferences(vertexMap, tileGrid) {
        this.setAdjacentVertices(vertexMap);
        this.setAdjacentTiles(tileGrid);
        this.setClickBoundary(this.tileRadius / 2);
        this.attachEventListeners();
    }

    setAdjacentVertices(vertexMap) {
        const vertices = [];
        for (const vertexCol of vertexMap.vertices) {
            for (const vertex of vertexCol) {
                if (vertex.id !== this.id) {
                    const intersections = this.clickBoundary.getIntersections(vertex.clickBoundary);
                    if (intersections.length) {
                        vertices.push(vertex);
                    }
                }
            }
        }
        this.adjacentVertices = vertices;
    }

    setAdjacentTiles(tileGrid) {
        const tiles = [];
        for (const tileCol of tileGrid.tiles) {
            for (const tile of tileCol) {
                const intersections = this.clickBoundary.getIntersections(tile.hex.path);
                if (intersections.length) {
                    tiles.push(tile);
                }
            }
        }
        this.adjacentTiles = tiles;
    }

    attachEventListeners() {
        this.clickBoundary.onClick = () => this.eventHandler.handleVertexClick(this);
        this.clickBoundary.onMouseEnter = () => this.eventHandler.handleVertexMouseEnter(this);
        this.clickBoundary.onMouseLeave = () => this.eventHandler.handleVertexMouseLeave(this);
    }

    canAddPiece() {
        const validLocation = this.adjacentVertices.every(vert => !(vert.piece && vert.piece.built));
        const noCurrentPiece = !(this.piece && this.piece.built);
        return validLocation && noCurrentPiece;
    }

    addSettlement() {
        if (this.piece && !this.piece.built) this.piece.path.remove();
        this.piece = new Settlement(this.tileRadius / 4, this.center);
    }

    addHoverPiece() {
        if (!this.piece && this.canAddPiece()) {
            this.piece = new Settlement(this.tileRadius / 4, this.center, false);
        }
    }

    removeHoverPiece() {
        if (this.piece && !this.piece.built) {
            this.piece.path.remove();
            this.piece = null;
        }
    }
}
