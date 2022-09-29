import { Box, SimpleGrid } from "@mantine/core";
import * as Tone from "tone";
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
    sequence: Array<boolean>(numberOfBeats).fill(false),
  };
});

export const DrumSequencerMantine = () => {
  return (
    <SimpleGrid
      cols={numberOfBeats}
      p={"sm"}
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      {drumTracks.flatMap((track) => {
        return track.sequence.flatMap((isBeatEnabled, beatIndex) => {
          return (
            <Box
              key={track.sound.name + beatIndex}
              sx={{
                width: "100%",
                height: 100,
                background: isBeatEnabled ? "green" : "red",
              }}
            />
          );
        });
      })}
    </SimpleGrid>
  );
};
