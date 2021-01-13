import * as paper from 'paper';

export class Settlement {
    built: boolean;
    path: paper.Path.RegularPolygon;
    constructor(size: number, center: paper.Point, built: boolean = true, color: string = 'blue') {
        this.built = built;
        this.path = new paper.Path.RegularPolygon({
            center: center,
            sides: 5,
            radius: size,
            locked: true,
            opacity: built ? 1 : 0.5
        });
        this.path.fillColor = new paper.Color(color);
    }
}
