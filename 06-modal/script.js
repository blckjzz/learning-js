'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnModal = document.querySelectorAll('.show-modal');
const bntCloseModal = document.querySelector('.close-modal');

for (let i = 0; i < btnModal.length; i++) {
  btnModal[i].addEventListener('click', showHide);
}

bntCloseModal.addEventListener('click', showHide);

overlay.addEventListener('click', showHide);

addEventListener('keydown', event => {
  if (event.key === 'Escape' && !overlay.classList.contains('hidden')) {
    showHide();
  }
});

function showHide() {
  modal.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
}
