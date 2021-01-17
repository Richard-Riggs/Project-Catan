import GameEventHandler from "./GameEventHandler";
import RoadPath from "./RoadPath";
import VertexMap from "./VertexMap";


export default class RoadPathSet {
    private _eventHandler: GameEventHandler;
    roads: Array<RoadPath>;
    locked: boolean;

    constructor(vertexMap: VertexMap, eventHandler: GameEventHandler) {
        this._eventHandler = eventHandler;
        this.roads = this.generateRoads(vertexMap);
        this.locked = true;
    }

    generateRoads(vertexMap: VertexMap): Array<RoadPath> {
        const roads: Array<RoadPath> = [];
        for (const vertexCol of vertexMap.vertices) {
            for (const vertex of vertexCol) {
                for (const adjVertex of vertex.adjacentVertices) {
                    const roadId = RoadPath.createId(vertex, adjVertex);
                    if (!roads.find(r => r.id === roadId)) {
                        roads.push(new RoadPath(vertex, adjVertex, this._eventHandler));
                    }
                }
            }
        }
        return roads;
    }

    /**
     * Unlocks the clickBoundary on each vertex, which enables user interaction.
     */
    enableRoadPathEvents(): void {
        if (this.locked) {
            for (const road of this.roads) {
                road.clickBoundary.locked = false;
            }
            this.locked = false;
        }

    }

    /**
     * Locks the clickBoundary on each vertex, which disables user interaction.
     */
    disableRoadPathEvents(): void {
        if (!this.locked) {
            for (const road of this.roads) {
                road.clickBoundary.locked = true;
            }
            this.locked = true;
        }
    }
}