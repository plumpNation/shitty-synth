import Synth from './Synth'

export = SynthAction;
export as namespace SynthAction;

declare namespace SynthAction {
  interface CreatePayload {
    oscillatorType?: OscillatorType
    wavelength?: Synth.Wavelength
    i18n?: Synth.I18n
  }

  interface UpdatePayload {
    id: Synth.Id
    oscillatorType?: OscillatorType
    wavelength?: Synth.Wavelength
  }

  interface DeletePayload {
    id: Synth.Id
  }
}
