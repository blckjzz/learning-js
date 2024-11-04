'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountryHtml = (data, className = '') => {
  const HTML = `
  
        <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article> 
  `;
  countriesContainer.insertAdjacentHTML('beforeend', HTML);
  countriesContainer.style.opacity = 1;
};
// grass HTTP Request roots
const getCountryData = country => {
  const r = new XMLHttpRequest();
  const endpoint = `https://restcountries.com/v2/name/${country}`;
  r.open('GET', endpoint);
  r.send();

  r.addEventListener('load', () => {
    const [data] = JSON.parse(r.responseText);
    console.log(data);
    renderCountryHtml(data);
    const neighbours = [...data.borders];
    // console.log(neighbours);
    neighbours.forEach(n => {
      const r2 = new XMLHttpRequest();
      const endpoint2 = `https://restcountries.com/v2/alpha/${n}`;
      r2.open('GET', endpoint2);
      r2.send();
      r2.addEventListener('load', () => {
        console.log(r2.responseText);
        const x = JSON.parse(r2.responseText);
        // console.log(x);
        renderCountryHtml(x, 'neighbour');
      });
    });
  });
};

getCountryData('spain');
