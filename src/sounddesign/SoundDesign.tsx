/** @jsxRuntime classic */
/** @jsx jsx */
import { Layer, Rect, Stage } from "react-konva";
import { jsx, css } from "@emotion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { useElementSize } from "@mantine/hooks";

const fillSizeStyle = css({
  width: "100%",
  height: "100%",
});

export const SoundDesign = () => {
  const { ref, width, height } = useElementSize();

  return (
    <div css={fillSizeStyle} ref={ref}>
      <Stage width={width} height={height}>
        <Layer>
          <Rect x={50} y={50} width={50} height={50} fill={"seagreen"} />
        </Layer>
      </Stage>
    </div>
  );
};
