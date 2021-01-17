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

    /**
     * Initializes a new RoadPath object.
     * 
     * @param {Vertex} vertex1 Vertex at one end of the path.
     * @param {Vertex} vertex2 Vertex at the other end of the path.
     * @param {GameEventHandler} eventHandler The GameSession's event handler.
     */
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

    /**
     * Creates a unique RoadPath id based on the two vertices.
     * 
     * @param vertex1 Vertex at one end of the path.
     * @param vertex2 Vertex at the other end of the path.
     * @returns {string} The unique RoadPath id.
     */
    static createId(vertex1: Vertex, vertex2: Vertex): string {
        const tag1 = `${vertex1.coordinates[0]}-${vertex1.coordinates[1]}`;
        const tag2 = `${vertex2.coordinates[0]}-${vertex2.coordinates[1]}`;
        const sorted = [tag1, tag2].sort();
        return `${sorted[0]}_${sorted[1]}_R`
    }

    /**
     * Attach event handlers from the GameEventHandler to the RoadPath's clickBoundary.
     */
    attachEventListeners(): void {
        this.clickBoundary.onMouseEnter = () => this._eventHandler.handleRoadPathMouseEnter(this);
        this.clickBoundary.onMouseLeave = () => this._eventHandler.handleRoadPathMouseLeave(this);
        this.clickBoundary.onClick = () => this._eventHandler.handleRoadPathClick(this);
    }

    /**
     * Initialize a new clickBoundary for the RoadPath.
     * 
     * @param {number} circleRadius The radius of the RoadPath's click boundary.
     * @returns {paper.Path.Circle} The RoadPath's clickBoundary.
     * TODO: Make ClickBoundary it's own class.
     */
    setClickBoundary(circleRadius: number): paper.Path.Circle {
        if (this.clickBoundary) this.clickBoundary.remove();
        return new paper.Path.Circle({
            center: this.center,
            strokeColor: new paper.Color(0, 0, 255, 0.01),
            fillColor: new paper.Color(0, 0, 255, 0.01),
            radius: circleRadius,
            opacity: 0.01,
            locked: true
        });
    }

    /**
     * Determines if a road can be built here.
     * 
     * @returns {boolean} True if a road can be built, false otherwise.
     */
    canAddPiece(): boolean {
        const noBuiltPiece = !(this.roadPiece && this.roadPiece.built);
        return noBuiltPiece;
    }

    /**
     * Adds a transparent piece to the RoadPath when the user hovers over it.
     */
    addHoverPiece() {
        if (!this.roadPiece && this.canAddPiece()) {
            this.roadPiece = new RoadPiece(10, this.vertices, false, new paper.Color(204, 0, 153, 0.5));
        }
    }
    
    /**
     * Removes the transparent hover piece if it exists.
     */
    removeHoverPiece() {
        if (this.roadPiece && !this.roadPiece.built) {
            this.roadPiece.remove();
            this.roadPiece = null;
        }
    }

    /**
     * Adds a built road to the path.
     */
    addRoadPiece() {
        if (this.canAddPiece()) {
            if (this.roadPiece && !this.roadPiece.built) this.roadPiece.remove();
            this.roadPiece = new RoadPiece(10, this.vertices, true, new paper.Color(204, 0, 153));
        }
    }

}
