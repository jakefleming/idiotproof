import { CONFIG } from './config.js';
  
  // utils.js
  export const getFormattedDate = () => {
    const now = new Date();
    return now.toJSON().slice(0, 10).replace(/-/g, '/');
  };
  
  export const preserveUnique = (arr) => {
    return [...new Set(arr)];
  };
  
  export const showErrorMessage = (message) => {
    const el = document.getElementById('message');
    el.style.display = message && message.trim().length > 0 ? 'block' : 'none';
    el.textContent = message;
  };
  
  export const uint8ToBase64 = (buffer) => {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
  };
  
  export const localStorageClear = () => {
    localStorage.clear();
    localStorage.setItem('proofingPhase', CONFIG.defaultProofingPhase);
    location.reload();
  };

  export function toggleMode() {
	const body = document.body;
	if (body.getAttribute('data-theme') === 'dark') {
	  body.removeAttribute('data-theme');
	  document.querySelector('#btn__mode-toggle .material-symbols-outlined').textContent = 'light_mode';
	} else {
	  body.setAttribute('data-theme', 'dark');
	  document.querySelector('#btn__mode-toggle .material-symbols-outlined').textContent = 'dark_mode';
	}
  }

  export function toggleUi() {
	const toggleUIButton = document.getElementById('btn__ui-toggle');
	const body = document.body;
  
	body.classList.toggle('ui-hidden');
	this.classList.toggle('ui-hidden');
	
	// Optionally, you can save the state to localStorage
	localStorage.setItem('uiHidden', body.classList.contains('ui-hidden'));
  
	// Check if the UI was hidden in a previous session
	if (localStorage.getItem('uiHidden') === 'true') {
	  body.classList.add('ui-hidden');
	  toggleUIButton.classList.add('ui-hidden');
	}
  }
  
  export const whichFontSize = (string) => {
    const sizes = {
      't__size-xxl': '140',
      't__size-xl': '100',
      't__size-l': '84',
      't__size-m': '56',
      't__size-s': '28',
      't__size-xs': '14',
    };
  
    if (sizes[string]) return sizes[string];
  
    const charCount = string.length;
    if (charCount < 25) return 't__size-xxl';
    if (charCount < 50) return 't__size-xl';
    if (charCount < 95) return 't__size-l';
    if (charCount < 200) return 't__size-m';
    if (charCount < 1000) return 't__size-s';
    return 't__size-xs';
  };
  
  export const removeElementsByClass = (className) => {
    document.querySelectorAll(`.${className}`).forEach(el => el.remove());
  };
  
  export const removeElementById = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.transition = 'opacity 0.5s ease';
      element.style.opacity = '0';
      setTimeout(() => element.remove(), 500);
    }
  };
  
  export const saveData = (id, value) => {
    if (typeof Storage !== 'undefined') {
      if (value !== 'thisContent') {
        localStorage.setItem(id, value);
      } else {
        const content = document.getElementById(id).textContent;
        localStorage.setItem(id, content);
      }
    }
  };
  