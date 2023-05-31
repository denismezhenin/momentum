import playList from './playList.js'

// 
// Start time-calendar 

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
let tag = 'nature'

let language = localStorage.getItem('lan');
if (!localStorage.getItem('lan')) {
      language = 'en'
}

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

  }
  getLocalStorage()
window.addEventListener('load', getLocalStorage)

// END greetings

// Start slider
const buttonNext = document.querySelector('.slide-next')
const buttonPrev = document.querySelector('.slide-prev')
let source = localStorage.getItem('source');
if (!localStorage.getItem('source')) {
      source = 'flickr'
     
      }

function getTagFromCache() {
  getTimeofDay(hours)
  backgoundTag.value = localStorage.getItem('backgoundTag');
  if (backgoundTag.value != localStorage.getItem('backgoundTag')) {
    backgoundTag.value = `${timeOfTheDay} nature`
  }
}
let randomNum 
function getRandomNumber() {
  randomNum = ((Math.round(Math.random() * (20 - 1) + 1)).toString().padStart(2, '0'))
  return randomNum 
 }
 getRandomNumber()

 function setBg() {
  if (source == 'github' || source == 'null') {
    getImageFromGithub ()
  }
  else if (source == 'unsplash') {
    getImageFromUnsplash()
} else if(source == 'flickr') {
  getImageFromflicr()
} 

}

function getImageFromGithub () {
  getTimeofDay(hours)
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/denismezhenin/stage1-tasks/assets/images/${timeOfTheDay}/${randomNum}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = `url('${img.src}')`
  }
}

async function getImageFromUnsplash() {
  getTagFromCache()
const url = `https://api.unsplash.com/photos/random?query=${backgoundTag.value}&client_id=ybTDi3Hz2Oy2maqN1CB84w2w88UtKNYV-_zvPK7OSRg`;
const res = await fetch(url);
let data = await res.json()
const img = new Image();
img.src = `${data.urls.regular}`;
img.onload = () =>{
  document.body.style.backgroundImage = `url('${img.src}')`
}
}

