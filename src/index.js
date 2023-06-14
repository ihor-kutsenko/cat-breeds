import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { breedSelectRef, catInfoRef, loaderRef, errorRef } from './helpers/refs';
import errorNotiflix from './helpers/errorNotiflix';
import hideCatInfo from './helpers/hideCatInfo';
import showError from './helpers/showError';

import Notiflix from 'notiflix';
import axios from "axios";



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
hideCatInfo();



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









