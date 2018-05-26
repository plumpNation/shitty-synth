export = Synth;
export as namespace Synth;

declare namespace Synth {
  interface I18n {
    [index: string]: string
  }

  interface State {
    oscillators: Oscillators.State
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

  declare namespace OscillatorModule {
    type Id = Oscillator.Id
    type Type = Oscillator.Type
    type Frequency = Oscillator.Frequency

    type ChangeEvent = ChangeEvent<HTMLSelectElement>
    type FrequencyChangeEvent = ChangeEvent<HTMLInputElement>

    interface Props {
      i18n?: I18n
    }

    interface SelectProps extends Props {
      value?: Type
      onChange: (event: ChangeEvent) => void
    }

    interface FrequencyRangeProps extends Props {
      value?: Frequency
      onChange: (event: FrequencyChangeEvent) => void
    }

    interface State {
      id?: Id
      type: Type
      frequency: Frequency
      i18n?: I18n
    }
  }
}
