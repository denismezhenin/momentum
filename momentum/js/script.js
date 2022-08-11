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
const buttonNext = document.querySelector('.slide-next')
const buttonPrev = document.querySelector('.slide-prev')

let randomNum 
function getRandomNumber() {
  randomNum = ((Math.round(Math.random() * (20 - 1) + 1)).toString().padStart(2, '0'))
  return randomNum 
 }
 getRandomNumber()

 function setBg() {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/denismezhenin/stage1-tasks/assets/images/${getTimeofDay(hours)}/${randomNum}.jpg`;
  img.onload = () => {
    // console.log(img.src)
    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/denismezhenin/stage1-tasks/assets/images/${getTimeofDay(hours)}/${randomNum}.jpg')`
  };
  
}
 setBg()

 function getSlideNext() {
  randomNum = (Number(randomNum) + 1).toString().padStart(2, '0')
  console.log()
  if (randomNum == '21') {
    randomNum = '01'
  }
  setBg()
 }

 function getSlidePrev() {
  randomNum = (Number(randomNum) - 1).toString().padStart(2, '0')
  if (randomNum == 00) {
    randomNum = '20'
  }
  setBg()
 }

 buttonNext.addEventListener('click', getSlideNext)
 buttonPrev.addEventListener('click', getSlidePrev)

// END slider

// Weather widget start
// https://api.openweathermap.org/data/2.5/weather?q=minsk&lang=en&appid=c4549f43d9c0e684a43b8474124bd5af&units=metric
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')

async function getWeather(url) {

  const res = await fetch(url);
  const data = await res.json()
  console.log(data.weather[0].id, data.weather[0].description, data.main.temp)
  weatherIcon.className = 'weather-icon owf'
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}
getWeather(`https://api.openweathermap.org/data/2.5/weather?q=minsk&lang=en&appid=c4549f43d9c0e684a43b8474124bd5af&units=metric`)


// Weather widget end