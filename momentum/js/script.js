// Start time-calendar 
const time = document.querySelector('.time');

function getTime() {
  time.textContent = new Date().toLocaleTimeString();
    setTimeout(getTime, 1000)
}
getTime()
// End time-calendar 