import { errorRef } from "./refs";

export default function showError(message) {
  errorRef.textContent = message;
  errorRef.classList.remove('hidden');
}