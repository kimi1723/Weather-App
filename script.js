const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

let lat, lon, imgID;

const API_CALL = 'https://api.openweathermap.org/data/2.5/weather?lat=';
const API_KEY = '&appid=e4d87760e30a68660bfc592f15c3a9ca';
const API_UNITS = '&units=metric';

const API_CALL_TO_GET_COORDINATES ='http://api.openweathermap.org/geo/1.0/direct?q=';
const API_CALL_TO_GET_COORDINATES_KEY = `&limit=5${API_KEY}`;

const getCOO = () => {
  const COO =
    API_CALL_TO_GET_COORDINATES + input.value + API_CALL_TO_GET_COORDINATES_KEY;
      axios
        .get(COO)
          .then((res) => {
            lat = res.data[0].lat;
            lon = res.data[0].lon;
            getWeather(lat, lon);
            warning.textContent = '';
            input.value = '';
          })
        .catch(() => (warning.textContent = 'Wpisz prawidlowa nazwe miasta'));
    };

input.value = 'Warsaw';
getCOO();


const getWeather = (lat, lon) => {
  const URL = API_CALL + lat + '&lon=' + lon + API_KEY + API_UNITS;

    axios.get(URL).then((res) => {
      const status = Object.assign({}, ...res.data.weather);

      cityName.textContent = res.data.name;
      weather.textContent = status.main;
      temperature.textContent = Math.floor(res.data.main.temp) + '°C';
      humidity.textContent = res.data.main.humidity + '%';

      getImage(status.id);
      photo.setAttribute('src', `./img/${imgID}`);
    });
};

const getImage = (id) => {
  if (id >= 200 && id <= 232) {
    return (imgID = 'thunderstorm.png');
  } else if (id >= 300 && id <= 321) {
    return (imgID = 'drizzle.png');
  } else if (id >= 500 && id <= 531) {
    return (imgID = 'rain.png');
  } else if (id >= 600 && id <= 622) {
    return (imgID = 'ice.png');
  } else if (id >= 701 && id <= 781) {
    return (imgID = 'fog.png');
  } else if (id === 800) {
    return (imgID = 'sun.png');
  } else if (id >= 800 && id <= 804) {
    return (imgID = 'cloud.png');
  } else {
    return (imgID = 'unknown.png');
  }
};

const enterKeyCheck = (e) => {
  if (e.key === 'Enter') {
    getCOO();
  }
};

input.addEventListener('keyup', enterKeyCheck);
button.addEventListener('click', getCOO);
