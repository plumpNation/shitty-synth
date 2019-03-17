import UIWaveTypeInput from "src/ui/oscillator/UIWaveTypeInput";

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
    type Type = OscillatorType
    type Detune = number

    interface Props {
      type: Type
      audioContext: AudioContext
      frequency: Frequency
      detune?: Detune
      id?: Id
      i18n?: I18n
    }
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
      id?: Id
      frequency?: Frequency
      gain?: Gain
      quality?: Quality
      detune?: Detune
      i18n?: I18n
    }
  }

  // END APPLICATION ENTITIES

  // UI COMPONENTS

  declare namespace UITransport {
    interface State {
      isPlaying: boolean
    }

    interface Props {
      i18n?: I18n
    }
  }

  declare namespace UIOscillator {
    interface Props {
      type: Oscillator.Type
      frequency: Oscillator.Frequency
      isActive: boolean
      id?: Oscillator.Id
      detune?: Oscillator.Detune
      i18n?: I18n
    }
  }

  declare namespace UIFilter {
    interface Props {
      type: Filter.Type
      frequency: Filter.Frequency
      isActive: boolean
      id?: Filter.Id
      detune?: Filter.Detune
      quality?: Filter.Quality
      gain?: Filter.Gain
      i18n?: I18n,
      onChange?: (event) => void
    }

    interface State {
      id?: Id
      type?: Filter.Type
      frequency?: Filter.Frequency
      gain?: Filter.Gain
      detune?: Filter.Detune
      quality?: Filter.Quality
      isActive?: boolean
    }
  }

  declare namespace UIFrequencyRangeInput {
    interface Props {
      i18n?: I18n,
      value?: Oscillator.Frequency
      onChange: (event: ChangeEvent<HTMLInputElement>) => void
    }
  }

  declare namespace UIWaveTypeInput {
    interface Props {
      i18n?: I18n,
      value?: Oscillator.Type
      onChange: (event: ChangeEvent<HTMLInputElement>) => void
    }
  }

  declare namespace UIMidi {
    interface Props {
      i18n?: I18n,
      devices: MidiInput[]
    }
  }

  // END UI COMPONENTS
}
