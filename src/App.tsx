import { ReactP5Wrapper, Sketch } from "react-p5-wrapper";
import * as Tone from "tone";
import _ from "lodash"

const minNote = 50;
const maxNote = 70;

const oscillator = new Tone.Oscillator().toDestination()

const sketch: Sketch = (p5) => {
  let note = 60;

  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.style("display", "block");
  };

  p5.draw = () => {
    p5.background(220);

    _.range(minNote + 1, maxNote + 1).forEach((note) => {
      const noteEdgeX = p5.map(note, minNote, maxNote + 1, 0, p5.width)
      p5.line(noteEdgeX, 0, noteEdgeX, p5.height)
    })

    note = p5.map(p5.mouseX, 0, p5.width, minNote, maxNote + 1, true);
    note = p5.floor(note)
    p5.text("Current note is " + note, 20, 20);
    const newFrequency = Tone.Frequency(note, "midi").toFrequency()
    oscillator.frequency.rampTo(newFrequency, 0.05)
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.mousePressed = () => {
    Tone.start()
    console.log("Starting oscillator")
    if (oscillator.state === "stopped") {
      oscillator.start()
    }
    return false
  };

  p5.mouseReleased = () => {
    oscillator.stop()
  }
};

export default function App() {
  return <ReactP5Wrapper sketch={sketch} />;
}
