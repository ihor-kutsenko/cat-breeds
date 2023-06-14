import { fetchBreeds, fetchCatByBreed } from './cat-api';

import Notiflix from 'notiflix';
import axios from "axios";

const breedSelectRef = document.querySelector('.breed-select');
const catInfoRef = document.querySelector('.cat-info');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');

loaderRef.classList.add('hidden');
catInfoRef.classList.add('hidden');
errorRef.classList.add('hidden'); 


async function showBreeds() {
  hideCatInfo();
  
  try {
    const breeds = await fetchBreeds();
    renderBreedsSelect(breeds);
      loaderRef.classList.add('hidden');

    
    if (breeds.length > 0) {
        selectedBreedId = breeds[0].id;
        
      } else {
        
        showError('No breeds found.');
    }
    
  } catch (error) {
    loaderRef.classList.add('hidden');
      errorNotiflix();
    
  }
  
}



function renderBreedsSelect(breeds) {
  breedSelectRef.innerHTML = breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
  breedSelectRef.addEventListener('change', showCatByBreed);
}

showBreeds();
hideCatInfo()



async function showCatByBreed(event) {
  hideCatInfo();
  try {
const selectedBreedId = event.target.value;
    const cat = await fetchCatByBreed(selectedBreedId);
    if (cat) {
        renderCatInfo(cat);
      catInfoRef.classList.remove('hidden');
      loaderRef.classList.add('hidden');
      
      } else {
        
        errorRef.classList.remove('hidden');
      }
      
    

    
    

    if (cat.length === 0) {
      errorRef.classList.remove('hidden');
      
    }
    
  } catch (error) {
    loaderRef.classList.add('hidden');
      errorNotiflix();
  }
  
  
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



function hideCatInfo() {
  if (!catInfoRef.classList.contains('hidden')) {
    catInfoRef.classList.add('hidden');
  }
  loaderRef.classList.remove('hidden');
  errorRef.classList.add('hidden'); 
}



function showError(message) {
  errorRef.textContent = message;
  errorRef.classList.remove('hidden');
}

function errorNotiflix() {
  Notiflix.Notify.failure(
    `Oops! Something went wrong! Try reloading the page!`,
    {
      clickToClose: true,
      timeout: 4000,
    }
  );
}