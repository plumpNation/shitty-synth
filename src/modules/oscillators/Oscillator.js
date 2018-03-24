export default Oscillator;

class Oscillator {
    constructor(type) {
        if (!available) {
            throw new Error('AudioContext unavailable in this browser');
        }

        this.type = type;
    }
}

function create(scope) {
    const audio_context = new scope.AudioContext();
    const oscillator = audio_context.createOscillator();

    return oscillator;
}

function available(scope) {
    return !!scope.AudioContext;
}
