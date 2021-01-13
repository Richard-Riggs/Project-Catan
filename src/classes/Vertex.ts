import GameEventHandler from './GameEventHandler';
import { Settlement } from './Pieces';
import Tile from './Tile';
import TileGrid from './TileGrid';
import VertexMap from './VertexMap';
import * as paper from 'paper';


export default class Vertex {
    id: string;
    piece: GamePiece | null;
    center: paper.Point;
    coordinates: Coordinates;
    tileRadius: number;
    eventHandler: GameEventHandler;
    clickBoundary: paper.Path.Circle;
    adjacentVertices: Array<Vertex> | null;
    adjacentTiles: Array<Tile> | null;

    constructor(point: paper.Point, coordinates: Coordinates, tileRadius: number, eventHandler: GameEventHandler) {
        this.id = `${coordinates[0]}-${coordinates[1]}-V`;
        this.piece = null;
        this.center = point;
        this.coordinates = coordinates;
        this.tileRadius = tileRadius;
        this.clickBoundary = this.setClickBoundary(this.tileRadius * 0.6);
        this.eventHandler = eventHandler;
        this.adjacentVertices = null;
        this.adjacentTiles = null;
    }

    setClickBoundary(circleRadius: number): paper.Path.Circle {
        if (this.clickBoundary) this.clickBoundary.remove();
        return new paper.Path.Circle({
            center: this.center,
            strokeColor: new paper.Color(0, 0, 255, 0.01),
            fillColor: new paper.Color(0, 0, 255, 0.01),
            radius: circleRadius,
            opacity: 0.1
        });
    }

    setReferences(vertexMap: VertexMap, tileGrid: TileGrid) {
        this.setAdjacentVertices(vertexMap);
        this.setAdjacentTiles(tileGrid);
        this.setClickBoundary(this.tileRadius / 2);
        this.attachEventListeners();
    }

    setAdjacentVertices(vertexMap: VertexMap) {
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

    setAdjacentTiles(tileGrid: TileGrid) {
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
        const validLocation = this.adjacentVertices && this.adjacentVertices.every(vert => !(vert.piece && vert.piece.built));
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
