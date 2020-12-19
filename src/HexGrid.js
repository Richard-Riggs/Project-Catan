import { Point } from 'paper';
import Hexagon from './Hexagon';

export default class HexGrid {
    constructor(settings) {
        this.start = settings.start;
        this.radius = settings.hexSize;
        this.size = settings.boardSize;
        this.grid = [];
        this.generateBoard();
    }

    generateBoard() {
        var centerCol = Math.ceil(this.size / 2) - 1;
        var colHeight = 3;
        for (var i = 0; i < this.size; i++) {
            var col = [];
            var distFromCenter = Math.abs(centerCol - i);
            var colDisplacement = (distFromCenter * (this.radius * (Math.sqrt(3) / 2)));
            for (var j = 0; j < colHeight; j++) {
                var displacementX = this.radius * (i * 1.5);
                var displacementY = (j * this.radius * (Math.sqrt(3))) + colDisplacement;
                var hexStart = new Point(
                    this.start.x + displacementX,
                    this.start.y + displacementY
                );
                col.push(new Hexagon(hexStart, {x: i, y: j}, this.radius));
            }
            this.grid.push();
            if (i + 1 < (this.size / 2)) {
                colHeight++;
            } else {
                colHeight--;
            }
        }
    }
}
