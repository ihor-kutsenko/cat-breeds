import { fetchBreeds, fetchCatByBreed } from './cat-api';

import Notiflix from 'notiflix';
import axios from "axios";

const breedSelectRef = document.querySelector('.breed-select');
const catInfoRef = document.querySelector('.cat-info');
const loaderRef = document.querySelector('.loader');

async function showBreeds() {
  const breeds = await fetchBreeds();
  renderBreedsSelect(breeds);
}

function renderBreedsSelect(breeds) {
  breedSelectRef.innerHTML = breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
  breedSelectRef.addEventListener('change', showCatByBreed);
}

showBreeds();



async function showCatByBreed(event) {
  const selectedBreedId = event.target.value;
  const cat = await fetchCatByBreed(selectedBreedId);
  renderCatInfo( cat);
  
}


function renderCatInfo(cat) {
  const {
    name,
    image,
    description,
    temperament,
    origin,
    life_span
  } = cat;

  catInfoRef.innerHTML = `
    <img class="cat-img" src="${image}" alt="${name}">
    <div class="cat-text">
      <h2 class="cat-header">${name}</h2>
      <p>${description}</p>
      <p><span><b>Temperament: </b></span>${temperament}</p>
      <p><span><b>Origin: </b></span>${origin}</p>
      <p><span><b>Life Span: </b></span>${life_span}</p>
    </div>`;
}