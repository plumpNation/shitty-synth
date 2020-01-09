export = Synth;
export as namespace Synth;

declare namespace Synth {
  interface I18n {
    [index: string]: string
  }

  // REDUX STATE

  interface State {
    oscillators: Oscillators.State
    filters: Filters.State
    transport: Transport.State
    action: string
    payload: any
  }

  declare namespace Midi {
    interface State {
      devices: MidiInput[]
    }
  }

  // END REDUX STATE

  // APPLICATION ENTITIES

  declare namespace Oscillators {
    type State = Oscillator[]
  }

  declare namespace Oscillator {
    type Id = number
    type Frequency = number
    type Shape = OscillatorType
    type Detune = number

    type InputIndex = number | undefined
    type OutputIndex = number | undefined

    interface Props {
      shape: Shape
      audioContext: AudioContext
      frequency: Frequency
      connection?: Connection
      detune?: Detune
      id?: Id
      i18n?: I18n
    }

    interface Connection {
      output: AudioNode,
      inputIndex: InputIndex,
      outputIndex: OutputIndex
    }
  }

  declare namespace Connections {
    type State = Connection[]
  }

  declare namespace Filters {
    type State = Filter[]
  }

  declare namespace Filter {
    type Id = number
    type Frequency = number // value in hertz
    type Type = BiquadFilterType
    type Quality = number
    type Detune = number
    type Gain = number

    interface Props {
      type: Type
      audioContext: AudioContext
      isActive: boolean
      id?: Id
      frequency?: Frequency
      gain?: Gain
      quality?: Quality
      detune?: Detune
      i18n?: I18n
      onChange?: (event) => void
    }
  }

  // END APPLICATION ENTITIES

  //  COMPONENTS

  declare namespace Transport {
    interface State {
      isPlaying: boolean
    }

    interface Props {
      i18n?: I18n
    }
  }

  declare interface FilterState {
    id?: Id;
    type?: Filter.Type;
    frequency?: Filter.Frequency;
    gain?: Filter.Gain;
    detune?: Filter.Detune;
    quality?: Filter.Quality;
    isActive?: boolean;
  }

  declare namespace Oscillator {
    interface Props {
      type: Oscillator.Shape
      frequency: Oscillator.Frequency
      isActive: boolean
      id?: Oscillator.Id
      detune?: Oscillator.Detune
      i18n?: I18n
    }

    interface State {
      id?: Id
      shape?: Oscillator.Shape
      frequency?: Oscillator.Frequency
      isActive?: boolean
    }
  }

  declare interface FilterInputProps {
    type: Filter.Type;
    frequency: Filter.Frequency;
    isActive: boolean
    id?: Filter.Id
    detune?: Filter.Detune
    quality?: Filter.Quality
    gain?: Filter.Gain
    i18n?: I18n,
    onChange?: (event) => void
  }

  declare interface SliderInputProps {
    min: number;
    max: number;
    name?: string;
    value?: number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  }

  declare interface FrequencyRangeInputProps {
    i18n?: I18n;
    value?: Oscillator.Frequency;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  }

  declare interface WaveShapeInputProps {
    i18n?: I18n;
    value?: Oscillator.Shape;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  }

  declare interface MidiInputsProps {
    i18n?: I18n;
    devices: MidiInput[];
  }

  // END  COMPONENTS
}
