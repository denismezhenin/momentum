// Start time-calendar 
const time = document.querySelector('.time');
const day = document.querySelector('.date');
const date = new Date()
const options = {weekday: 'long', month: 'long', day: 'numeric',};
const greeting = document.querySelector('.greeting');
const hours = date.getHours();
const greetingText = `Good ${getTimeofDay(hours)}`



function getTime() {
  time.textContent = new Date().toLocaleTimeString();
    setTimeout(getTime, 1000)
    day.textContent = new Date().toLocaleDateString('en-US', options)
    showGreeting()
}
getTime()

// End time-calendar 

// Start greetings


function getTimeofDay(hours) {
  switch (Math.floor(hours / 6)) {
    case (0):
      return 'nigth';
      break;
    case (1):
      return 'morning';
      break;
    case (2):
      return 'afternoon';
      break;
    case (3):
      return 'evening';
      break;
  }
}

function showGreeting() {
  greeting.textContent = greetingText
  }
  const name = document.querySelector('.name');
  function setLocalStorage() {
    localStorage.setItem('name', name.value)
  }
  window.addEventListener('beforeunload', setLocalStorage)

  function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
  }
window.addEventListener('load', getLocalStorage)

// END greetings

// Start slider


let random 
function getRandomNumber() {
  random = (Math.round(Math.random() * (20 - 1) + 1)).toString().padStart(2, '0')
  return random 
 }
 getRandomNumber()

 function setBg() {
  document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/denismezhenin/stage1-tasks/assets/images/${getTimeofDay(hours)}/${random}.jpg')`
 
}
 setBg()






 

// END slider