function bound(_number, _min, _max){
  return Math.max(Math.min(_number, _max), _min);
}
const petals = (p) => {
  var centerX = 0;
  var centerY = 0;
  var earthRadius = 0;
  var venusRadius = 0;
  var closestDist = 0;
  var furthestDist = 0;
  var earthRotation = 0;
  var venusRotation = 0;
  var counter = 0;

  // var opacity = 90;
  var r = p.random(150, 255);
  var g = p.random(150, 255);
  var b = p.random(150, 255);

  // var initialX;
  // var initialY;

  const earthDaysPerYear = 365;
  const venusDaysPerYear = 225;
  const greatestCommonFactor = 5;

  const earthIncrementer = 360/earthDaysPerYear;
  const venusIncrementer = 360/venusDaysPerYear;

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(0);
    p.fill(r, g, b);
    p.stroke(r, g, b);
    centerX = p.width / 2;
    centerY = p.height / 2;
    earthRadius = (p.height - 40)/ 2;
    venusRadius = (p.height - 380)/ 2;
    closestDist = earthRadius - venusRadius;
    furthestDist = closestDist + venusRadius*2;
    p.angleMode(p.DEGREES);
  }

  p.draw = function() {
    p.fill(r, g, b);
    p.stroke(r, g, b);
    if(earthRotation <= (360*8)){
      var EarthX = centerX + earthRadius * p.cos(earthRotation);
      var EarthY = centerY + earthRadius * p.sin(earthRotation);

      var VenusX = centerX + venusRadius * p.cos(venusRotation);
      var VenusY = centerY + venusRadius * p.sin(venusRotation);

      if(counter % greatestCommonFactor === 0){
        var distance = Math.sqrt(
          Math.pow(EarthX - VenusX, 2) + Math.pow(EarthY - VenusY, 2)
        );
        var shouldIncreaseRed =
          Math.abs(closestDist - distance)
          > Math.abs(furthestDist - distance) * 2;

        var shouldIncreaseBlue =
          Math.abs(closestDist - distance)
          < Math.abs(furthestDist - distance) * 2;

        var rScalar = .01 * Math.abs(distance);
        var bScalar = .01 * Math.abs(distance);

        console.log('increaseRed', shouldIncreaseRed);
        console.log('increaseBlue', shouldIncreaseBlue);
        r = shouldIncreaseRed ? r + rScalar: r - rScalar;
        b = shouldIncreaseBlue ? b + bScalar: b - bScalar;

        r = bound(r, 50, 255);
        b = bound(b, 50, 255);

        p.ellipse(EarthX, EarthY, 5, 5);
        p.ellipse(VenusX, VenusY, 5, 5);
        p.line(EarthX, EarthY, VenusX, VenusY);
      }
      earthRotation = earthRotation + earthIncrementer;
      venusRotation = venusRotation + venusIncrementer;
      counter++;
    } else {
      p.noLoop();
    }
  }
}

export default petals;
