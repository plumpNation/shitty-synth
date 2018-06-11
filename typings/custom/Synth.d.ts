export = Synth;
export as namespace Synth;

declare namespace Synth {
  interface I18n {
    [index: string]: string
  }

  interface State {
    oscillators: Oscillators.State
    transport: Transport.State
    action: string
    payload: any
  }

  declare namespace Oscillators {
    type State = Oscillator[]
  }

  declare namespace Oscillator {
    type Frequency = number
    type Id = number
    type Type = 'sine'|'square'|'sawtooth'|'triangle'

    interface Props {
      id?: Id
      type: Type
      frequency: Frequency
      i18n?: I18n
    }

    interface Props {
      type: Type,
      frequency: Synth.Frequency
    }
  }

  declare namespace Midi {
    interface State {
      devices: MidiInput[]
    }
  }

  declare namespace Transport {
    interface State {
      isPlaying: boolean
    }

    interface Props {
      i18n?: I18n
    }
  }

  declare namespace OscillatorModule {
    type Id = Oscillator.Id
    type Type = Oscillator.Type
    type Frequency = Oscillator.Frequency

    type ChangeEvent = ChangeEvent<HTMLSelectElement>
    type FrequencyChangeEvent = ChangeEvent<HTMLInputElement>

    interface SelectProps extends Props {
      i18n?: I18n,
      value?: Type
      onChange: (event: ChangeEvent) => void
    }

    interface FrequencyRangeProps extends Props {
      i18n?: I18n,
      value?: Frequency
      onChange: (event: FrequencyChangeEvent) => void
    }

    interface Props {
      id?: Id
      type: Type
      frequency: Frequency
      isActive: boolean
      i18n?: I18n
    }
  }
}
