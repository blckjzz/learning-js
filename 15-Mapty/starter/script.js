'use strict';

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  // clicks = 0;
  constructor(distance, duration, coords) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords; // [latitude, longitude]
  }
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `You practiced ${this.type} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
  // _clicks() {
  //   this.clicks++;
  // }
}

class Running extends Workout {
  type = 'running';
  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this._calcPace();
    this._setDescription();
  }

  _calcPace() {
    this.pace = this.distance / (this.duration / 60);
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(distance, duration, coords, elevationGain) {
    super(distance, duration, coords);
    this.elevationGain = elevationGain;
    this._calcSpeed();
    this._setDescription();
  }
  _calcSpeed() {
    this.speed = this.duration / this.distance;
  }
}

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #mapEvent;
  #map;
  workouts = [];
  constructor() {
    this._getPosition();
    this._getLocalStorage();
    form.addEventListener('submit', this._newWorkOut.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener(
      'click',
      this._locateToMapElement.bind(this)
    );
  }

  _locateToMapElement(e) {
    const mapElement = e.target.closest('.workout');
    if (!mapElement) return;
    const workout = this.workouts.find(w => w.id === mapElement.dataset.id);
    workout._clicks();
    this.#map.setView(workout.coords, 15);
  }

  _getPosition() {
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

    this.workouts.forEach(w => {
      this._renderMaker(w);
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

  _renderMaker(workout) {
    // const validateInputs = (...inputs) =>
    // const type = verifyWorkoutType(workout);

    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 150,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
          content: `<p>${workout.description}</p>`,
        })
      )
      //   .setPopupContent('Hello world!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      .openPopup();
    // show hide form
    this._showHideForm();
  }

  _newWorkOut(e) {
    e.preventDefault();
    let workout;
    const { lat, lng } = this.#mapEvent.latlng;
    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);

    const validateInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    if (type === 'running') {
      const cadence = Number(inputCadence.value); // running
      if (
        !validateInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        return alert('Invalid inputs, please verify');
      }
      workout = new Running(distance, duration, [lat, lng], cadence);
    }

    if (type === 'cycling') {
      const elevation = Number(inputElevation.value); // cycling
      if (
        !validateInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        return alert('Invalid inputs, please verify');
      }
      workout = new Cycling(distance, duration, [lat, lng], elevation);
    }

    // create marker
    this.workouts.push(workout);
    this._renderMaker(workout);
    this._renderWorkout(workout);
    this._setLocalStorage();
  }

  _renderWorkout(workout) {
    let workoutItemHTML = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
      </div>
      <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${
        workout.type === 'running'
          ? workout.pace.toFixed(1)
          : workout.speed.toFixed(1)
      }</span>
      <span class="workout__unit">${
        workout.type === 'running' ? 'min/km' : 'km/h'
      }</span>
      </div>
      <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'running' ? '🦶🏼' : '⛰'
      }</span>
      <span class="workout__value">${
        workout.type === 'running' ? workout.cadence : workout.elevationGain
      }</span>
      <span class="workout__unit">${
        workout.type === 'running' ? 'spm' : 'm'
      }</span>
      </div>
    </li>
    `;
    // Append the new workout item to the list
    form.insertAdjacentHTML('afterend', workoutItemHTML);
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.workouts));
  }
  _getLocalStorage() {
    const workoutsStorage = JSON.parse(localStorage.getItem('workouts'));
    if (!workoutsStorage) return;
    this.workouts = workoutsStorage;
    workoutsStorage.forEach(w => {
      this._renderWorkout(w);
    });
  }

  _reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
