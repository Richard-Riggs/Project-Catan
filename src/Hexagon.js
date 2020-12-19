import { PointText, Path } from 'paper';


export default class Hexagon {
  constructor(centerPoint, coordinates, radius) {
      this.coordinates = coordinates;
      this.center = centerPoint;
      this.path = new Path.RegularPolygon(centerPoint, 6, radius);
      this.path.strokeColor = 'black';
      this.path.fillColor = 'red';
      this.path.rotate(30);

      // Add text
      this.text = new PointText({
          point: centerPoint,
          content: `${this.coordinates.x}-${this.coordinates.y}`,
          fillColor: 'black',
          fontFamily: 'Tahoma',
          fontWeight: 'normal',
          fontSize: radius / 2,
          locked: true,
          opacity: 0
      });
      var textDisplacementX = -(this.text.bounds.centerX - this.center.x);
      var textDisplacementY = -(this.text.bounds.centerY - this.center.y);
      this.text.translate(textDisplacementX, textDisplacementY);

      // Add event listeners
      this.path.onMouseEnter = () => {
          this.path.tweenTo({fillColor: 'green'}, 100);
          this.text.tweenTo({opacity: 1}, 100);
      }
      this.path.onMouseLeave = () => {
          this.path.tweenTo({fillColor: 'red'}, 100);
          this.text.tweenTo({opacity: 0}, 100);
      }
  }
}
