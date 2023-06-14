import Notiflix from 'notiflix';

export default function errorNotiflix() {
  Notiflix.Notify.failure(
    `Oops! Something went wrong! Try reloading the page!`,
    {
      clickToClose: true,
      timeout: 4000,
    }
  );
}