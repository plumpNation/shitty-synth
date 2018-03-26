import redux from 'redux'
import I18n from './I18n'

export = Synth;
export as namespace Synth;

declare namespace Synth {
  type OscillatorType = 'square' | 'round' | 'saw'
  type Wavelength = number
  type Id = number

  type OscillatorChangeEvent = ChangeEvent<HTMLSelectElement>
  type WavelengthChangeEvent = ChangeEvent<HTMLInputElement>

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

  interface WavelengthRangeProps extends ComponentProps {
    value?: Wavelength
    onChange: (event: WavelengthChangeEvent) => void
  }

  interface State {
    id: Id
    oscillatorType?: OscillatorType
    wavelength?: Wavelength
    i18n?: I18n
  }

  interface Props extends State {}
}
