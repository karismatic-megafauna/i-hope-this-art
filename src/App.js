import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import './App.css';

function matrix(p) {
  var yCord = 0;
  var rectW = 30;
  var r = 100;
  var g = 200;
  var b = 100;
  var largestY = 0;

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(120);
  };

  p.draw = function() {
    var columns = p.width / rectW;
    p.fill(r, g ,b);
    for(var i = 0 ; i <= columns; i++) {
      var distFromMiddle = p.abs(i - (columns / 2));
      var noiseFactor = p.noise(i / 75, p.frameCount / 120);
      var x = i * (rectW + rectW) * noiseFactor;
      var y = yCord * noiseFactor;
      if (largestY < y) {
        largestY = y;
      }
      p.rect(x, y, rectW, 20);
    }
    yCord = yCord + 8;

    if( largestY >= p.height) {
      yCord = 0;
      largestY = 0;
      r = p.random(255);
      g = p.random(255);
      b = p.random(255);
    }
  };
};

function thing(p) {
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

function flower(p) {
  var centerX = 0;
  var centerY = 0;
  var radius = 0;
  var totalDegrees = 360;
  var opacity = 80;
  var r = 200;
  var g = 200;
  var b = 255;

  var initialX ;
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
    for (var i = 0; i <= totalDegrees; i++) {
      var noiseFactor = p.noise(i / 45, p.frameCount / 120);
      var x = centerX + radius * p.cos(i) * noiseFactor;
      var y = centerY + radius * p.sin(i) * noiseFactor;
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


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sketches: [ matrix, flower, thing ],
      active: flower,
    }
  }

  switchSketch = () => {
    const current = this.state.active;
    const nextSketchs = this.state.sketches.filter((sketch) => {
      return sketch.name !== current.name;
    });
    const newSketchs = nextSketchs.concat(current);
    this.setState({
      active: nextSketchs[0],
      sketches: newSketchs,
    });
  }

  render() {
    return (
      <div className="App" onClick={this.switchSketch}>
        <P5Wrapper sketch={this.state.active} />
      </div>
    );
  }
}

export default App;
