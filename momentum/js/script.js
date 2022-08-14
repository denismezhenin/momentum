import playList from './playList.js'

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
    if (!localStorage.getItem('city')) {
      localStorage.setItem('city', city.value = 'minsk')
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
  randomNum = (Number(randomNum) - 1).toString().padStart(2, '0');
  if (randomNum == '00') {
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
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const city = document.querySelector('.city')
const error = document.querySelector('.weather-error')

// async function getWeather() {
//   console.log(city.value)
//   // if (city.value = )
//   city.value = localStorage.getItem('city');
//   console.log(city.value)
//   // if (city.value = localStorage.getItem('city') == '') {
//   //   city.value = 'minsk'
//   // }
//   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=c4549f43d9c0e684a43b8474124bd5af&units=metric`

//     // let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=c4549f43d9c0e684a43b8474124bd5af&units=metric`
  
//   let res = await fetch(url);
//   if (res.status == '404' || city.value == '') {
//     error.textContent = 'Error! Please write correcct name of city'
//     weatherIcon.textContent = '';
//     temperature.textContent = ``;
//     weatherDescription.textContent = '';
//     wind.textContent = ``
//     humidity.textContent = ``
//       } 
//   // console.log(res.status)
//   let data = await res.json()
//   // console.log(data.weather[0].id)
//   weatherIcon.className = 'weather-icon owf'
//   weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  
//   temperature.textContent = `${Math.round(data.main.temp)}°C`;
//   weatherDescription.textContent = data.weather[0].description;
//   wind.textContent = `Wind speed: ${Math.round(data.wind.speed)}m/s`
//   humidity.textContent = `Humidity: ${data.main.humidity}%`
//  error.textContent = ''
// }
// getWeather()
// console.log(city.value)
// city.onchange = () => {
//   localStorage.setItem('city', city.value)
//   getWeather(city.value)
// }


// Weather widget end
// Quotes start
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeQouteButton = document.querySelector('.change-quote')
async function getQuotes() {
  const quotes = 'data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  console.log(data[1])
  let randomQuote = Math.round(Math.random() * (data[1].length - 1))
  quote.textContent = `${data[1][randomQuote].text}`
  author.textContent = `${data[1][randomQuote].author}`
  console.log(randomQuote)
}
getQuotes() 
changeQouteButton.onclick = () => {
  getQuotes() 
}

// Quotes end

// Music Start
let isPlay = false 
const play = document.querySelector('.play')
const playNext = document.querySelector('.play-next')
const playPrev = document.querySelector('.play-prev')
let playNum = 0
const playListLength = playList.length - 1
const playListContainer = document.querySelector('.play-list')

const audio = new Audio()

function playAudio() {
  audio.src = playList[playNum].src
  // audio.currentTime = 0
  if (!isPlay) {
    audio.play()
    isPlay = true
  }
  else {
    audio.pause()
    isPlay = false
  }
}

function tooglePlayButton() {
  play.classList.toggle('pause')
}
audio.onended = () => playNextTrack();


play.addEventListenegitr('click', tooglePlayButton)
play.addEventListener('click', playAudio)

function playNextTrack() {
playNum++
if (playNum == playListLength + 1) {
playNum = 0
}
audio.src = playList[playNum].src
audio.play()
}

function playPrevTrack() {
  playNum-- 
if (playNum == -1) {
  playNum = playListLength
}
audio.src = playList[playNum].src
audio.play()
}

playNext.addEventListener('click', playNextTrack)
playPrev.addEventListener('click', playPrevTrack)

playList.forEach(element => {
  const li = document.createElement('li');
  li.classList.add('play-item')
  li.textContent = element.title
  playListContainer.append(li)
});


// Music end