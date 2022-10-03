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

## Details of the professional development process

### Goals

The primary focus of my professional development time was to learn about Typescript. I tend to learn things well by applying them in practice - i.e. by building things that I am interested in and learning along the way via documentation, experimentations, etc.

I also wanted to learn about the p5 library since it seems to be focused around building interactive demos and art.

I also wanted to continue using React in general to continue to maintain that skill.

#### Changes to goals along the way

I initially wanted to learn about the p5.sound library to produce audio. However, I ran into a lot of issues getting it to play nicely with other tooling. I decided to pivot to using Tone.js instead though, which integrated much more nicely, and is also what p5.sound uses behind-the-scenes anyway.

For the "Sound Designer" demo, I also wanted to add some interactivity with drag-and-drop controls on my canvas sketch. I didn't see a clean, simple way to do this with p5, so I decided to pivot to using the Konva library, which has built-in drag-and-drop support, as well as working with React more natively.

### Non-goals

I didn't really want to focus on UI design, except where it helped accomplish the main goals. Thus, I didn't spend a lot of effort to make the UI attractive or even user-friendly.

I also wasn't aim for clean overall architecture, except in cases where it might affect the main goal. Code is not necessarily how I would organize it for long-term usage or support.

I also was not aiming to be bug-free, at least in terms of application logic. I did want to see areas where Typescript could help avoid certain kinds of bugs (for example, accidentally misspellings or type mis-matches), but I wasn't as concerned if there was an issue with, say, timing issues in the drum sequencer.
