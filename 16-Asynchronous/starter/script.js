'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imgContainer = document.querySelector('.images');

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
            <p class="country__row"><span>🗣️</span>${
              data.languages[0]?.name
            }</p>
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
// btn.addEventListener('click', locateMe);

// TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
// TEST COORDINATES 2: 19.037, 72.873
// TEST COORDINATES 2: -33.933, 18.474
// whereAmI('-33.933', '18.474');
// whereAmI('-33.933', '18.474');
// whereAmI('-33.933', '18.474');

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const loadImage = imgPath => {
  return new Promise(function (resolve, reject) {
    let img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', () => {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', () => {
      reject(new Error('Could not load image.'));
    });
  });
};

// let currentImg = '';
// loadImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('loading image.');
//     return wait(2); // waits two seconds
//   })
//   .then(() => {
//     console.log('remove background');
//     currentImg.style.display = 'none';
//     return loadImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('after two seconds this is img promise');
//     return wait(2);
//   })
//   .then(() => {
//     console.log('loading image2.');
//     console.log(currentImg);
//     console.log('remove background');
//     currentImg.style.display = 'none';
//   });

const whereAmI2 = async () => {
  try {
    const api_key = '600b912e6162401cb1f70065fa38fc35'; // disposable key // hardcoded
    const position = await getPosition();
    console.log(position.coords);
    const { latitude: lat, longitude: lng } = position.coords;
    const urlReverseGeoloc = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${api_key}`;
    const countryData = await fetch(urlReverseGeoloc);
    if (!countryData.ok)
      throw new Error('Could not fetch data from your current location.');
    const country = await countryData.json();
    const endpoint2 = `https://restcountries.com/v2/name/${country.features[0].properties.country}`;
    const country2Data = await fetch(endpoint2);
    if (!country2Data.ok)
      throw new Error('Could not fetch data from your current location.');
    const countryInfo = await country2Data.json();
    renderCountryHtml(...countryInfo);
    // console.log(countryInfo);
    // console.log(country);
    return `You are in: ${country.features[0].properties.city}, ${country.features[0].properties.country}`;
  } catch (error) {
    console.error(`${error}`);
    renderError(`${error}`);
  }
};

btn.addEventListener('click', whereAmI2);

// console.log('1: accessing your location...');
// (async function () {
//   try {
//     const city = await whereAmI2();
//     console.log(`2. ${city}`);
//   } catch (error) {
//     console.error(`Something went wrong: ${error}`);
//   }
//   console.log(`3. Finished.`);
// })();

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' 
function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually 
get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const loadAll = async imgArr => {
  try {
    const imgs = [];
    imgArr.map(img => {
      imgs.push(loadImage(img));
    });
    // const imgs = imgArr.map(async img => await loadImage(img));
    const result = await Promise.all(imgs);
    console.log(result);
    result.forEach(r => r.classList.add('parallel'));
  } catch (err) {
    console.error('An error occurr while loading the image:', err);
    renderError(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

// let currentImg = '';
// loadImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('loading image.');
//     return wait(2); // waits two seconds
//   })
//   .then(() => {
//     console.log('remove background');
//     currentImg.style.display = 'none';
//     return loadImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('after two seconds this is img promise');
//     return wait(2);
//   })
//   .then(() => {
//     console.log('loading image2.');
//     console.log(currentImg);
//     console.log('remove background');
//     currentImg.style.display = 'none';
//   });

// let currentImg = '';
// (async function () {
//   console.log('loading image1.');
//   const img = await loadImage('img/img-1.jpg');
//   await wait(2);
//   currentImg = img;
//   currentImg.style.display = 'none';
//   console.log('loading image2.');
//   const img2 = await loadImage('img/img-2.jpg');
//   currentImg = img2;
//   await wait(2);
//   console.log('after two seconds this is img promise. removing image');
//   currentImg.style.display = 'none';
// })();

// loadImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('loading image.');
//     return wait(2); // waits two seconds
//   })
//   .then(() => {
//     console.log('remove background');
//     currentImg.style.display = 'none';
//     return loadImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('after two seconds this is img promise');
//     return wait(2);
//   })
//   .then(() => {
//     console.log('loading image2.');
//     console.log(currentImg);
//     console.log('remove background');
//     currentImg.style.display = 'none';
//   });
