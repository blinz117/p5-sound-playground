import { useEffect, useState } from "react";
import { Group, Select, Stack, Text } from "@mantine/core";
import { EnvelopeEditor } from "./EnvelopeEditor";
import { SimpleKeyboard } from "./SimpleKeyboard";
import * as Tone from "tone";
import { OmniOscillatorType } from "tone/build/esm/source/oscillator/OscillatorInterface";

const envelope = new Tone.AmplitudeEnvelope().toDestination();
const oscillator = new Tone.OmniOscillator().connect(envelope).start();

const supportedOscillatorTypes = [
  { value: "sine", label: "Sine" },
  { value: "square", label: "Square" },
  { value: "sawtooth", label: "Sawtooth" },
  { value: "triangle", label: "Triangle" },
  { value: "fatsine", label: "Fat Sine" },
  { value: "fatsquare", label: "Fat Square" },
  { value: "fatsawtooth", label: "Fat Sawtooth" },
  { value: "fattriangle", label: "Fat Triangle" },
  { value: "fmsine", label: "FM Sine" },
  { value: "amsine", label: "AM Sine" },
  { value: "pwm", label: "PWM" },
];

const toSeconds = (time: Tone.Unit.Time): number => {
  return Tone.Time(time).toSeconds();
};

export const SoundDesign = () => {
  const [attack, setAttack] = useState(toSeconds(envelope.attack));
  const [decay, setDecay] = useState(toSeconds(envelope.decay));
  const [sustain, setSustain] = useState(envelope.sustain);
  const [release, setRelease] = useState(toSeconds(envelope.release));
  const [oscillatorType, setOscillatorType] = useState<string | null>(
    oscillator.type.valueOf()
  );

  useEffect(() => {
    envelope.set({
      attack: attack,
      decay: decay,
      sustain: sustain,
      release: release,
    });
  }, [attack, decay, sustain, release]);

  useEffect(() => {
    console.log(oscillatorType);
    if (oscillatorType !== null) {
      oscillator.type = oscillatorType as OmniOscillatorType;
    }
  }, [oscillatorType]);

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
        <Select
          label="Wave type"
          data={supportedOscillatorTypes}
          value={oscillatorType}
          onChange={setOscillatorType}
        />
      </Group>
      <SimpleKeyboard
        sx={{ width: "100%", height: 200 }}
        onFrequencyUpdated={(frequency) =>
          oscillator.frequency.rampTo(frequency, 0.05)
        }
        onPlayStarted={async (frequency) => {
          await Tone.start();
          oscillator.frequency.value = frequency;
          envelope.triggerAttack();
        }}
        onPlayEnded={() => envelope.triggerRelease()}
      />
    </Stack>
  );
};
