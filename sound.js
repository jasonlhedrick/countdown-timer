const AudioContext = window.AudioContext || window.webkitAudioContext;

function createAudioObject() {
    const audioCtx = new AudioContext();
    const oscillatorNode = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    const newAudioObject = {
        audioCtx: audioCtx,
        oscillatorNode: oscillatorNode,
        gainNode: gainNode,
    };

    return newAudioObject;
}