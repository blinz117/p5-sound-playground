# Professional development demo

This project contains a handful of audio-related demos that I made during professional development time.

## Instruction manual

When the app starts, you will land on a page that lists the various demos that I built. Select a demo to try it out. Once you are done with that demo, press the button at the top of the screen to return to the list of demos.

Here is a description of the demos:

### Slide Keyboard

To use, click anywhere in the "keyboard" area to start playing a sine wave tone. While playing, can slide the cursor across the keyboard, and the tone will slide from one pitch to another.

The goal was to familiarize myself with the p5 library as well as playing with an Oscillator

### Drum Pad

To use, click each different section to play the corresponding drum sound (kick, snare, and hi-hat closed/open).

The goal was to try out some of the built-in synth types to get drum sounds.

### Drum Sequencer

NOTE: This demo is buggy at times...

This is a simple looping drum sequencer with a length of 8 beats and 4 different drum sounds (the same from the Drum Pad demo). Each column represents a beat, and each row represents a different drum sound. To use, click on the gray rectangles to enable the drum sound for the given beat.

Once you have your beat sequence, press the "play" button to start playback from th beginning of the loop. Press the button again to stop the loop and reset back to the beginning.

You can also modify the beat sequence while it is playing (though this is where most of the bugs seem to be hiding, so do so at your own risk!)

### Sound Designer

This demo allows you to do some very basic sound design. Specifically, it allows you to visually define an [ADSR envelope](<https://en.wikipedia.org/wiki/Envelope_(music)>) to control the amplitude of the wave being produced, as well as the type of wave to produce.

To adjust the envelope, click and drag the blue points in the envelope edit area to adjust the attack, decay, sustain, and release values.

To adjust the type of the wave, use the "Wave Type" dropdown to choose different wave types.

To hear the sound, use the keyboard area at the bottom of the screen to play notes. The controls for the keyboard are similar to that of the "Slide Keyboard" demo.

## Details of the professional development work

The primary focus of my professional development time was to learn about Typescript. I tend to learn things well by applying them in practice - i.e. by building things that I am interested in and learning along the way via documentation, experimentations, etc.
