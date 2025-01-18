// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            startBtn.setAttribute('disabled', 'disabled');
            iziToast.error({
              message: 'Please choose a date in the future',
              position: 'topRight',
            });
          }
          else{
            datatimePicker.removeAttribute('disabled');
            startBtn.removeAttribute('disabled');
          }
    },
  };

  function formatNumberWithPadTwo(value) {
    return String(value).padStart(2, '0');
  }

  const datatimePicker = document.querySelector('#datetime-picker');
  const remainingTimes = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  };
  
  function updateRemainingElements(timeElement, remainingTime) {
    timeElement.days.textContent = formatNumberWithPadTwo(remainingTime.days);
    timeElement.hours.textContent = formatNumberWithPadTwo(remainingTime.hours);
    timeElement.minutes.textContent = formatNumberWithPadTwo(remainingTime.minutes);
    timeElement.seconds.textContent = formatNumberWithPadTwo(remainingTime.seconds);
  }

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  const startBtn = document.querySelector('[data-start]');
  startBtn.setAttribute('disabled', 'disabled'); //disable at start

  startBtn.addEventListener('click', () => {
    datatimePicker.setAttribute('disabled', 'disabled');
    startBtn.setAttribute('disabled', 'disabled');
    const selectedDate = dateTimePicker.selectedDates[0];
  
    const timerInterval = setInterval(() => {
      if (Date.now() >= selectedDate) {
        clearInterval(timerInterval);
        datatimePicker.removeAttribute('disabled');
        iziToast.info({
          title: 'Please, choose a date and click on start 🔻',
          position: 'topCenter',
        });
        return;
      }
      
      const remainingTime = convertMs(selectedDate - Date.now());
  
      updateRemainingElements(remainingTimes, remainingTime);
    }, 1000);
  });

  const dateTimePicker = flatpickr('#datetime-picker', options);