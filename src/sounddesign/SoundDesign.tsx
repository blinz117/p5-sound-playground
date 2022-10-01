import { useState } from "react";
import { Group, Stack, Text } from "@mantine/core";
import { EnvelopeEditor } from "./EnvelopeEditor";
import { SimpleKeyboard } from "./SimpleKeyboard";
import * as Tone from "tone";

const oscillator = new Tone.OmniOscillator().toDestination();

export const SoundDesign = () => {
  const [attack, setAttack] = useState(0.25);
  const [decay, setDecay] = useState(0.3);
  const [sustain, setSustain] = useState(0.6);
  const [release, setRelease] = useState(0.5);

  return (
    <Stack sx={{ height: "100%" }} spacing={0}>
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
      <SimpleKeyboard
        sx={{ width: "100%", height: 200 }}
        oscillator={oscillator}
      />
    </Stack>
  );
};
