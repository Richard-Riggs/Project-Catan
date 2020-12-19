import { PointText } from 'paper';
import Hexagon from "./Hexagon";


export default class Tile {
    constructor(point, coordinates, radius) {
        this.center = point;
        this.radius = radius;
        this.coordinates = coordinates;
        this.id = `${coordinates[0]}-${coordinates[1]}`;
        this.hex = new Hexagon(point, radius);
        this.initText();
        this.attachEventListeners();
    }

    initText() {
        this.text = new PointText({
            point: this.center,
            content: `${this.coordinates[0]}-${this.coordinates[1]}`,
            fillColor: 'black',
            fontFamily: 'Tahoma',
            fontWeight: 'normal',
            fontSize: this.radius / 2,
            locked: true,
            opacity: 0
        });
        const displacementX = -(this.text.bounds.centerX - this.center.x);
        const displacementY = -(this.text.bounds.centerY - this.center.y);
        this.text.translate(displacementX, displacementY);
    }

    attachEventListeners() {
        this.hex.path.onMouseEnter = this.handleMouseEnter.bind(this);
        this.hex.path.onMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter() {
        this.hex.path.tweenTo({fillColor: 'green'}, 100);
        this.text.tweenTo({opacity: 1}, 100);
    }

    handleMouseLeave() {
        this.hex.path.tweenTo({fillColor: 'red'}, 100);
        this.text.tweenTo({opacity: 0}, 100);
    }
}
