import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  //body: document.querySelector('body'),
  input: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('[data-start]'),
  timerBlock: document.querySelector('.timer'),
  day: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  min: document.querySelector('[data-minutes]'),
  sec: document.querySelector('[data-seconds]'),
};

let userDate = null;
const date = Date.now();

flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < date) {
      refs.buttonStart.setAttribute('disabled', true);
      Notiflix.Notify.failure('Please choose a date in the future');
      userDate = new Date();
    } else {
      refs.buttonStart.removeAttribute('disabled', false);

      userDate = selectedDates[0];
    }
  },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

class Timer {
  constructor() {
    this.isActive = false;
    this.timerId = null;
  }
  timerStart() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    refs.buttonStart.setAttribute('disabled', true);
    refs.input.setAttribute('disabled', true);

    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = userDate - currentTime;
      const timerEl = convertMs(deltaTime);

      refs.sec.textContent = timerEl.seconds;
      refs.min.textContent = timerEl.minutes;
      refs.hours.textContent = timerEl.hours;
      refs.day.textContent = timerEl.days;

      if (deltaTime <= 0) {
        this.timerStop();
        Notiflix.Notify.failure('Время вышло!!!');
        const zeroTimer = '<p class ="zeroing">Время вышло</p>';
        refs.timerBlock.innerHTML = zeroTimer;
      }
    }, 1000);
  }
  timerStop() {
    clearInterval(this.timerId);
    this.isActive = false;
  }
}

const timer = new Timer();

refs.buttonStart.addEventListener('click', () => timer.timerStart());
