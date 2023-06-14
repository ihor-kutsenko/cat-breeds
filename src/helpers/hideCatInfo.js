import {  catInfoRef, loaderRef, errorRef } from "./refs";

export default function hideCatInfo() {
  if (!catInfoRef.classList.contains('hidden')) {
    catInfoRef.classList.add('hidden');
  }
  loaderRef.classList.remove('hidden');
  errorRef.classList.add('hidden'); 
}