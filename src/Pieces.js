import { Path } from 'paper';

export class Settlement {
    constructor(size, center, color='blue') {
        this.path = new Path.RegularPolygon(center, 5, size);
        this.path.fillColor = color;
    }
}
