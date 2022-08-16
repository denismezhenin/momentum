import playList from 'js/playList.js'
 

// Start time-calendar 
let language = 'en'
const time = document.querySelector('.time');
const day = document.querySelector('.date');
const date = new Date()
const options = {weekday: 'long', month: 'long', day: 'numeric',};
const greeting = document.querySelector('.greeting');
const hours = date.getHours();
let greetingText = ``;
let timeOfTheDay = '';
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const city = document.querySelector('.city')
const error = document.querySelector('.weather-error')



function getTime() {
  time.textContent = new Date().toLocaleTimeString();
    setTimeout(getTime, 1000)
    day.textContent = new Date().toLocaleDateString(`${language}-${language}`, options)
    showGreeting()
}
getTime()

// End time-calendar 

// Start greetings


function getTimeofDay(hours) {
  if (language == 'ru') {
    if (Math.floor(hours / 6) == 0 ) {
      timeOfTheDay = 'night'
      return 'Доброй ночи';
  } else if (Math.floor(hours / 6) == 1 ) {
    timeOfTheDay = 'morning'
    return 'Доброго утра';
  }
else if (Math.floor(hours / 6) == 2 ) {
  timeOfTheDay = 'afternoon'
  return 'доброго дня';

} else if (Math.floor(hours / 6) == 3 ) {
  timeOfTheDay = 'evening'
  return 'Доброго вечера';
} 
  } else if (language == 'en') {
    if (Math.floor(hours / 6) == 0 ) {
      timeOfTheDay = 'night'
        return 'nigth';
    } else if (Math.floor(hours / 6) == 1 ) {
      timeOfTheDay = 'morning'
      return 'morning';
    }
  else if (Math.floor(hours / 6) == 2 ) {
    timeOfTheDay = 'afternoon'
    return 'afternoon';
 
} else if (Math.floor(hours / 6) == 3 ) {
  timeOfTheDay = 'evening'
  return 'evening';
}  
  }
}



function showGreeting() {
  getTimeofDay(hours) 
  if (language == 'ru') {
    greetingText = `${getTimeofDay(hours)}`
    greeting.textContent = greetingText
  } if (language == 'en') {
    greetingText = `Good ${timeOfTheDay}`
    greeting.textContent = greetingText
  }
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
    // else if (!localStorage.getItem('city') && language == 'en') {
    //   localStorage.setItem('city', city.value = 'Minsk')
    // } else if (!localStorage.getItem('city') && language == 'ru') {
    //   localStorage.setItem('city', city.value = 'Минск')
    // }
    // getWeather()
  }
  getLocalStorage()
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
  getTimeofDay(hours)
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/denismezhenin/stage1-tasks/assets/images/${timeOfTheDay}/${randomNum}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/denismezhenin/stage1-tasks/assets/images/${timeOfTheDay}/${randomNum}.jpg')`
  };
  
}
 setBg()

 function getSlideNext() {
  randomNum = (Number(randomNum) + 1).toString().padStart(2, '0')
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


async function getWeather() {

  city.value = localStorage.getItem('city');
  if (city.value != localStorage.getItem('city') && language == 'en') {
    city.value = 'Minsk'
  }
  else if (city.value != localStorage.getItem('city') && language == 'ru') {
    city.value = 'Минск'
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=c4549f43d9c0e684a43b8474124bd5af&units=metric`

    // let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=c4549f43d9c0e684a43b8474124bd5af&units=metric`
  
  let res = await fetch(url);
  if (res.status == '404' || city.value == '') {
    if (language == 'ru') {
      error.textContent = 'Пожалуйста, введите правильное название города'
    }
    else if (language == 'en') {
      error.textContent = 'Error! Please write correcct name of city'
    }
   
    weatherIcon.textContent = '';
    temperature.textContent = ``;
    weatherDescription.textContent = '';
    wind.textContent = ``
    humidity.textContent = ``
      } 
  let data = await res.json()
  weatherIcon.className = 'weather-icon owf'
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  if (language == 'ru') {
    wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)}m/s`
    humidity.textContent = `Влажность: ${data.main.humidity}%`
  }
  else if (language == 'en') {
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)}m/s`
    humidity.textContent = `Humidity: ${data.main.humidity}%`
  }

 error.textContent = ''
}
getWeather()


city.onchange = () => {
  localStorage.setItem('city', city.value)
  getWeather(city.value)
}


// Weather widget end


// Quotes start
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeQouteButton = document.querySelector('.change-quote')
async function getQuotes() {
  const quotes = 'data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  let randomQuote = Math.round(Math.random() * (data[1].length - 1))
  if (language == 'ru') {
    quote.textContent = `${data[0][randomQuote].text}`
    author.textContent = `${data[0][randomQuote].author}`
  }
  else if (language == 'en') {
    quote.textContent = `${data[1][randomQuote].text}`
    author.textContent = `${data[1][randomQuote].author}`
  }

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
    isPlay = true;
    selectAudioTrack()
  }
  else {
    audio.pause()
    isPlay = false
  }
}

// function selectAudioTrack() {
//   playList.forEach((element, index) => index == playNum ? element.classList.add('item-active') : element.classList.remove('item-active'))
// }

function tooglePlayButton() {
  play.classList.toggle('pause')
}
audio.onended = () => playNextTrack();


play.addEventListener('click', tooglePlayButton)
play.addEventListener('click', playAudio)

function playNextTrack() {
playNum++
if (playNum == playListLength + 1) {
playNum = 0
}
audio.src = playList[playNum].src
audio.play()
selectAudioTrack()
}

function playPrevTrack() {
  playNum-- 
if (playNum == -1) {
  playNum = playListLength
}
audio.src = playList[playNum].src
audio.play()
selectAudioTrack()
}

playNext.addEventListener('click', playNextTrack)
playPrev.addEventListener('click', playPrevTrack)

playList.forEach(element => {
  const li = document.createElement('li');
  li.classList.add('play-item')
  li.textContent = element.title
  playListContainer.append(li)
});

let tracks = document.querySelectorAll('.play-item')

function selectAudioTrack() {
  playList.forEach((element, index) => index == playNum ? tracks[index].classList.add('item-active') : tracks[index].classList.remove('item-active'))
}
selectAudioTrack()



// Music end

//translate start
const languageSelect = document.querySelectorAll('.language-selection')
languageSelect[0].addEventListener('click', function() {
  languageSelect[0].classList.add('russian-selected')
  languageSelect[1].classList.remove('english-selected')
  language = 'ru' 
  city.placeholder = "Минск"
  name.placeholder = "[Введите свое имя]" 
  getTime()
  getQuotes() 
  getWeather()
})
languageSelect[1].addEventListener('click', function() {
  languageSelect[1].classList.add('english-selected')
  languageSelect[0].classList.remove('russian-selected')
  language = 'en'
  city.placeholder = "Minsk"
  name.placeholder = "[Enter name]" 
  getTime() 
  getQuotes() 
  getWeather()
})


// translate end

// Settings start
const settingButton = document.querySelector('.settings')
const settingWrapper = document.querySelector('.settings-wrapper')

settingButton.onclick = () => {
  settingWrapper.classList.toggle('set-active') 
}

document.addEventListener('click', (e) => {
  if (!settingWrapper.contains(e.target) && !settingButton.contains(e.target)) {
    settingWrapper.classList.remove('set-active') 
  }
})

console.log("Привет, не успел все сделать, постараюсь еще доделать, для связи discord: denismezhenin")

// Settings end