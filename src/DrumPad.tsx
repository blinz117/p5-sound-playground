import { ReactP5Wrapper, Sketch } from "react-p5-wrapper";
import * as Tone from "tone";
import _ from "lodash";

interface DrumSound {
  name: string;
  play: () => void;
}

const kickSynth = new Tone.MembraneSynth().toDestination();
const snareSynth = new Tone.NoiseSynth({
  noise: { type: "white" },
}).toDestination();
const cymbalSynth = new Tone.MetalSynth().toDestination();

const playKick = () => {
  kickSynth.triggerAttackRelease("C0", 0.3);
};

const playSnare = () => {
  snareSynth.triggerAttackRelease(0.05);
};

const playHiHatClosed = () => {
  cymbalSynth.triggerAttackRelease("C6", 0.01);
};

const playHiHatOpen = () => {
  cymbalSynth.triggerAttackRelease("C6", 0.5);
};

const instruments: DrumSound[] = [
  { name: "kick", play: playKick },
  { name: "snare", play: playSnare },
  { name: "hi hat (open)", play: playHiHatOpen },
  { name: "hi hat (closed)", play: playHiHatClosed },
];

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.style("display", "block");
    canvas.mousePressed(async (event) => {
      await Tone.start();
      triggerSound();

      return false;
    });
  };

  p5.draw = () => {
    const instrumentWidth = p5.windowWidth / instruments.length;

    instruments.forEach((instrument, index) => {
      const dividerX = (index + 1) * instrumentWidth;
      p5.line(dividerX, 0, dividerX, p5.height);
      p5.textAlign("center");
      p5.text(instrument.name, dividerX - instrumentWidth / 2, p5.height / 2);
    });
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  const triggerSound = () => {
    const instrumentIndex = p5.floor(
      p5.map(p5.mouseX, 0, p5.width, 0, instruments.length, true)
    );
    instruments[instrumentIndex].play();
  };
};

export const DrumPad = () => {
  return <ReactP5Wrapper sketch={sketch} />;
};
