import { Box, SimpleGrid } from "@mantine/core";
import _ from "lodash";
import { DrumTrack, numberOfBeats } from "./DrumSequencerMantine";

interface DrumPadsProps {
  tracks: DrumTrack[];
  onBeatToggled: (track: DrumTrack, beatIndex: number) => void;
}
export const DrumPads = (props: DrumPadsProps) => {
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
