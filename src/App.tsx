import { DemoChooser } from "./DemoChooser";
import { DrumPad } from "./DrumPad";
import { DrumSequencerMantine } from "./sequencer/DrumSequencerMantine";
import { DrumSequencerP5 } from "./sequencer/DrumSequencerP5";
import { SlideKeyboard } from "./SlideKeyboard";

export default function App() {
  return (
    <div className="App">
      <DemoChooser />
    </div>
  );
}
