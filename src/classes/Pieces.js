import { Path } from 'paper';

export class Settlement {
    constructor(size, center, built = true, color = 'blue') {
        this.built = built;
        this.path = new Path.RegularPolygon({
            center: center,
            sides: 5,
            radius: size,
            locked: true,
            opacity: built ? 1 : 0.5
        });
        this.path.fillColor = color;
    }
}
