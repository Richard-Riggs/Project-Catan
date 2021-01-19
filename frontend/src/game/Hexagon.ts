import * as paper from 'paper';
import { TileColors } from '../types/game';

export default class Hexagon {
    colors: TileColors;
    center: paper.Point;
    type: string;
    path: paper.Path.RegularPolygon;

    constructor(centerPoint: paper.Point, radius: number) {
        this.colors = {
            sheep: 'green',
            ore: 'grey',
            wheat: 'yellow',
            wood: 'brown',
            brick: 'red'
        }
        this.center = centerPoint;
        this.type = "";
        this.path = new paper.Path.RegularPolygon(centerPoint, 6, radius);
        this.path.strokeColor = new paper.Color('black');
        this.path.fillColor = new paper.Color('red');
        this.path.rotate(30);
    }

    setType(type: keyof TileColors) {
        this.type = type;
        this.path.fillColor = new paper.Color(this.colors[type]);
    }

    getPoints() {
        const points = this.path.segments.map(segment => new paper.Point(segment.point));
        return points;
    }
}
