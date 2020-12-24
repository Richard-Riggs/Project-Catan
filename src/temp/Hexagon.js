import { Path, Point } from 'paper';

export default class Hexagon {
    constructor(centerPoint, radius) {
        this.colors = {
            sheep: 'green',
            ore: 'grey',
            wheat: 'yellow',
            wood: 'brown',
            brick: 'red'
        }
        this.center = centerPoint;
        this.type = "";
        this.path = new Path.RegularPolygon(centerPoint, 6, radius);
        this.path.strokeColor = 'black';
        this.path.fillColor = 'red';
        this.path.rotate(30);
    }

    setType(type) {
        this.type = type;
        this.path.fillColor = this.colors[type];
    }

    getPoints() {
        const points = this.path.segments.map(segment => new Point(segment.point));
        return points;
    }
}
