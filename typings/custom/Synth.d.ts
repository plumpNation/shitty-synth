import UIWaveTypeInput from "src/ui/oscillator/UIWaveTypeInput";

export = Synth;
export as namespace Synth;

declare namespace Synth {
  interface I18n {
    [index: string]: string
  }

  // REDUX STATE

  interface State {
    oscillators: Oscillators.State
    transport: Transport.State
    action: string
    payload: any
  }

  declare namespace Midi {
    interface State {
      devices: MidiInput[]
    }
  }

  // END REDUX STATE

  // APPLICATION ENTITIES

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

  // END APPLICATION ENTITIES

  // UI COMPONENTS

  declare namespace UITransport {
    interface State {
      isPlaying: boolean
    }

    interface Props {
      i18n?: I18n
    }
  }

  declare namespace UIOscillator {
    interface Props {
      id?: Oscillator.Id
      type: Oscillator.Type
      frequency: Oscillator.Frequency
      isActive: boolean
      i18n?: I18n
    }
  }

  declare namespace UIFrequencyRangeInput {
    interface Props {
      i18n?: I18n,
      value?: Oscillator.Frequency
      onChange: (event: ChangeEvent<HTMLInputElement>) => void
    }
  }

  declare namespace UIWaveTypeInput {
    interface Props {
      i18n?: I18n,
      value?: Oscillator.Type
      onChange: (event: ChangeEvent<HTMLInputElement>) => void
    }
  }

  declare namespace UIMidi {
    interface Props {
      i18n?: I18n,
      devices: MidiInput[]
    }
  }

  // END UI COMPONENTS
}
