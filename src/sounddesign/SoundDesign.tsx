/** @jsxRuntime classic */
/** @jsx jsx */
import { Circle, Layer, Line, Stage } from "react-konva";
import { jsx, css } from "@emotion/react";
import { useElementSize } from "@mantine/hooks";
import { useCallback, useRef, useState } from "react";
import { Node } from "konva/lib/Node";
import Konva from "konva";
import _ from "lodash";
import { Group, Stack, Text } from "@mantine/core";

const fillSizeStyle = css({
  width: "100%",
  height: "100%",
});

const scaledWidth = 6;
const scaledHeight = 1;

export const SoundDesign = () => {
  const [attack, setAttack] = useState(0.25);
  const [decay, setDecay] = useState(0.3);
  const [sustain, setSustain] = useState(0.6);
  const [release, setRelease] = useState(0.5);

  return (
    <Stack css={fillSizeStyle} spacing={0}>
      <EnvelopeEditor
        attack={attack}
        decay={decay}
        sustain={sustain}
        release={release}
        setAttack={setAttack}
        setDecay={setDecay}
        setSustain={setSustain}
        setRelease={setRelease}
      />
      <Group grow>
        <Text align="center">Attack: {attack.toFixed(2)}</Text>
        <Text align="center">Decay: {decay.toFixed(2)}</Text>
        <Text align="center">Sustain: {sustain.toFixed(2)}</Text>
        <Text align="center">Release: {release.toFixed(2)}</Text>
      </Group>
    </Stack>
  );
};

interface EnvelopeEditorProps {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  setAttack: (attack: number) => void;
  setDecay: (decay: number) => void;
  setSustain: (sustain: number) => void;
  setRelease: (release: number) => void;
}

const EnvelopeEditor = (props: EnvelopeEditorProps) => {
  const { ref, width, height } = useElementSize();

  const getAbsoluteXForScaledX = useCallback(
    (scaledX: number): number => {
      return (scaledX / scaledWidth) * width;
    },
    [width]
  );

  const getAbsoluteYForScaledY = useCallback(
    (scaledY: number): number => {
      return (1 - scaledY / scaledHeight) * height;
    },
    [height]
  );

  const getScaledX = useCallback(
    (absoluteX: number): number => {
      return (absoluteX / width) * scaledWidth;
    },
    [width]
  );

  const getScaledY = useCallback(
    (absoluteY: number): number => {
      return (1 - absoluteY / height) * scaledHeight;
    },
    [height]
  );

  const {
    attack,
    decay,
    sustain,
    release,
    setAttack,
    setDecay,
    setSustain,
    setRelease,
  } = props;

  return (
    <div css={fillSizeStyle} ref={ref}>
      <Stage width={width} height={height}>
        <Layer
          // Offset and scale to give canvas some padding
          scale={{ x: 0.95, y: 0.95 }}
          offset={{ x: width / 2, y: height / 2 }}
          position={{ x: width / 2, y: height / 2 }}
        >
          <Line
            points={[
              0,
              height,
              getAbsoluteXForScaledX(attack),
              0,
              getAbsoluteXForScaledX(attack + decay),
              getAbsoluteYForScaledY(sustain),
              getAbsoluteXForScaledX(scaledWidth - release),
              getAbsoluteYForScaledY(sustain),
              width,
              height,
            ]}
            stroke={"darkgray"}
            strokeWidth={4}
            lineCap={"round"}
            listening={false}
            perfectDrawEnabled={false}
          />
          <EditNode
            // Attack edit point
            x={getAbsoluteXForScaledX(attack)}
            y={0}
            onDrag={(x, y, node) => {
              const decayPlusReleaseWidth = getAbsoluteXForScaledX(
                decay + release
              );
              const limitedX = _.clamp(x, 0, width - decayPlusReleaseWidth);
              node.x(limitedX);
              setAttack(getScaledX(limitedX));
              node.y(0);
            }}
          />
          <EditNode
            // Decay edit point
            x={getAbsoluteXForScaledX(attack + decay)}
            y={getAbsoluteYForScaledY(sustain)}
            onDrag={(x, y, node) => {
              const limitedX = _.clamp(
                x,
                getAbsoluteXForScaledX(attack) + 1,
                getAbsoluteXForScaledX(scaledWidth - release) - 1
              );
              node.x(limitedX);
              setDecay(getScaledX(limitedX) - attack);

              const limitedY = _.clamp(y, 0, height);
              node.y(limitedY);
              setSustain(getScaledY(limitedY));
            }}
          />
          <EditNode
            // Release edit point
            x={getAbsoluteXForScaledX(scaledWidth - release)}
            y={getAbsoluteYForScaledY(sustain)}
            onDrag={(x, y, node) => {
              const limitedX = _.clamp(
                x,
                getAbsoluteXForScaledX(attack + decay) + 1,
                width - 1
              );
              node.x(limitedX);
              setRelease(scaledWidth - getScaledX(limitedX));

              const limitedY = _.clamp(y, 0, height);
              node.y(limitedY);
              setSustain(getScaledY(limitedY));
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
};

interface EditNodeProps {
  x: number;
  y: number;
  onDrag: (x: number, y: number, node: Node) => void;
}

const EditNode = (props: EditNodeProps) => {
  const nodeRef = useRef<Konva.Circle>(null);

  return (
    <Circle
      ref={nodeRef}
      x={props.x}
      y={props.y}
      radius={10}
      stroke={"lightblue"}
      strokeWidth={4}
      fill={"white"}
      draggable
      onDragMove={(e) => {
        props.onDrag(e.target.x(), e.target.y(), e.target);
      }}
      shadowForStrokeEnabled={false}
    />
  );
};
