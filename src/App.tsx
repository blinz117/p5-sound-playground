import { ReactP5Wrapper, Sketch } from "react-p5-wrapper";

const minNote = 20;
const maxNote = 80;

const sketch: Sketch = (p5) => {
  let note = 60;

  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.style("display", "block");
  };

  p5.draw = () => {
    p5.background(220);
    note = p5.map(p5.mouseX, 0, p5.width, minNote, maxNote);
    p5.text("Current note is " + note, 20, 20);
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  const startNote = () => {};
};

export default function App() {
  return <ReactP5Wrapper sketch={sketch} />;
}
