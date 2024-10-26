'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//get user's current geolocaltion
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (currentPosition) {
      console.log(currentPosition);
      //   const coords = [];
      //   coords['latitude'] = currentPosition.coords.latitude;
      //   coords['longitude'] = currentPosition.coords.longitude;
      const { latitude } = currentPosition.coords;
      const { longitude } = currentPosition.coords;
      const coordinates = [latitude, longitude];
      //   console.log(coords);
      var map = L.map('map').setView(coordinates, 15);

      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('click', function (eventMap) {
        console.log(eventMap);
        const { lat, lng } = eventMap.latlng;
        console.log(lat, lng);

        let type = 'running-popup';
        type = type ? 'running-popup' : 'cycling-popup';

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 150,
              autoClose: false,
              closeOnClick: false,
              className: type,
              content: `<p>${type}</p>`,
            })
          )
          //   .setPopupContent('Hello world!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
          .openPopup();
      });
    },
    () =>
      alert(
        'Could not read your current location. Please make sure to allow it.'
      )
  );
