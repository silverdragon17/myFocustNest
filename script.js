// Global variables
let timeLeft = 25 * 60; // seconds
let timerInterval;
let currentInterval = 'pomodoro';

// DOM elements
const timeLeftEl = document.getElementById('time-left');
const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');
const pomodoroIntervalBtn = document.getElementById('pomodoro-interval-btn');
const shortBreakIntervalBtn = document.getElementById('short-break-interval-btn');
const longBreakIntervalBtn = document.getElementById('long-break-interval-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeModalBtn = document.querySelector('.close-btn');
const pomodoroDurationInput = document.getElementById('pomodoro-duration');
const shortBreakDurationInput = document.getElementById('short-break-duration');
const longBreakDurationInput = document.getElementById('long-break-duration');
const saveBtn = document.getElementById('save-btn');

// Default durations in seconds
let pomodoroDuration = 25 * 60; // 25 minutes
let shortBreakDuration = 5 * 60; // 5 minutes
let longBreakDuration = 10 * 60; // 10 minutes

// Event listeners for interval buttons
pomodoroIntervalBtn.addEventListener('click', () => {
  currentInterval = 'pomodoro';
  timeLeft = pomodoroDuration;
  updateTimeLeftTextContent();
});

shortBreakIntervalBtn.addEventListener('click', () => {
  currentInterval = 'short-break';
  timeLeft = shortBreakDuration;
  updateTimeLeftTextContent();
});

longBreakIntervalBtn.addEventListener('click', () => {
  currentInterval = 'long-break';
  timeLeft = longBreakDuration;
  updateTimeLeftTextContent();
});

// Event listener for start/stop button
startStopBtn.addEventListener('click', () => {
  if (startStopBtn.textContent === 'Start') {
    startTimer();
    startStopBtn.textContent = 'Stop';
  } else {
    stopTimer();
  }
});

// Event listener for reset button
resetBtn.addEventListener('click', () => {
  stopTimer();
  resetTimer();
  updateTimeLeftTextContent();
  startStopBtn.textContent = 'Start';
});

// Event listener for settings button
settingsBtn.addEventListener('click', () => {
  settingsModal.style.display = 'flex';
  // Set current durations in the input fields
  pomodoroDurationInput.value = pomodoroDuration / 60;
  shortBreakDurationInput.value = shortBreakDuration / 60;
  longBreakDurationInput.value = longBreakDuration / 60;
});

// Event listener for close button in the settings modal
closeModalBtn.addEventListener('click', () => {
  settingsModal.style.display = 'none';
});

// Event listener for save button in the settings modal
saveBtn.addEventListener('click', () => {
  // Update timer durations from input fields
  pomodoroDuration = parseInt(pomodoroDurationInput.value) * 60;
  shortBreakDuration = parseInt(shortBreakDurationInput.value) * 60;
  longBreakDuration = parseInt(longBreakDurationInput.value) * 60;

  // Reset the timer to the current interval
  resetTimer();
  updateTimeLeftTextContent();

  // Close the modal after saving preferences
  settingsModal.style.display = 'none';
});

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimeLeftTextContent();
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      switchInterval();
    }
  }, 1000);
}

// Function to stop the timer
function stopTimer() {
  clearInterval(timerInterval);
  startStopBtn.textContent = 'Start';
}

// Function to reset the timer based on the current interval
function resetTimer() {
  if (currentInterval === 'pomodoro') {
    timeLeft = pomodoroDuration;
  } else if (currentInterval === 'short-break') {
    timeLeft = shortBreakDuration;
  } else {
    timeLeft = longBreakDuration;
  }
}

// Function to switch intervals
function switchInterval() {
  if (currentInterval === 'pomodoro') {
    currentInterval = 'short-break';
    timeLeft = shortBreakDuration;
  } else if (currentInterval === 'short-break') {
    currentInterval = 'long-break';
    timeLeft = longBreakDuration;
  } else {
    currentInterval = 'pomodoro';
    timeLeft = pomodoroDuration;
  }
}

// Function to update the time left text content
function updateTimeLeftTextContent() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeLeftEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Apply user preferences on page load
updateTimeLeftTextContent();
