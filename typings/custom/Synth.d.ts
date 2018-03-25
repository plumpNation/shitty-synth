import redux from 'redux'
import I18n from './I18n'

export = Synth;
export as namespace Synth;

declare namespace Synth {
  type OscillatorType = 'square' | 'round' | 'saw'
  type Wavelength = number;

  interface Props {
    oscillatorType?: OscillatorType,
    wavelength?: Wavelength,
    i18n: I18n
  }

  interface OscillatorSelectProps extends Props {
    value?: OscillatorType
  }

  interface WavelengthRangeProps extends Props {
    value?: Wavelength
  }

  interface OscillatorSelectState extends OscillatorSelectProps {}
  interface WavelengthRangeState extends WavelengthRangeProps {}

  interface State extends Props {}
}
