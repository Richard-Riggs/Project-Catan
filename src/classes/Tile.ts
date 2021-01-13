import * as paper from 'paper';
import Hexagon from "./Hexagon";


export default class Tile {
    id: string;
    type: keyof TileColors;
    rollVal: number;
    center: paper.Point;
    radius: number;
    coordinates: Coordinates;
    hex: Hexagon;
    text: paper.PointText;

    constructor(point: paper.Point, coordinates: Coordinates, radius: number) {
        this.id = `${coordinates[0]}-${coordinates[1]}-T`;
        this.type = "sheep";
        this.rollVal = 0;
        this.center = point;
        this.radius = radius;
        this.coordinates = coordinates;
        this.hex = new Hexagon(point, radius);
        this.text = this.initText();
        this.attachEventListeners();
    }

    initText() {
        const text = new paper.PointText({
            point: this.center,
            content: ``,
            fillColor: 'black',
            fontFamily: 'Tahoma',
            fontWeight: 'normal',
            fontSize: this.radius / 2,
            locked: true,
            opacity: 1
        });
        const displacementX = -(text.bounds.center.x - this.center.x);
        const displacementY = -(text.bounds.center.y - this.center.y);
        const displacement = new paper.Point(displacementX, displacementY);
        text.translate(displacement);
        return text;
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

    update(data: TileData) {
        this.type = data.type;
        this.rollVal = data.rollVal;
        this.hex.setType(this.type);
        this.text.content = String(this.rollVal);
    }
}
