import Vertex from "./Vertex";
import VertexMap from "./VertexMap";

class Road {
    id: string;
    vertices: [Vertex, Vertex];

    constructor(vertex1: Vertex, vertex2: Vertex) {
        this.vertices = [vertex1, vertex2];
        this.id = Road.createId(...this.vertices);
    }

    static createId(vertex1: Vertex, vertex2: Vertex) {
        const tag1 = `${vertex1.coordinates[0]}-${vertex1.coordinates[1]}`;
        const tag2 = `${vertex2.coordinates[0]}-${vertex2.coordinates[1]}`;
        const sorted = [tag1, tag2].sort();
        return `${sorted[0]}_${sorted[1]}_R`
    }
}

export default class RoadMap {
    roads: Array<Road>;

    constructor(vertexMap: VertexMap) {
        this.roads = this.generateRoads(vertexMap);
    }

    generateRoads(vertexMap: VertexMap): Array<Road> {
        const roads: Array<Road> = [];
        for (const vertexCol of vertexMap.vertices) {
            for (const vertex of vertexCol) {
                for (const adjVertex of vertex.adjacentVertices) {
                    const roadId = Road.createId(vertex, adjVertex);
                    if (!roads.find(r => r.id === roadId)) {
                        roads.push(new Road(vertex, adjVertex));
                    }
                }
            }
        }
        return roads;
    }
}