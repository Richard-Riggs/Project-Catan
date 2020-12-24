import { PointText } from 'paper';
import Hexagon from "./Hexagon";


export default class Tile {
    constructor(point, coordinates, radius) {
        this.id = `${coordinates[0]}-${coordinates[1]}-T`;
        this.type = "";
        this.rollVal = 0;
        this.center = point;
        this.radius = radius;
        this.coordinates = coordinates;
        this.hex = new Hexagon(point, radius);
        this.initText();
        this.attachEventListeners();
    }

    initText() {
        this.text = new PointText({
            point: this.center,
            content: ``,
            fillColor: 'black',
            fontFamily: 'Tahoma',
            fontWeight: 'normal',
            fontSize: this.radius / 2,
            locked: true,
            opacity: 1
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
        this.hex.path.tweenTo({opacity: 0.75}, 100);
        this.text.tweenTo({opacity: 0.75}, 100);
    }

    handleMouseLeave() {
        this.hex.path.tweenTo({opacity: 1}, 100);
        this.text.tweenTo({opacity: 1}, 100);
    }

    update(data) {
        for (const property in data) {
            this[property] = data[property];
        }
        this.hex.setType(this.type);
        this.text.content = this.rollVal;
    }
}
