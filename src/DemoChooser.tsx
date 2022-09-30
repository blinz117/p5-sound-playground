import { Button, Container, Stack, Title } from "@mantine/core";
import { useState } from "react";
import { DrumPad } from "./DrumPad";
import { DrumSequencerMantine } from "./sequencer/DrumSequencerMantine";
import { SlideKeyboard } from "./SlideKeyboard";
import { SoundDesign } from "./sounddesign/SoundDesign";

interface Demo {
  demoName: string;
  component: () => JSX.Element;
}

const demoList: Demo[] = [
  { demoName: "Slide keyboard", component: () => <SlideKeyboard /> },
  { demoName: "Drum Pad", component: () => <DrumPad /> },
  { demoName: "Drum Sequencer", component: () => <DrumSequencerMantine /> },
  { demoName: "Sound Designer", component: () => <SoundDesign /> },
];

export const DemoChooser = () => {
  const [currentDemo, setCurrentDemo] = useState<Demo | null>(null);

  if (currentDemo === null) {
    return (
      <Container>
        <Stack>
          <Title>Choose a demo from the list below</Title>
          {demoList.map((demo) => {
            return (
              <Button key={demo.demoName} onClick={() => setCurrentDemo(demo)}>
                {demo.demoName}
              </Button>
            );
          })}
        </Stack>
      </Container>
    );
  } else {
    return (
      <Stack sx={{ width: "100%", height: "100%" }}>
        <Button
          onClick={() => {
            setCurrentDemo(null);
          }}
        >
          Back to demo list
        </Button>
        {currentDemo?.component()}
      </Stack>
    );
  }
};
