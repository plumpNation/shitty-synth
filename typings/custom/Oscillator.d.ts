import redux from 'redux'
import I18n from './I18n'

export = Oscillator;
export as namespace Oscillator;

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
