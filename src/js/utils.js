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
    if (el) {
      el.style.display = message && message.trim().length > 0 ? 'block' : 'none';
      el.textContent = message;
    } else {
      console.error('Message element not found. Error message:', message);
    }
  };
  
  export const uint8ToBase64 = (buffer) => {
    const chunk = 8192;
    let result = '';
    for (let i = 0; i < buffer.length; i += chunk) {
      const slice = buffer.subarray(i, i + chunk);
      result += String.fromCharCode.apply(null, slice);
    }
    return btoa(result);
  };
  
  export const sanitizeId = (id) => {
    return id.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  };

  export const localStorageClear = () => {
    localStorage.clear();
    localStorage.setItem('proofingPhase', CONFIG.defaultProofingPhase);
    location.reload();
  };

  export function toggleMode() {
    const body = document.body;
    const currentMode = localStorage.getItem('colorMode') || 'light';
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    
    // Save the new mode
    localStorage.setItem('colorMode', newMode);
    
    // Update UI
    if (newMode === 'light') {
      body.removeAttribute('data-theme');
      document.querySelector('#btn__mode-toggle .material-symbols-outlined').textContent = 'light_mode';
    } else {
      body.setAttribute('data-theme', 'dark');
      document.querySelector('#btn__mode-toggle .material-symbols-outlined').textContent = 'dark_mode';
    }
  }
  export function toggleSettingsVisibility() {
    const settingsToggle = document.getElementById('btn__settings-toggle');
    const body = document.body;
    body.classList.toggle('settings-visible');
    settingsToggle.classList.toggle('settings-visible');
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
  
  export const calculateTypeScale = (baseSize = 14, ratio = 1.618, steps = 6) => {
    const sizes = {
      't__size-xxl': Math.round(baseSize * Math.pow(ratio, 5)),
      't__size-xl':  Math.round(baseSize * Math.pow(ratio, 4)),
      't__size-l':   Math.round(baseSize * Math.pow(ratio, 3)),
      't__size-m':   Math.round(baseSize * Math.pow(ratio, 2)),
      't__size-s':   Math.round(baseSize * Math.pow(ratio, 1)),
      't__size-xs':  baseSize
    };
    return sizes;
  };
  
  export const whichFontSize = (text, baseSize = 14, ratio = 1.618) => {
    if (!text) return baseSize.toString();
  
    const sizes = calculateTypeScale(baseSize, ratio);
    
    const charCount = text.length;
    if (charCount < 25) return sizes['t__size-xxl'];
    if (charCount < 50) return sizes['t__size-xl'];
    if (charCount < 95) return sizes['t__size-l'];
    if (charCount < 200) return sizes['t__size-m'];
    if (charCount < 1000) return sizes['t__size-s'];
    return sizes['t__size-xs'];
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
  
  // Save content of a contenteditable element to localStorage
  export const saveEditableContent = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with ID ${elementId} not found`);
      return;
    }
    
    const content = element.innerText;
    localStorage.setItem(elementId, content);
  };

  // Save value of an input element to localStorage
  export const saveInputValue = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with ID ${elementId} not found`);
      return;
    }
    
    localStorage.setItem(elementId, element.value);
  };

  // Get content from localStorage or return default
  export const getStoredContent = (elementId, defaultContent = '') => {
    return localStorage.getItem(elementId) || defaultContent;
  };
  
  export function initColorMode() {
	const savedMode = localStorage.getItem('colorMode') || 'light';
	const body = document.body;
  
	if (savedMode === 'dark') {
	  body.setAttribute('data-theme', 'dark');
	  document.querySelector('#btn__mode-toggle .material-symbols-outlined').textContent = 'dark_mode';
	} else {
	  body.removeAttribute('data-theme');
	  document.querySelector('#btn__mode-toggle .material-symbols-outlined').textContent = 'light_mode';
	}
  }
  