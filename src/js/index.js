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

const init = () => {
	try {
	  if (['localhost', '127.0.0.1', ''].includes(location.hostname)) {
		AppCore.localLoad();
	  } else {
		AppCore.serverLoad();
	  }
  
	  AppCore.setupEventListeners();
	  document.body.classList.add('loaded');
  
	} catch (error) {
	  console.error('Error during initialization:', error);
	}
  };

document.addEventListener('DOMContentLoaded', init);