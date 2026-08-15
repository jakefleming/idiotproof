import { CONFIG } from './config.js';
import * as AppCore from './app-core.js';
import { localStorageClear, saveEditableContent, saveInputValue, isLocal } from './utils.js';

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
window.handleSliderInput = AppCore.handleSliderInput;
window.updateSliderNodes = AppCore.updateSliderNodes;
window.applyNamedInstance = AppCore.applyNamedInstance;
window.applyMasterInstance = AppCore.applyMasterInstance;
window.snapToInstanceValue = AppCore.snapToInstanceValue;
window.insertField = AppCore.insertField;
window.clearSecondaryFont = AppCore.clearSecondaryFont;
window.localStorageClear = localStorageClear;
window.saveEditableContent = saveEditableContent;
window.saveInputValue = saveInputValue;

const init = (forceServerLoad = false) => {
	try {
	  if (forceServerLoad || !isLocal()) {
		AppCore.serverLoad();
		// Hosted only (idiotproofed.com etc.) — reveals the Hellbox promo.
		document.body.classList.add('is-server');
	  } else {
		AppCore.localLoad();
	  }

	  AppCore.setupEventListeners();
	  document.body.classList.add('loaded');
  
	} catch (error) {
	  console.error('Error during initialization:', error);
	}
  };

// ?hosted forces the idiotproofed.com code path on localhost for testing.
document.addEventListener('DOMContentLoaded', () =>
  init(new URLSearchParams(location.search).has('hosted')));