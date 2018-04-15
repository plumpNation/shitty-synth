export = Synth;
export as namespace Synth;

declare namespace Synth {
  interface State {
    oscillators: Oscillators.State
  }

  declare namespace Oscillators {
    type State = Oscillator[]
  }

  declare namespace Oscillators {
    type State = Oscillator[]
  }

  declare namespace OscillatorActions {
    interface CreatePayload {
      oscillatorType?: OscillatorType
      frequency?: Oscillator.Frequency
      i18n?: Oscillator.I18n
    }

    interface UpdatePayload {
      id: Oscillator.Id
      oscillatorType?: OscillatorType
      frequency?: Oscillator.Frequency
    }

    interface DestroyPayload {
      id: Oscillator.Id
    }
  }

  declare namespace Oscillator {
    type Frequency = number
    type Id = number

    type ChangeEvent = ChangeEvent<HTMLSelectElement>
    type FrequencyChangeEvent = ChangeEvent<HTMLInputElement>

    interface I18n {
        [index: string]: string;
    }

    interface ComponentProps {
      i18n?: I18n
    }

    interface SelectProps extends ComponentProps {
      value?: Type
      onChange: (event: ChangeEvent) => void
    }

    interface FrequencyRangeProps extends ComponentProps {
      value?: Frequency
      onChange: (event: FrequencyChangeEvent) => void
    }

    interface State {
      id: Id
      oscillatorType?: Type
      frequency?: Frequency
      i18n?: I18n
    }

    interface Props extends State {}

    interface Props {
      type: Type,
      frequency: Synth.Frequency
    }
  }
}
