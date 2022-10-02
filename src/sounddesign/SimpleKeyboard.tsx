import { Box, Button, Group, Sx, useInputProps } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import _ from "lodash";
import { useMemo } from "react";
import { Layer, Rect, Stage, Text } from "react-konva";
import * as Tone from "tone";

const minNote = 60;
const maxNote = 72;
const noteRangeSize = maxNote - minNote;

const noteToFrequency = (note: number) => {
  return Tone.Frequency(note, "midi").toFrequency();
};

interface SimpleKeyboardProps {
  sx?: Sx;
  onFrequencyUpdated: (frequency: number) => void;
  onPlayStarted: (frequency: number) => void;
  onPlayEnded: () => void;
}

export const SimpleKeyboard = (props: SimpleKeyboardProps) => {
  const { ref, width, height } = useElementSize();

  const noteWidth = useMemo(() => {
    return width / noteRangeSize;
  }, [width]);

  return (
    <Box sx={props.sx} ref={ref}>
      <Stage width={width} height={height}>
        <Layer
          onMouseDown={(e) => {
            const note = _.floor((e.evt.x / width) * noteRangeSize) + minNote;
            props.onPlayStarted(noteToFrequency(note));
          }}
          onMouseMove={(e) => {
            if (!e.evt.buttons) return;
            const note = _.floor((e.evt.x / width) * noteRangeSize) + minNote;
            props.onFrequencyUpdated(noteToFrequency(note));
          }}
          onMouseUp={() => {
            props.onPlayEnded();
          }}
        >
          {_.range(minNote, maxNote + 1).flatMap((note, index) => {
            return [
              <Rect
                key={note + "rect"}
                x={noteWidth * index}
                y={0}
                width={noteWidth}
                height={height}
                stroke={"black"}
              />,
              <Text
                key={note + "text"}
                x={noteWidth * (index + 0.5)}
                y={height / 2}
                text={note.toString()}
                listening={false}
              />,
            ];
          })}
        </Layer>
      </Stage>
    </Box>
  );
};
