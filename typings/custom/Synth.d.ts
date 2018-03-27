import redux from 'redux'
import I18n from './I18n'

export = Synth;
export as namespace Synth;

declare namespace Synth {
  type Frequency = number
  type Id = number

  type OscillatorChangeEvent = ChangeEvent<HTMLSelectElement>
  type FrequencyChangeEvent = ChangeEvent<HTMLInputElement>

  interface I18n {
      [index: string]: string;
  }

  interface ComponentProps {
    i18n?: I18n
  }

  interface OscillatorSelectProps extends ComponentProps {
    value?: OscillatorType
    onChange: (event: OscillatorChangeEvent) => void
  }

  interface FrequencyRangeProps extends ComponentProps {
    value?: Frequency
    onChange: (event: FrequencyChangeEvent) => void
  }

  interface State {
    id: Id
    oscillatorType?: OscillatorType
    frequency?: Frequency
    i18n?: I18n
  }

  interface Props extends State {}

  interface OscillatorProps {
    type: OscillatorType,
    frequency: Synth.Frequency
  }
}
