const minutesDiv = document.getElementById('minutes');
const secondsDiv = document.getElementById('seconds');

let audioObject;
let minutes = 20;
let seconds =  0;
let countTimer = 0;
let timerStarted = false;

function updateTimerDivs() {
    minutesDiv.innerText = minutes;
    secondsDiv.innerText = seconds;
}

function toggleEditable() {
    minutesDiv.contentEditable === 'true' ?
    minutesDiv.contentEditable = 'false'
    :
    minutesDiv.contentEditable = 'true';

    secondsDiv.contentEditable === 'true' ?
    secondsDiv.contentEditable = 'false'
    :
    secondsDiv.contentEditable = 'true';
}

function countdown() {
    if (minutes < 0) minutes = 0;
    if (seconds < 0) seconds = 0;
    if (minutes <= 0 && seconds <= 0) {
        console.log('done');
        timerStarted = false;
        toggleEditable();
        clearInterval(countTimer);
    }
    if (minutes > 0 && seconds <= 0) {
        --minutes;
        seconds = 59;
    } else {
        --seconds;
    }

    minutes > 9 ?
    minutesDiv.innerText = minutes
    :
    minutesDiv.innerText = `0${minutes}`;

    seconds > 9 ? 
    secondsDiv.innerText = seconds
    : 
    secondsDiv.innerText = `0${seconds}`;
    if (seconds < 0) secondsDiv.innerText = '00';
}

minutesDiv.addEventListener('keydown', event => {
    if (!parseInt(event.key) && event.key !== 'Backspace' && event.key !== '0') event.preventDefault();
});

secondsDiv.addEventListener('keydown', event => {
    if (!parseInt(event.key, 10) && event.key !== 'Backspace' && event.key !== '0') event.preventDefault();
});

minutesDiv.addEventListener('input', event => {
    minutes = parseInt(event.target.innerText);
    if (isNaN(minutes)) minutes = 0;
});

secondsDiv.addEventListener('input', event => {
    if (event.target.innerText.length > 2) {
        seconds = parseInt(event.target.innerText);
        if (seconds >= 60) {
            const minutesToAdd = Math.floor(seconds / 60);
            minutes += minutesToAdd;
            seconds = seconds % 60;
        }
    } else {
        seconds = parseInt(event.target.innerText);
    }
    if (isNaN(seconds)) seconds = 0;
});

function startSound() {
    if (!audioObject) {
        audioObject = createAudioObject();
        audioObject.oscillatorNode.type = "sine";
        audioObject.oscillatorNode.connect(audioObject.gainNode);
        audioObject.oscillatorNode.connect(audioObject.audioCtx.destination);
        audioObject.oscillatorNode.frequency.value = 261.6;
        audioObject.oscillatorNode.start(0);
    } else {
        if (audioObject.audioCtx.state === 'suspended') {
            audioObject.audioCtx.resume();
        }
    }
}

function stopSound() {
    if (audioObject) {
        audioObject.gainNode.gain.exponentialRampToValueAtTime(0.00001, 0.04)
        audioObject.audioCtx.suspend();
    }
}

function toggleTimer() {
    const toggleButton = document.getElementById('toggle-timer');
    if (timerStarted) {
        toggleEditable();
        clearInterval(countTimer);
        timerStarted = false;
        toggleButton.innerText = 'Start Timer';
    } else {
        toggleEditable();
        timerStarted = true;
        toggleButton.innerText = 'Pause Timer';
        countTimer = setInterval(countdown, 1000)
    }
}