"use strict";

const cities = [
  {
    name: 'Atlanta, GA',
    latitude: 33.732774,
    longitude: -84.4456547
  },
  {
    name: 'New York City, NY',
    latitude: 40.6974881,
    longitude: -73.979681
  },
  {
    name: 'Tallahassee, FL',
    latitude: 30.455,
    longitude: -84.253334
  },
  {
    name: 'Austin, TX',
    latitude: 30.266666,
    longitude: -97.73333
  },
  {
    name: 'Los Angeles, CA',
    latitude: 34.052235,
    longitude: -118.243683
  },
];

const cityEl = document.getElementById('selectCity');
const tbody = document.querySelector('#cityTable tbody');

cities.forEach((city) => {
  const theOption = new Option(city.name, city.name);
  cityEl.appendChild(theOption);
});

cityEl.addEventListener('change', () => {
  tbody.innerHTML = '';
  if (cityEl.options[cityEl.selectedIndex].textContent === 'Select a City') {
    document.getElementById('cityTable').style.display = 'none';
    return;
  }
  
  const selectedCity = cities.find(getLongAndLat);
  const long = selectedCity.longitude;
  const lat = selectedCity.latitude;

  fetch(`https://api.weather.gov/points/${lat},${long}`)
    .then((response) => response.json())
    .then((data) => {
      const forecastURL = data.properties.forecast;
      return fetch(forecastURL);
    })
    .then((response) => response.json())
    .then((file) => {
      console.log(file.properties.periods);
      file.properties.periods.forEach(element => {
        const row = tbody.insertRow(-1);

        const cell1 = row.insertCell(0);
        cell1.innerHTML = element.name;
        const cell2 = row.insertCell(1);
        cell2.innerHTML = `Temperature: ${element.temperature} ${element.temperatureUnit}, Wind: ${element.windDirection} ${element.windSpeed}`;
        const cell3 = row.insertCell(2);
        cell3.innerHTML = element.shortForecast;
      });
    })
    .catch((error) => {
      console.error(error);
    });

  document.getElementById('cityTable').style.display = 'table';
});

function getLongAndLat(city) {
  return city.name === cityEl.value;
}

  

 