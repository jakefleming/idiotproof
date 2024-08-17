import { CONFIG } from './config.js';
import * as AppCore from './app-core.js';

// Global error handlers
window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled promise rejection:', event.reason);
});

window.addEventListener('error', function(event) {
  console.error('Uncaught error:', event.error);
});

// Make functions globally available
window.setFont = AppCore.setFont;
window.onReadFile = AppCore.onReadFile;
window.setStage = AppCore.setStage;
window.passStyleValue = AppCore.passStyleValue;
window.passfvarValue = AppCore.passfvarValue;
window.passfeatValue = AppCore.passfeatValue;
window.insertField = AppCore.insertField;
window.localStorageClear = AppCore.localStorageClear;

const init = (forceServerLoad = false) => {
	try {
	  if (forceServerLoad || !['localhost', '127.0.0.1', ''].includes(location.hostname)) {
		AppCore.serverLoad();
	  } else {
		AppCore.localLoad();
	  }
  
	  AppCore.setupEventListeners();
	  document.body.classList.add('loaded');
  
	} catch (error) {
	  console.error('Error during initialization:', error);
	}
  };

document.addEventListener('DOMContentLoaded', () => init(false)); // Set to true to force serverLoad