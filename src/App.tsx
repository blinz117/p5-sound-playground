import { ReactP5Wrapper, Sketch } from "react-p5-wrapper";
import * as Tone from "tone";
import _ from "lodash"

const minNote = 50;
const maxNote = 70;

const oscillator = new Tone.Oscillator().toDestination()

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.style("display", "block");
  };

  p5.draw = () => {
    p5.background(220);

    const noteWidth = p5.width / (maxNote - minNote)
    _.range(minNote, maxNote + 1).forEach((note) => {
      const noteEdgeX = p5.map(note, minNote, maxNote + 1, 0, p5.width)
      p5.line(noteEdgeX, 0, noteEdgeX, p5.height)

      p5.textAlign("center")
      const noteName = Tone.Frequency(note, "midi").toNote()
      p5.text(noteName, noteEdgeX + noteWidth / 2, p5.height / 2)
    })

    
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  p5.mousePressed = async () => {
    await Tone.start()
    // TODO: Figure out why this fires twice
    console.log("Starting oscillator")

    const note = getNoteAtMousePosition()
    const newFrequency = noteToFrequency(note)
    oscillator.frequency.value = newFrequency

    if (oscillator.state === "stopped") {
      oscillator.start()
    }
    return false
  };

  p5.mouseDragged = () => {
    const note = getNoteAtMousePosition()
    const newFrequency = noteToFrequency(note)
    oscillator.frequency.rampTo(newFrequency, 0.05)
  }

  p5.mouseReleased = () => {
    oscillator.stop()
  }

  const getNoteAtMousePosition = () => {
    const newNote = p5.map(p5.mouseX, 0, p5.width, minNote, maxNote + 1, true);
    return p5.floor(newNote)
  }

  const noteToFrequency = (note: number) => {
    return Tone.Frequency(note, "midi").toFrequency()
  }
};

export default function App() {
  return <ReactP5Wrapper sketch={sketch} />;
}
