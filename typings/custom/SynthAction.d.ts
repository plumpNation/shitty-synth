import Synth from './Synth'

export = SynthAction;
export as namespace SynthAction;

declare namespace SynthAction {
  interface CreatePayload {
    oscillatorType?: OscillatorType
    frequency?: Synth.Frequency
    i18n?: Synth.I18n
  }

  interface UpdatePayload {
    id: Synth.Id
    oscillatorType?: OscillatorType
    frequency?: Synth.Frequency
  }

  interface DeletePayload {
    id: Synth.Id
  }
}
