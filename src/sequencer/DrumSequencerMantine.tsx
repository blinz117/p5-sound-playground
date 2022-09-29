import { ActionIcon, Button, Stack } from "@mantine/core";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { FaPlay, FaStop } from "react-icons/fa";
import { Time } from "tone/build/esm/core/type/Units";
import { DrumPads } from "./DrumPads";

type DrumPlayFunction = (time?: Time) => void;

interface DrumSound {
  name: string;
  play: DrumPlayFunction;
}

const kickSynth = new Tone.MembraneSynth().toDestination();
const snareSynth = new Tone.NoiseSynth({
  noise: { type: "white" },
}).toDestination();
const hiHatOpenSynth = new Tone.MetalSynth().toDestination();
const hiHatClosedSynth = new Tone.MetalSynth().toDestination();

const playKick = (time?: Time) => {
  kickSynth.triggerAttackRelease("C0", 0.3, time);
};

const playSnare = (time?: Time) => {
  snareSynth.triggerAttackRelease(0.05, time);
};

const playHiHatClosed = (time?: Time) => {
  hiHatClosedSynth.triggerAttackRelease("C6", 0.01, time);
};

const playHiHatOpen = (time?: Time) => {
  hiHatOpenSynth.triggerAttackRelease("C6", 0.5, time);
};

const instruments: DrumSound[] = [
  { name: "kick", play: playKick },
  { name: "snare", play: playSnare },
  { name: "hi hat (open)", play: playHiHatOpen },
  { name: "hi hat (closed)", play: playHiHatClosed },
];

export const numberOfBeats = 8;

export interface DrumTrack {
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

const getPartForTracks = (tracks: DrumTrack[]): Tone.Part => {
  const notes = tracks.flatMap((track) => {
    return track.beatsToPlay.flatMap((beatIndex) => {
      const timeNotation = "0:" + beatIndex;
      return { time: timeNotation, playFunction: track.sound.play };
    });
  });
  console.log(notes);
  return new Tone.Part((time, value) => {
    value.playFunction(time);
  }, notes);
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

  const part = useRef<Tone.Part | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [currentBeat, setCurrentBeat] = useState(0);

  useEffect(() => {
    part.current?.stop();
    part.current?.dispose();
    const newPart = getPartForTracks(drumTracks);
    part.current = newPart;
    newPart.start("0:0");
  }, [drumTracks]);

  useEffect(() => {
    Tone.Transport.loop = true;
    Tone.Transport.loopStart = "0:0";
    Tone.Transport.loopEnd = "0:8";
    Tone.Transport.timeSignature = 8;

    Tone.Transport.scheduleRepeat(
      () => {
        const currentBeatTime = Tone.Time(Tone.Transport.position).quantize(
          "4n"
        );
        const beatNotation = Tone.Time(currentBeatTime).toBarsBeatsSixteenths();
        const parsedTime = beatNotation.split(":");
        const beatValue = parsedTime[1];
        setCurrentBeat(parseInt(beatValue));
      },
      "4n",
      "0:0"
    );

    return () => {
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, []);

  return (
    <Stack>
      <DrumPads
        tracks={drumTracks}
        currentBeat={isPlaying ? currentBeat : null}
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
          setDrumTracks(newTracks);
        }}
      />
      <ActionIcon
        variant="filled"
        onClick={() => {
          if (isPlaying) {
            Tone.Transport.stop();
            setIsPlaying(false);
          } else {
            Tone.start();
            Tone.Transport.start();
            setIsPlaying(true);
          }
        }}
      >
        {isPlaying ? <FaStop /> : <FaPlay />}
      </ActionIcon>
    </Stack>
  );
};
