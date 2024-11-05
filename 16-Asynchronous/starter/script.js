'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountryHtml = (data, className = '') => {
  //   console.log(data);
  const HTML = `
  
        <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article> 
  `;
  countriesContainer.insertAdjacentHTML('beforeend', HTML);
  countriesContainer.style.opacity = 1;
};

const renderError = message => {
  countriesContainer.insertAdjacentText('beforeend', message);
};

const getJSON = (url, msgError = '') => {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${msgError}`);
    return response.json();
  });
};

const getCountryData = country => {
  const endpoint = `https://restcountries.com/v2/name/${country}`;
  getJSON(endpoint, `Could not find country: ${country}`)
    .then(data => {
      renderCountryHtml(...data);
      // Mapeia as promessas de fetch para cada código de fronteira
      if (!data[0].borders) throw new Error('no borders found.');
      // console.log(`---------------------`);
      // console.log(data[0].borders);
      // console.log(`---------------------`);
      const responseBorders = data[0].borders.map(borderCode =>
        getJSON(
          `https://restcountries.com/v2/alpha/${borderCode}`,
          `Could not find country: ${borderCode}`
        )
      );
      return Promise.all(responseBorders);
    })
    .then(bordersData => {
      // bordersData.forEach(border => {
      //   renderCountryHtml(border, 'neighbour');
      // });
    })
    .catch(error => {
      console.error('Erro ao buscar dados do país:', error);
      renderError(error);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

// btn.addEventListener('click', () => getCountryData('Portugal'));

// grass HTTP Request roots
// const getCountryData = country => {
//   const r = new XMLHttpRequest();
//   const endpoint = `https://restcountries.com/v2/name/${country}`;
//   r.open('GET', endpoint);
//   r.send();

//   r.addEventListener('load', () => {
//     const [data] = JSON.parse(r.responseText);
//     console.log(data);
//     renderCountryHtml(data);
//     const neighbours = [...data.borders];
//     // console.log(neighbours);
//     neighbours.forEach(n => {
//       const r2 = new XMLHttpRequest();
//       const endpoint2 = `https://restcountries.com/v2/alpha/${n}`;
//       r2.open('GET', endpoint2);
//       r2.send();
//       r2.addEventListener('load', () => {
//         console.log(r2.responseText);
//         const x = JSON.parse(r2.responseText);
//         // console.log(x);
//         renderCountryHtml(x, 'neighbour');
//       });
//     });
//   });
// };

// const getCountryData = country => {
//   const endpoint = `https://restcountries.com/v2/name/${country}`;
//   countriesContainer.textContent = '';
//   fetch(endpoint)
//     .then(response => response.json())
//     .then(data => {
//       renderCountryHtml(...data);

//       // Mapeia as promessas de fetch para cada código de fronteira
//       const responseBorders = data[0].borders.map(borderCode =>
//         fetch(`https://restcountries.com/v2/alpha/${borderCode}`)
//       );
//       return Promise.all(responseBorders);
//     })
//     .then(responses => {
//       // Agora responses é um array de Response já resolvidas
//       return Promise.all(responses.map(r => r.json()));
//     })
//     .then(bordersData => {
//       bordersData.forEach(border => {
//         renderCountryHtml(border, 'neighbour');
//         console.log(border); // Exibe cada dado de país da fronteira
//       });
//     })
//     .catch(error => {
//       console.error('Erro ao buscar dados do país:', error);
//       renderError(`Something went wrong!`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// getCountryData('dgas');
///////////////////////////////////////

// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

const renderLocation = location => {
  const HTML = `
      <article class="country">
        <div class="country__data">
          <h3 class="country__name">${location.county}</h3>
          <h4 class="country__region">${location.country.toUpperCase()} - ${location.country_code.toUpperCase()}</h4>
          <p class=""><span>State:</span>${location.state}</p>
          <p class=""><span>Postcode:</span>${location.postcode}</p>
      
          <p class=""><span>Latitude:</span>${location.lat}</p>
          <p class=""><span>Longitude:</span>${location.lon}</p>
          <p class=""><span>Timezone:</span>${location.timezone.name}</p>
        </div>
      </article> 
`;
  countriesContainer.insertAdjacentHTML('beforeend', HTML);
  countriesContainer.style.opacity = 1;
};

const whereAmI = (lat, lng) => {
  countriesContainer.textContent = '';
  // console.log(`Input received from front-end: ${lat}, ${lng}`);
  let requestOptions = {
    method: 'GET',
  };
  const api_key = '600b912e6162401cb1f70065fa38fc35'; // disposable key // hardcoded
  // const url = `https://geocode.xyz/${lat},${lng},?geoit=json`;
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${api_key}`;
  // fetch(url, { params })
  return (
    fetch(url, requestOptions)
      // fetch(url)
      .then(response => {
        // console.log(response.json());
        return response.json();
      })
      .then(response => {
        // console.log(response.features[0]?.properties);
        // })
        //   // console.log(response.features[0].properties);
        if (!response.features[0]?.properties) {
          throw new Error('Request fail, check your coodinates');
        }
        // console.log(response.features[0].properties);
        // return response.features[0].properties;
        console.log('request succed');
        console.log(response);
        return response;
      })
      .catch(error => {
        console.log(error);
      })
  );
};

const locateMe = () => {
  countriesContainer.textContent = '';

  let requestOptions = {
    method: 'GET',
  };
  const api_key = '600b912e6162401cb1f70065fa38fc35';

  let url = '';
  return getPosition()
    .then(response => {
      // console.log(response);
      // return;
      const { latitude: lat, longitude: lng } = response.coords;
      url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${api_key}`;
      fetch(url, requestOptions)
        // fetch(url)
        .then(response => {
          // console.log(response.json());
          return response.json();
        })
        .then(response => {
          if (!response.features[0]?.properties) {
            throw new Error('Request fail, check your coodinates');
          }
          return response;
        })
        .then(response => {
          if (location === undefined) {
            let err = `could not find your coordinates. please check Latitude:${loc.latitude} and Longitude: ${loc.longitude}`;
            alert(err);
            throw new Error(err);
          }
          renderLocation(response.features[0].properties);
          return response;
        })
        .then(response =>
          getCountryData(response.features[0].properties.country)
        );
    })
    .catch(error => {
      console.log(error);
    });
};

const formWhereAmI = document.querySelector('.whereIam');
const inputLatitude = document.getElementById('latitude');
const inputLongitude = document.getElementById('longitude');

const verifyInputs = input => input.every(input => input > 0);

formWhereAmI.addEventListener('submit', function (e) {
  e.preventDefault();
  let loc = [];
  loc['latitude'] = inputLatitude.value;
  loc['longitude'] = inputLongitude.value;

  // verify if values are greater than zero and not letters
  if (!verifyInputs(loc))
    throw new Error('please verify latidude or longitude. Must be numbers.');
  // console.log(inputLatitude.value, inputLongitude.value);
  console.log('after receiving in front-end');
  console.log(loc.latitude, loc.longitude);
  console.log('after receiving in front-end');

  // TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
  // TEST COORDINATES 2: 19.037, 72.873
  // TEST COORDINATES 2: -33.933, 18.474
  // whereAmI('-33.933', '18.474')
  whereAmI(loc.latitude, loc.longitude)
    .then(response => {
      if (location === undefined) {
        let err = `could not find your coordinates. please check Latitude:${loc.latitude} and Longitude: ${loc.longitude}`;
        alert(err);
        throw new Error(err);
      }
      renderLocation(response.features[0].properties);
      return response;
    })
    .then(response => getCountryData(response.features[0].properties.country))
    .catch(error => {
      console.log(error);
    });
});

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(() => {
//       position => resolve(position), err => reject(err);
//     });
//   });
// };

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// btn.addEventListener('click', alert('asdasdsadas'));
btn.addEventListener('click', locateMe);
// getPosition().then(response => console.log(response));
// });

// TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
// TEST COORDINATES 2: 19.037, 72.873
// TEST COORDINATES 2: -33.933, 18.474
// whereAmI('-33.933', '18.474');
// whereAmI('-33.933', '18.474');
// whereAmI('-33.933', '18.474');
