import Oscillator from './Oscillator'

export = OscillatorAction;
export as namespace OscillatorAction;

declare namespace OscillatorAction {
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
