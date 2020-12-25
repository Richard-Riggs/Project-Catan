import { Color, Path } from 'paper';

export default class Vertex {
    constructor(point, coordinates, tileRadius) {
        this.id = `${coordinates[0]}-${coordinates[1]}-V`;
        this.center = point;
        this.coordinates = coordinates;
        this.tileRadius = tileRadius;
        this.setClickBoundary(this.tileRadius * 0.6);
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
        this.clickBoundary.onMouseEnter = this.handleMouseEnter.bind(this);
        this.clickBoundary.onMouseLeave = this.handleMouseLeave.bind(this);
        this.clickBoundary.onMouseDown = this.handleMouseDown.bind(this);
        this.clickBoundary.onMouseUp = this.handleMouseUp.bind(this);
    }

    handleMouseEnter() {
        this.clickBoundary.opacity = 1;
        this.clickBoundary.strokeColor = new Color(0, 0, 255, 1);
    }

    handleMouseLeave() {
        this.clickBoundary.opacity = 0;
        this.clickBoundary.strokeColor = new Color(0, 0, 255, 0.01);
    }

    handleMouseDown() {
        this.clickBoundary.tweenTo({ fillColor: new Color(0, 0, 255, 0.5) }, 100);
    }

    handleMouseUp() {
        this.clickBoundary.tweenTo({ fillColor: new Color(0, 0, 255, 0.1) }, 100);
    }
}