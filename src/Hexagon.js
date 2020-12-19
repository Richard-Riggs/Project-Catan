import { Path } from 'paper';

export default class Hexagon {
    constructor(centerPoint, radius) {
        this.center = centerPoint;
        this.path = new Path.RegularPolygon(centerPoint, 6, radius);
        this.path.strokeColor = 'black';
        this.path.fillColor = 'red';
        this.path.rotate(30);
    }
}
