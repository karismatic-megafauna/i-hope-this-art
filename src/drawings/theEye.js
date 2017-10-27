const theEye = (p) => {
  var centerX = 0;
  var centerY = 0;
  var radius = 0;
  var totalDegrees = 361;

  var opacity = 90;
  var r = 255;
  var g = 255;
  var b = 255;

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
    for (var i = 0; i <= totalDegrees; i++) {
      var x = centerX + radius * p.cos(i);
      var y = centerY + radius * p.sin(i);
      p.curveVertex(x, y);
    }
    p.endShape(p.CLOSE);
    radius -= 0.5;
    opacity -= 0.1;
    g -= 0.8;
    r -= 0.3;

    if (radius <= 0) {
      p.noLoop();
    }
  }
}

export default theEye;
