import _ from "lodash";
import { Sketch, ReactP5Wrapper } from "react-p5-wrapper";
import * as Tone from "tone";
import { Sequence } from "tone";
import { Tuple } from "./Tuple";

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

// Is there a better way to do this?
type BeatCount = 8;
const numberOfBeats: BeatCount = 8;

type DrumSequence = Tuple<boolean, BeatCount>;

interface DrumTrack {
  sound: DrumSound;
  sequence: DrumSequence;
}

const drumTracks = instruments.map((instrument) => {
  return {
    sound: instrument,
    sequence: Array<boolean>(numberOfBeats),
  };
});

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.style("display", "block");
    canvas.mousePressed(async (event) => {
      await Tone.start();
      //   triggerSound();

      return false;
    });
  };

  p5.draw = () => {
    const instrumentHeight = p5.windowHeight / instruments.length;
    const beatWidth = p5.windowWidth / numberOfBeats;

    drumTracks.forEach((track, index) => {
      const dividerY = (index + 1) * instrumentHeight;
      p5.line(0, dividerY, p5.width, dividerY);
      p5.text(track.sound.name, 10, dividerY - 10);
    });

    _.range(numberOfBeats).forEach((beat) => {
      const dividerX = (beat + 1) * beatWidth;
      p5.line(dividerX, 0, dividerX, p5.height);
    });
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
};

export const DrumSequencerP5 = () => {
  return <ReactP5Wrapper sketch={sketch} />;
};
