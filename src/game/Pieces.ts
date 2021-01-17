import * as paper from 'paper';
import Vertex from './Vertex';

// TODO: Make abstract piece class

export class Settlement {
    private _path: paper.Path.RegularPolygon;
    built: boolean;

    constructor(size: number, center: paper.Point, built: boolean = true, color: string = 'blue') {
        this.built = built;
        this._path = new paper.Path.RegularPolygon({
            center: center,
            sides: 5,
            radius: size,
            locked: true,
            opacity: built ? 1 : 0.5
        });
        this._path.fillColor = new paper.Color(color);
    }

    remove() {
        this._path.remove();
    }
}

export class RoadPiece {
    private _path: paper.Path;
    built: boolean;

    constructor(width: number, vertices: [Vertex, Vertex], built: boolean = true, color: paper.Color) {
        this.built = built;
        this._path = new paper.Path();
        this._path.strokeWidth = width;
        this._path.add(vertices[0].center);
        this._path.add(vertices[1].center);
        this._path.strokeColor = color;
        this._path.locked = true;
    }

    remove() {
        this._path.remove();
    }
}