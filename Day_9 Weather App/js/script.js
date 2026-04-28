// Fake data object
const fakeWeather = {
  surat: {
    temp: 34,
    condition: "Sunny",
    humidity: 60,
    wind: 5
  },
  delhi: {
    temp: 38,
    condition: "Hot",
    humidity: 40,
    wind: 3
  },
  mumbai: {
    temp: 30,
    condition: "Rainy",
    humidity: 80,
    wind: 7
  },
  ahmedabad: {
    temp: 36,
    condition: "Sunny",
    humidity: 50,
    wind: 4
  },
  jaipur: {
    temp: 35,
    condition: "Dry",
    humidity: 30,
    wind: 2
  },
  kolkata: {
    temp: 32,
    condition: "Humid",
    humidity: 85,
    wind: 6
  },
  chennai: {
    temp: 33,
    condition: "Hot",
    humidity: 70,
    wind: 5
  },
  bangalore: {
    temp: 27,
    condition: "Cloudy",
    humidity: 65,
    wind: 4
  },
  hyderabad: {
    temp: 31,
    condition: "Clear",
    humidity: 55,
    wind: 3
  },
  pune: {
    temp: 29,
    condition: "Pleasant",
    humidity: 60,
    wind: 4
  },
  lucknow: {
    temp: 34,
    condition: "Sunny",
    humidity: 45,
    wind: 3
  },
  chandigarh: {
    temp: 28,
    condition: "Cool",
    humidity: 50,
    wind: 2
  },
  bhopal: {
    temp: 33,
    condition: "Warm",
    humidity: 55,
    wind: 3
  }
};

// Icon mapping
const weatherIcons = {
  Sunny: '<i class="fa-solid fa-sun" style="color: #f6d365;"></i>',
  Hot: '<i class="fa-solid fa-fire" style="color: #ff5e62;"></i>',
  Rainy: '<i class="fa-solid fa-cloud-showers-heavy" style="color: #a8c0ff;"></i>',
  Dry: '<i class="fa-solid fa-wind" style="color: #eacda3;"></i>',
  Humid: '<i class="fa-solid fa-water" style="color: #66a6ff;"></i>',
  Cloudy: '<i class="fa-solid fa-cloud" style="color: #bdc3c7;"></i>',
  Clear: '<i class="fa-solid fa-star" style="color: #fff;"></i>',
  Pleasant: '<i class="fa-solid fa-leaf" style="color: #38ef7d;"></i>',
  Cool: '<i class="fa-solid fa-snowflake" style="color: #6dd5fa;"></i>',
  Warm: '<i class="fa-solid fa-temperature-half" style="color: #f5af19;"></i>'
};

// Background class mapping
const weatherBackgrounds = {
  Sunny: 'sunny',
  Hot: 'hot',
  Rainy: 'rainy',
  Dry: 'dry',
  Humid: 'humid',
  Cloudy: 'cloudy',
  Clear: 'clear',
  Pleasant: 'pleasant',
  Cool: 'cool',
  Warm: 'warm'
};

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const body = document.body;

// Elements inside weather result
const cityNameEl = document.getElementById("cityName");
const weatherIconEl = document.getElementById("weatherIcon");
const temperatureEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");

function resetBackground() {
  body.className = 'default';
}

function setBackground(condition) {
  const bgClass = weatherBackgrounds[condition] || 'default';
  body.className = bgClass;
}

function showLoading() {
  weatherResult.classList.add('hidden');
  error.classList.add('hidden');
  loading.classList.remove('hidden');
}

function hideLoading() {
  loading.classList.add('hidden');
}

function displayWeather(city, data) {
  cityNameEl.textContent = city;
  weatherIconEl.innerHTML = weatherIcons[data.condition] || '<i class="fa-solid fa-cloud"></i>';
  temperatureEl.textContent = `${data.temp}°C`;
  conditionEl.textContent = data.condition;
  humidityEl.textContent = `${data.humidity}%`;
  windEl.textContent = `${data.wind} m/s`;

  // Reset animation
  weatherResult.classList.remove('hidden');
  weatherResult.style.animation = 'none';
  weatherResult.offsetHeight; // trigger reflow
  weatherResult.style.animation = 'fadeIn 0.5s ease-in';
}

function searchWeather() {
  const city = cityInput.value.trim().toLowerCase();

  if (city === "") {
    error.textContent = "Please enter a city name!";
    error.classList.remove('hidden');
    weatherResult.classList.add('hidden');
    resetBackground();
    return;
  }

  showLoading();

  // Simulate network delay
  setTimeout(() => {
    hideLoading();

    if (fakeWeather[city]) {
      const data = fakeWeather[city];
      setBackground(data.condition);
      displayWeather(city.toUpperCase(), data);
      error.classList.add('hidden');
    } else {
      weatherResult.classList.add('hidden');
      resetBackground();
      error.textContent = "City not found (fake data)";
      error.classList.remove('hidden');
    }
  }, 800);
}

searchBtn.addEventListener("click", searchWeather);

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchWeather();
  }
});

// Set default background on load
resetBackground();

