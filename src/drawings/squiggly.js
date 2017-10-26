const squiggly = p => {
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(0);
    p.frameRate(30);
  };

  let offset = 0.0;

  p.draw = () => {
    const lineRate = 10;
    const frequency = p.TWO_PI / 50.0;
    const amplitude = window.innerHeight / 2;

    p.stroke(...getRgbValues());

    for (var i = 0; i < window.innerWidth; i++) {
      p.line(
        i * lineRate,
        window.innerHeight / 2,
        i * lineRate,
        window.innerHeight / 2 + p.sin(offset) * amplitude
      );

      offset += frequency;
    }
  };

  const getRgbValues = () => {
    let values = [];

    for (let i = 0; i < 3; i++) {
      values.push(randomRgbValue());
    }

    return values;
  };

  const randomRgbValue = () => {
    return Math.floor(Math.random() * 255);
  };
};

export default squiggly;
