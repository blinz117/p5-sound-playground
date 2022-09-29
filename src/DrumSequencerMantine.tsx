import { Box, SimpleGrid } from "@mantine/core";
import _ from "lodash";
import { useState } from "react";
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

const numberOfBeats = 8;

interface DrumTrack {
  sound: DrumSound;
  beatsToPlay: number[];
}

const toggleBeat = (beats: number[], beatIndex: number): number[] => {
  if (beats.includes(beatIndex)) {
    return _.without(beats, beatIndex);
  } else {
    return beats.concat(beatIndex);
  }
};

export const DrumSequencerMantine = () => {
  const [drumTracks, setDrumTracks] = useState<DrumTrack[]>(
    instruments.map((instrument) => {
      return {
        sound: instrument,
        beatsToPlay: [],
      };
    })
  );

  return (
    <DrumPads
      tracks={drumTracks}
      onBeatToggled={(track, beatIndex) => {
        const newBeats = toggleBeat(track.beatsToPlay, beatIndex);
        const newTracks = drumTracks.map((stateTrack) => {
          if (stateTrack === track) {
            return {
              ...track,
              beatsToPlay: newBeats,
            };
          } else {
            return stateTrack;
          }
        });
        track.sound.play();
        setDrumTracks(newTracks);
      }}
    />
  );
};

interface DrumPadsProps {
  tracks: DrumTrack[];
  onBeatToggled: (track: DrumTrack, beatIndex: number) => void;
}

const DrumPads = (props: DrumPadsProps) => {
  return (
    <SimpleGrid
      cols={numberOfBeats}
      p={"sm"}
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      {props.tracks.flatMap((track) => {
        return _.range(numberOfBeats).flatMap((beatIndex) => {
          const isBeatEnabled = track.beatsToPlay.includes(beatIndex);
          return (
            <Box
              key={track.sound.name + beatIndex}
              sx={{
                width: "100%",
                height: 100,
                background: isBeatEnabled ? "green" : "red",
              }}
              onClick={() => {
                props.onBeatToggled(track, beatIndex);
              }}
            />
          );
        });
      })}
    </SimpleGrid>
  );
};
