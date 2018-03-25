import redux from 'redux'
import I18n from './I18n'

export = Synth;
export as namespace Synth;

declare namespace Synth {
  type OscillatorType = 'square' | 'round' | 'saw'
  type Wavelength = number;

  interface I18n {
      [index: string]: string;
  }

  interface ComponentProps {
    i18n?: I18n
  }

  interface OscillatorSelectProps extends ComponentProps {
    value?: OscillatorType,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  }

  interface WavelengthRangeProps extends ComponentProps {
    value?: Wavelength,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
  }

  interface State {
    oscillatorType?: OscillatorType,
    wavelength?: Wavelength,
    i18n?: I18n
  }

  interface Props extends State {}
}
