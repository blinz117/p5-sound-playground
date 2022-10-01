import { Box, Button, Group, Sx, useInputProps } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import _ from "lodash";
import { Layer, Rect, Stage, Text } from "react-konva";
import { Oscillator } from "tone";

const minNote = 60;
const maxNote = 72;
const noteRangeSize = maxNote - minNote;

interface SimpleKeyboardProps {
  sx?: Sx;
  oscillator?: Oscillator;
}

export const SimpleKeyboard = (props: SimpleKeyboardProps) => {
  const { ref, width, height } = useElementSize();

  return (
    <Box sx={props.sx} ref={ref}>
      <Stage width={width} height={height}>
        <Layer>
          {_.range(minNote, maxNote + 1).flatMap((note, index) => {
            const noteWidth = width / noteRangeSize;
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
              />,
            ];
          })}
        </Layer>
      </Stage>
    </Box>
  );
};
