export = Synth;
export as namespace Synth;

declare namespace Synth {
  type OscillatorType = 'square' | 'round' | 'saw';
  type WaveLength = number;

  interface SynthProps {
    type?: OscillatorType
  }

  interface OscillatorSelectProps {
    type?: OscillatorType
  }

  interface OscillatorSelectState extends OscillatorSelectProps {}

  interface WaveLengthRangeProps {
    waveLength?: WaveLength
  }

  interface WaveLengthRangeState extends WaveLengthRangeProps {}
}
