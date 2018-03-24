export = Synth;
export as namespace Synth;

declare namespace Synth {
  type OscillatorType = 'square' | 'round' | 'saw';
  type WaveLength = number;

  interface SynthProps {
    oscillatorType?: OscillatorType,
    waveLength?: WaveLength
  }

  interface OscillatorSelectProps {
    value?: OscillatorType
  }

  interface OscillatorSelectState extends OscillatorSelectProps {}

  interface WaveLengthRangeProps {
    value?: WaveLength
  }

  interface WaveLengthRangeState extends WaveLengthRangeProps {}
}
