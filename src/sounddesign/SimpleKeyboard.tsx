import { Box, Button, Group, Sx, useInputProps } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import _ from "lodash";
import { useMemo } from "react";
import { Layer, Rect, Stage, Text } from "react-konva";
import * as Tone from "tone";

const minNote = 60;
const maxNote = 72;
const noteRangeSize = maxNote - minNote;

type AnyOscillator =
  | Tone.Oscillator
  | Tone.PWMOscillator
  | Tone.PulseOscillator
  | Tone.FatOscillator
  | Tone.AMOscillator
  | Tone.FMOscillator;

const noteToFrequency = (note: number) => {
  return Tone.Frequency(note, "midi").toFrequency();
};

interface SimpleKeyboardProps {
  sx?: Sx;
  oscillator?: Tone.OmniOscillator<AnyOscillator> | AnyOscillator;
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
          onMouseDown={async (e) => {
            await Tone.start();
            const note = _.floor((e.evt.x / width) * noteRangeSize) + minNote;
            if (props.oscillator) {
              props.oscillator.frequency.value = noteToFrequency(note);
              props.oscillator.start();
            }
          }}
          onMouseMove={(e) => {
            const note = _.floor((e.evt.x / width) * noteRangeSize) + minNote;
            props.oscillator?.frequency?.rampTo(noteToFrequency(note), 0.05);
          }}
          onMouseUp={() => {
            props.oscillator?.stop();
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
