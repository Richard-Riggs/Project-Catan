import Vertex from "./Vertex";
import * as paper from 'paper';
import GameEventHandler from "./GameEventHandler";
import { RoadPiece } from "./Pieces";

export default class RoadPath {
    private _eventHandler: GameEventHandler;
    id: string;
    vertices: [Vertex, Vertex];
    center: paper.Point;
    clickBoundary: paper.Path.Circle;
    roadPiece: RoadPiece | null;
    // path: paper.Path.Line;

    constructor(vertex1: Vertex, vertex2: Vertex, eventHandler: GameEventHandler) {
        // TODO: get road width from tile radius
        this._eventHandler = eventHandler;
        this.vertices = [vertex1, vertex2];
        this.id = RoadPath.createId(...this.vertices);
        this.center = new paper.Point(
            (vertex1.center.x + vertex2.center.x) / 2,
            (vertex1.center.y + vertex2.center.y) / 2
        );
        this.roadPiece = null;
        this.clickBoundary = this.setClickBoundary(vertex1.tileRadius * (Math.sqrt(3) / 4));
        this.attachEventListeners();
    }

    static createId(vertex1: Vertex, vertex2: Vertex) {
        const tag1 = `${vertex1.coordinates[0]}-${vertex1.coordinates[1]}`;
        const tag2 = `${vertex2.coordinates[0]}-${vertex2.coordinates[1]}`;
        const sorted = [tag1, tag2].sort();
        return `${sorted[0]}_${sorted[1]}_R`
    }

    attachEventListeners() {
        this.clickBoundary.onMouseEnter = () => this._eventHandler.handleRoadPathMouseEnter(this);
        this.clickBoundary.onMouseLeave = () => this._eventHandler.handleRoadPathMouseLeave(this);
    }

    setClickBoundary(circleRadius: number): paper.Path.Circle {
        if (this.clickBoundary) this.clickBoundary.remove();
        return new paper.Path.Circle({
            center: this.center,
            strokeColor: new paper.Color(0, 0, 255, 1),
            fillColor: new paper.Color(0, 0, 255, 0.01),
            radius: circleRadius,
            opacity: 1, // should be 0.01
            locked: true
        });
    }

    canAddPiece() {
        const noBuiltPiece = !(this.roadPiece && this.roadPiece.built);
        return noBuiltPiece;
    }

    addHoverPiece() {
        if (!this.roadPiece && this.canAddPiece()) {
            this.roadPiece = new RoadPiece(10, this.vertices, false, new paper.Color(204, 0, 153, 0.5));
        }
    }
    
    removeHoverPiece() {
        if (this.roadPiece && !this.roadPiece.built) {
            this.roadPiece.remove();
            this.roadPiece = null;
        }
    }

}
