const doubleCircles = (p) => {
  var centerX = 0;
  var centerY = 0;
  var totalDegrees = 360;
  var opacity = 80;
  var radius = 0;
  var r = 200;
  var g = 200;
  var b = 255;

  var initialX;
  var initialY;

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(0);
    centerX = p.width / 2;
    centerY = p.height / 2;
    radius = p.height / 2;
    p.angleMode(p.DEGREES);
  }

  p.draw = function() {
    p.noFill();
    p.stroke(r, g, b, opacity);
    p.beginShape();
    for (var k = 0; k <= 5; k++) {
      for (var i = 0; i <= totalDegrees; i++) {
        var noiseFactor = p.noise((i *k) / 45, p.frameCount / 120);
        var x = centerX + radius * k * p.cos(i) * noiseFactor;
        var y = centerY + radius * k * p.sin(i) * noiseFactor;
        if(i === 0) {
          initialX = x;
          initialY = y;
        }

        if(i === totalDegrees){
          var averageX = (initialX + x) / 2;
          var averageY = (initialY + y) / 2;

          p.curveVertex(averageX, averageY);
        } else {
          p.curveVertex(x, y);
        }
        i = i + 20;
      }
    }
    p.endShape(p.CLOSE);
    opacity -= 0.1;
    radius -= 0.5;
    g -= 0.8;
    r -= 0.3;

    if (radius <= 0) {
      p.noLoop();
    }
  }
}

export default doubleCircles;
