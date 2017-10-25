import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import './App.css';

function sketch (p) {
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

class App extends Component {
  render() {
    return (
      <div className="App">
        <P5Wrapper sketch={sketch} />
      </div>
    );
  }
}

export default App;