async function getImageFromflicr() {
  getTagFromCache()
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3c90511bfb28d24409d95e7c2e0275f0&tag_mode=all&tags=${backgoundTag.value}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  let data = await res.json()
  const img = new Image();
  let num = Math.round(Math.random() * (data.photos.photo.length - 1))
  img.src = `${(data.photos.photo[num]).url_l}`;
  img.onload = () =>{
    document.body.style.backgroundImage = `url('${img.src}')`
  }
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


async function getWeather() {

  city.value = localStorage.getItem('city');
  if (city.value != localStorage.getItem('city') && language == 'en') {
    city.value = 'Wroclaw'
  }
  else if (city.value != localStorage.getItem('city') && language == 'ru') {
    city.value = 'Вроцлав'
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=c4549f43d9c0e684a43b8474124bd5af&units=metric`
  
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
const settingsTitles = [
  {ru: 'Плеер',
 en: 'Audioplayer'},
  {ru: 'Погода',
 en: 'Weather'},
 {ru: 'Приветствие',
  en: 'Greeting'},
  {ru: 'Время',
  en: 'Time'},
  {ru: 'Дата',
  en: 'Date'},
 {ru: 'Цитата',
  en: 'Quote'},
 ]

let labelTitles = document.querySelectorAll('.lableForSetting')

const languageSelect = document.querySelectorAll('.language-selection')
languageSelect[0].addEventListener('click', setEn )
languageSelect[1].addEventListener('click', setRu)

function setRu() {
  languageSelect[1].classList.add('language-selected')
  languageSelect[0].classList.remove('language-selected')
  language = 'en'
  localStorage.setItem('lan', language)
  city.placeholder = "Minsk"
  name.placeholder = "[Enter name]" 
  getTime() 
  getQuotes() 
  getWeather()
  changeSettingTitle()
}

function setEn() {
  languageSelect[0].classList.add('language-selected')
  languageSelect[1].classList.remove('language-selected')
  language = 'ru' 
  localStorage.setItem('lan', language)
  city.placeholder = "Минск"
  name.placeholder = "[Введите свое имя]" 
  getTime()
  getQuotes() 
  getWeather()
  changeSettingTitle()
}


function changeSettingTitle() {
  labelTitles.forEach((element, index) => { 
    element.innerHTML = `${settingsTitles[index][language]}`
})
}

languageSelect.forEach(function(e) {
  e.innerHTML.toLocaleLowerCase() == language ? e.classList.add('language-selected') : e.classList.remove('language-selected');
  e.innerHTML.toLocaleLowerCase() == language ? e.classList.add('language-selected') : e.classList.remove('language-selected');
})

language == 'ru' ? setRu : setEn


changeSettingTitle()

// translate end

// Settings start
const settingButton = document.querySelector('.settings')
const settingWrapper = document.querySelector('.settings-wrapper')
const playerContainer = document.querySelector('.player')
const weatherContainer = document.querySelector('.weather')
const timesContainer = document.querySelector('.time')
const datesContainer = document.querySelector('.date')
const greetingsContainer = document.querySelector('.greeting-container')
const quotesContainer = document.querySelector('.quote-wrapper')
let settingCheck = document.querySelectorAll('.setting-checkbox')

const blocks = [playerContainer, weatherContainer, greetingsContainer, timesContainer, datesContainer, quotesContainer]

github.addEventListener('click', () => {
  source = 'github'
  localStorage.setItem('source', source)
  github.classList.add('source-active');
flickr.classList.remove('source-active')
unsplash.classList.remove('source-active')
setBg()
})

unsplash.addEventListener('click', () => {
  source = 'unsplash'
  localStorage.setItem('source', source)
  github.classList.remove('source-active');
flickr.classList.remove('source-active')
unsplash.classList.add('source-active')
setBg()
})

flickr.addEventListener('click', () => {
  source = 'flickr'
  localStorage.setItem('source', source)
  github.classList.remove('source-active');
flickr.classList.add('source-active')
unsplash.classList.remove('source-active')
setBg()
})



backgoundTag.onchange = () => {
  localStorage.setItem('backgoundTag', backgoundTag.value)
  setBg()
   }



settingButton.onclick = () => {
  settingWrapper.classList.toggle('set-active') 
}

document.addEventListener('click', (e) => {
  if (!settingWrapper.contains(e.target) && !settingButton.contains(e.target)) {
    settingWrapper.classList.remove('set-active') 
  }
})

settingCheck.forEach(function(e) {
  localStorage.getItem(`${e.id}`) == 'false' ? e.checked = false : e.checked = true;
})

settingCheck.forEach(function(e, index) {
 e.checked ? blocks[index].style.opacity = "1" : blocks[index].style.opacity = "0"
  
})


backgoundTag.value = localStorage.getItem('backgoundTag');
if (backgoundTag.value != localStorage.getItem('backgoundTag')) {
  backgoundTag.value = `${timeOfTheDay} nature`
}

player.addEventListener('change', () => {
  if(player.checked) {
    playerContainer.style.opacity = "1"
    player.checked = true
    localStorage.setItem('player', player.checked = true)
  }  else if (!player.checked) {
    playerContainer.style.opacity = "0"
    localStorage.setItem('player', player.checked = false)
  }

})

dates.addEventListener('change', () => {
  if(dates.checked) {
    datesContainer.style.opacity = "1"
    localStorage.setItem('dates', dates.checked = true)
  }  else if (!dates.checked) {
    datesContainer.style.opacity = "0"
    localStorage.setItem('dates', dates.checked = false)
  }
})

times.addEventListener('change', () => {
  if(times.checked) {
    timesContainer.style.opacity = "1"
    localStorage.setItem('times', times.checked = true)
    times.checked = true
  }  else if (!times.checked) {
    timesContainer.style.opacity = "0"
    localStorage.setItem('times', times.checked = false)
  }
})

weather.addEventListener('change', () => {
  if(weather.checked) {
    weatherContainer.style.opacity = "1"
    weather.checked = true
    localStorage.setItem('weather', weather.checked = true)
  }  else if (!weather.checked) {
    weatherContainer.style.opacity = "0"
    localStorage.setItem('weather', weather.checked = false)
  }
})

greetings.addEventListener('change', () => {
  if(greetings.checked) {
    greetingsContainer.style.opacity = "1"
    greetings.checked = true
    localStorage.setItem('greetings', greetings.checked = true)
  }  else if (!greetings.checked) {
    greetingsContainer.style.opacity = "0"
    localStorage.setItem('greetings', greetings.checked = false)
  }
})

quotes.addEventListener('change', () => {
  if(quotes.checked) {
    quotesContainer.style.opacity = "1"
    quotes.checked = true
    localStorage.setItem('quotes', quotes.checked = true)
  }  else if (!quotes.checked) {
    quotesContainer.style.opacity = "0"
    localStorage.setItem('quotes', quotes.checked = false)
  }
})
const backgroundSelect = document.querySelectorAll('.backgrounds-selection');
backgroundSelect.forEach(function(e) {
  if (e.id == source) {
   e.classList.add('source-active')
  }
})


// Settings end
