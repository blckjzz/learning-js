'use strict';

class App {
  #mapEvent;
  #map;
  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkOut.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    // console.log(this);
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function (e) {
          alert('could not load location');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, 15);
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    // get user's click on the map
    this.#map.on('click', e => {
      this.#mapEvent = e; // This now refers to the class instance correctly
      this._showHideForm(true);
    });
  }
  _showHideForm(hidden = false) {
    inputDistance.focus();
    if (hidden == false) {
      hidden ? form.classList.remove('hidden') : form.classList.add('hidden');
    } else {
      hidden ? form.classList.remove('hidden') : form.classList.add('hidden');
      // clear form fields
      form.reset();
    }
  }
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkOut(e) {
    e.preventDefault();
    // show form
    const { lat, lng } = this.#mapEvent.latlng;
    console.log(lat, lng);
    // console.log(inputDistance.value);
    let type = 'running-popup';
    type = type ? 'running-popup' : 'cycling-popup';
    L.marker([lat, lng])
      .addTo(this.#map)
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
    // show hide form
    this._showHideForm();
  }
}

class Workout {
  constructor() {}
  // constructor(id, distance, duration, coords, date){
  //   this.id: id,
  //   distance:,
  //   duration:,
  //   coords:,
  //   date:
  // }
}

class Running extends Workout {
  constructor(name, cadence, pace) {}
}

class Cycling extends Workout {
  constructor(name, elevationGain, speed) {}
}

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

const app = new App();
