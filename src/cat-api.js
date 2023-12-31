import Notiflix from 'notiflix';
import axios from "axios";

const BASE_URL = 'https://api.thecatapi.com/v1/';
const api_key = 'live_dBc4fojOrDESHLNCbpbJ45KUaEhuj84Kw5rhVztHg1MHrhqWXOgCU9j784cwbTN8';

export async function fetchBreeds() {
  try {
    const response = await axios.get(`${BASE_URL}breeds?api_key=${api_key}`);
    console.log(response);
    return response.data.map(breed => ({
        id: breed.id,
        name: breed.name
      }));
    
  } catch (error) {
    console.log(error);
    Notiflix.Notify.warning('error');
  }
}


export async function fetchCatByBreed(breedId) {

  try {
    const response = await axios.get(`${BASE_URL}images/search?breed_ids=${breedId}&api_key=${api_key}`);
    const data = response.data;
    if (data.length > 0) {
      const cat = data[0];
      const breed = cat.breeds[0];
      return {
        name: breed.name,
        description: breed.description,
        temperament: breed.temperament,
        origin: breed.origin,
        life_span: breed.life_span,
        image: cat.url
      };
    }

   

  } catch (error) {

    console.log(error);
    Notiflix.Notify.warning('error');
  }
  
}