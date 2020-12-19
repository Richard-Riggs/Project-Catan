import { Path } from 'paper';

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
        for (const segment of this.path.segments) {
            if (segment.index === 0) {
                const circle = new Path.Circle(segment.point, 15);
                circle.fillColor = 'blue';
                const line = new Path.Line(segment.point, segment.next.point);
                line.strokeColor = 'orange';
                line.strokeWidth = 5;
            }
        }
    }

    setType(type) {
        this.type = type;
        this.path.fillColor = this.colors[type];
    }
}
