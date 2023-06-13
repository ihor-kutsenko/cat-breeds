import { fetchBreeds } from './cat-api';

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
  // breedSelectRef.addEventListener('change', handleBreedSelectChange);
}

showBreeds();

