import { CONFIG } from './config.js';
import { getFormattedDate,
	preserveUnique,
	showErrorMessage,
	uint8ToBase64,
	localStorageClear,
	whichFontSize,
	removeElementsByClass,
	saveData,
	toggleMode,
	toggleSettingsVisibility,
	toggleUi,
	saveEditableContent,
	saveInputValue,
	getStoredContent,
	calculateTypeScale,
	initColorMode  } from './utils.js';

// Re-export localStorageClear
export { localStorageClear, clearSecondaryFont };

let font = null;
const fontFormats = {
    truetype: 'ttf',
    opentype: 'otf',
};

export const onFontLoaded = (loadedFont, fontFamilySource, fontFamily) => {
	return new Promise(async (resolve, reject) => {
	  try {
		font = loadedFont;
		console.log(`Font assigned globally: ${fontFamily}`);
		
		// Create and load the font face first
		if ('FontFace' in window) {
		  const fontFace = new FontFace(
			fontFamily,
			`url('${fontFamilySource}')`,
			{ format: loadedFont.outlinesFormat === 'truetype' ? 'truetype' : 'opentype' }
		  );

		  // Wait for the font to load
		  await fontFace.load();
		  document.fonts.add(fontFace);
		  console.log(`Font loaded successfully: ${fontFamily}`);
		}

		// Create and apply the font-face rule for browsers without FontFace API
		const fontFaceRule = `
		  @font-face {
			font-family: '${fontFamily}';
			src: url('${fontFamilySource}') format('${loadedFont.outlinesFormat === 'truetype' ? 'truetype' : 'opentype'}');
		  }
		`;
		const style = document.createElement('style');
		style.textContent = fontFaceRule;
		document.head.appendChild(style);
		console.log(`Font-face rule applied: ${fontFaceRule}`);
  
		window.fontFamily = fontFamily;
		console.log(`Window.fontFamily set to: ${fontFamily}`);
  
		// Wait for font to be ready before displaying data
		await document.fonts.ready;
		await displayFontData(fontFamily);
  
		if (['localhost', '127.0.0.1', ''].includes(location.hostname)) {
		  localStorage.setItem('fontFamily', fontFamily);
		  localStorage.setItem('fontFamilySource', fontFamilySource);
		  console.log(`Font information saved to localStorage`);
		}
  
		// Get current stage before setting new one
		const currentStage = document.querySelector('.btn__stage.active')?.dataset?.stage 
			|| localStorage.getItem('proofingPhase') 
			|| window.proofingPhase 
			|| 'Hamburgers';
  
		await setStage(currentStage);
		
		console.log(`Stage set successfully`);
		resolve();
	  } catch (error) {
		console.error('Error in onFontLoaded:', error);
		reject(error);
	  }
	});
  };

export const onReadFile = (event) => {
	const files = event.target.files;
	const fileButtonParent = document.getElementById('section__header-file-buttons');
	fileButtonParent.innerHTML = '';

	// First add navigation
	const navGroup = generateFontNavigation();
	fileButtonParent.appendChild(navGroup);

	// Then add font buttons
	generateFontButtons(Array.from(files), 'server')
	  .then(container => {
		fileButtonParent.appendChild(container);
		// Activate the first button automatically
		const firstButton = container.querySelector('.btn__setfont');
		if (firstButton) {
		  firstButton.click();
		}
	  });
};

  const readSingleFile = (file) => {
	return new Promise((resolve, reject) => {
	  const reader = new FileReader();
	  
	  reader.onload = async (e) => {
		try {
		  console.log(`File read successfully: ${file.name}`);
		  const font = opentype.parse(e.target.result);
		  console.log(`Font parsed successfully: ${font.names.postScriptName.en}`);
		  const fontFamily = font.names.postScriptName.en;
		  const fontFamilySource = `fonts/${fontFamily}`;
		  
		  await onFontLoaded(font, fontFamilySource, fontFamily);
  
		  font.file = {
			name: file.name,
			lastModified: file.lastModified,
			size: file.size,
			type: file.type,
		  };
		  font.type = 'user:local';
  
		  const tempUint8array = new Uint8Array(e.target.result);
		  const isVariableFont = font.tables.fvar !== undefined;
  
		  // Set the @font-face rule
		  const fontFaceRule = `@font-face {font-family:'${fontFamily}'; src: url('data:font/ttf;base64,${uint8ToBase64(tempUint8array)}') format('truetype');}`;
		  document.getElementById('style__fontface').innerHTML += fontFaceRule;
		  console.log(`Font-face rule added: ${fontFaceRule}`);
  
		  console.log(`Loaded font: ${fontFamily}, Variable: ${isVariableFont}`);
  
		  showErrorMessage('');
		  resolve();
		} catch (err) {
		  console.error('Error parsing font:', err);
		  showErrorMessage(`Error loading font: ${err.message}`);
		  reject(err);
		}
	  };
  
	  reader.onerror = (err) => {
		console.error('Error reading file:', err);
		showErrorMessage(err.toString());
		reject(err);
	  };
  
	  reader.readAsArrayBuffer(file);
	});
  };

export const setFont = async (fontPath, fontName) => {
	console.log(`Attempting to load font: ${fontName} from ${fontPath}`);
	opentype.load(fontPath, (err, loadedFont) => {
	  if (err) {
		console.error('Error loading font:', err);
		showErrorMessage(`Error loading font: ${err}`);
	  } else {
		console.log(`Font loaded successfully: ${fontName}`);
		font = loadedFont; // Ensure this is set globally
		try {
		  onFontLoaded(loadedFont, fontPath, fontName);
		  // After the font is loaded and processed, set the stage
		  setStage(localStorage.getItem('proofingPhase') || 'Hamburgers');
		} catch (error) {
		  console.error('Error in onFontLoaded:', error);
		  showErrorMessage(`Error processing font: ${error}`);
		}
	  }
	});
};

export const displayFontData = async (fontFamily) => {
    var tablename, table, property, value, tag;
    var styles = '';

    for (tablename in font.tables) {
        table = font.tables[tablename];
        
        if (tablename === 'name') {
            let nameHtml = '';
            if (font.names.postScriptName) {
                var postScriptName = font.names.postScriptName.en;
            } else {
                var postScriptName = "Untitled Font";
            }

            // Get version from head table
            const version = font.tables.head.fontRevision;
            // Format version to 2 decimal places
            const formattedVersion = `Ver ${version}`;
            
			nameHtml += `<div class="section__header-name-font" spellcheck="false">${postScriptName}</div>`;
            nameHtml += `<div class="section__header-name-version" spellcheck="false">${formattedVersion}</div>`;
            styles += `.t__importedfontfamily { font-family: "${fontFamily}" }`;

            // Get and format the font's modification date
            const modifiedDate = font.tables.head.modified;
            const formattedDate = `Last edited ${new Date(modifiedDate * 1000).toLocaleDateString()}`;
            nameHtml += `<div class="section__header-name-date">${formattedDate}</div>`;
            
            document.getElementById('section__header-names').innerHTML = nameHtml;
            continue;
        }
    }

    // Apply styles only after font is loaded
    document.getElementById('style__fontfamily').innerHTML = styles;
    
    // Set stage after font is ready
    const currentStage = document.querySelector('.btn__stage.active')?.dataset?.stage 
        || localStorage.getItem('proofingPhase') 
        || window.proofingPhase 
        || 'Hamburgers';
    
    setStage(currentStage);
};

export const setStage = (stage) => {
	const article = document.getElementById('section__article-app');
	const stageButtons = document.getElementById('section__header-stage-buttons');
	
	if (!font) {
	  console.warn('Font not loaded yet. Deferring stage setting.');
	  window.pendingStage = stage;
	  return;
	}
  
	fetch(CONFIG.jsonPath)
	  .then(response => response.json())
	  .then(proof => {
		const html = generateStageHtml(proof, stage);
		const buttonHtml = generateStageButtons(proof, stage);
  
		article.innerHTML = html;
		stageButtons.innerHTML = buttonHtml;
		document.getElementById('style__opentype-features').innerHTML = '';
		
		saveData('proofingPhase', stage);
  
		// Initialize type scale after rendering
		initTypeScale();
  
		const lockDimensions = localStorage.getItem('lockProofDimensions') === 'true';
		applyLockProofDimensions(lockDimensions);
	  })
	  .catch(error => console.error('Error loading JSON:', error));
  };
  
const generateStageHtml = (proof, stage) => {
  if (!proof[stage]) {
    return '<div class="item d-flex t__center"><div class="item__proof">No features found! :...(</div></div>';
  }

  const fontName = font.names.postScriptName.en;
  const version = font.tables.head.fontRevision;
  const formattedVersion = `Ver ${version}`;

  const gsubFeatures = font.tables.gsub?.features || {};
  const taglist = Object.values(gsubFeatures)
    .filter(feature => typeof feature === 'object' && feature.tag)
    .map(feature => feature.tag)
    .filter(tag => {
      return proof["Features"][tag] !== undefined || tag.startsWith('ss');
    });

  let html = '';

  // Generate standard proof windows from JSON
  for (const title in proof[stage]) {
    if (stage === "Features" && !taglist.includes(title)) {
      continue;
    }

    const textClass = whichFontSize(proof[stage][title]);
    const testAreaID = `section__proofing-${title}`;
    const itemID = `item--${title}`;
    const sliderID = `${itemID}`;
    
    const { fontSize, lineHeight, letterSpacing, inlineStyle } = getStoredStyles(sliderID, textClass);
    const fvarStyle = generateFvarStyle(itemID);

    html += `
      <div id="${itemID}" class="item">
        <button class="btn btn-link add-item-above chip" onclick="insertField('${itemID}')">+ Add Proof Window</button>
        <div class="item__container d-flex">
          <div class="item__sliders pt-2">
            <div class="item__sliders-wrapper">
              ${generateSliders(itemID, sliderID, fontSize, lineHeight, letterSpacing)}
              ${generateVariableSliders(itemID, sliderID)}
              ${generateStyleButtons(itemID)}
              ${generateFeatureCheckboxes(itemID, proof, taglist)}
            </div>
          </div>
          <div class="item__proof ratio-letter">
            <button class="btn btn-link remove-item-this invisible" onclick="removeElementsByID('${itemID}')">×</button>
            ${generateProofContent(stage, title, proof, testAreaID, fvarStyle, textClass)}
            <div class="item__footer d-flex justify-content-between">
              <span class="item__footer-name-font">${fontName}</span>
              <span class="item__footer-name-version">${formattedVersion}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  // Add custom proof windows for this stage
  const customWindows = JSON.parse(localStorage.getItem('customProofWindows') || '{}');
  if (customWindows[stage] && customWindows[stage].length > 0) {
    for (const customItemId of customWindows[stage]) {
      // Fixed: Create correct IDs for custom windows
      const testAreaID = `section__proofing-custom-${customItemId}`;
      
      // Fixed: Use stored values with proper fallbacks
      const { fontSize, lineHeight, letterSpacing, inlineStyle } = getStoredStyles(customItemId, 'text-xl');
      const fvarStyle = generateFvarStyle(customItemId);
      
      // Fixed: Get stored content with proper fallback values
      const savedTitle = localStorage.getItem(`${testAreaID}-title`) || 'Custom Proof Window';
      const savedContent = localStorage.getItem(testAreaID) || 'This is a custom proof window. Type your text here.';

      html += `
        <div id="${customItemId}" class="item custom-item">
          <button class="btn btn-link add-item-above chip" onclick="insertField('${customItemId}')">+ Add Proof Window</button>
          <div class="item__container d-flex">
            <div class="item__sliders pt-2">
              <div class="item__sliders-wrapper">
                ${generateSliders(customItemId, customItemId, fontSize, lineHeight, letterSpacing)}
                ${generateVariableSliders(customItemId, customItemId)}
                ${generateStyleButtons(customItemId)}
                ${generateFeatureCheckboxes(customItemId, proof, taglist)}
                <div class="mt-2">
                  <button class="btn btn-sm btn-danger d-flex align-items-center g-1" onclick="removeCustomProofWindow('${customItemId}')">
                    <span class="material-symbols-outlined">delete</span>
                    Remove this window
                  </button>
                </div>
              </div>
            </div>
            <div class="item__proof ratio-letter">
              <div class="d-flex justify-content-between">
                <h6 class="h6" contentEditable="true" 
                    id="${testAreaID}-title"
                    onkeyup="saveEditableContent('${testAreaID}-title')">${savedTitle}</h6>
              </div>
              <div class="testarea-container">
                <div id="${testAreaID}" 
                     style="${inlineStyle} ${fvarStyle}" 
                     class="t__importedfontfamily testarea" 
                     contenteditable="true" 
                     spellcheck="false" 
                     onkeyup="saveEditableContent('${testAreaID}')">
                  ${savedContent}
                </div>
              </div>
              <div class="item__footer d-flex justify-content-between">
                <span class="item__footer-name-font">${fontName}</span>
                <span class="item__footer-name-version">${formattedVersion}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }
  
  return html;
};

// Also add debug logging to troubleshoot any remaining issues
const saveCustomProofWindow = (itemId, stage) => {
  const customWindows = JSON.parse(localStorage.getItem('customProofWindows') || '{}');
  if (!customWindows[stage]) {
    customWindows[stage] = [];
  }
  if (!customWindows[stage].includes(itemId)) {
    customWindows[stage].push(itemId);
    localStorage.setItem('customProofWindows', JSON.stringify(customWindows));
    console.log(`Added custom window "${itemId}" to stage "${stage}"`);
    console.log('Custom windows:', JSON.stringify(customWindows));
  }
};

const getStoredStyles = (itemID, textClass) => {
  const typeScale = parseFloat(document.getElementById('select__type-scale')?.value || 1.618);
  const baseSize = parseFloat(document.getElementById('input__base-font-size')?.value || 14);
  const content = document.querySelector(`#${itemID} .testarea`)?.textContent || textClass;
  const fontSize = getItemFontSize(itemID, content, baseSize, typeScale);
  const lineHeight = getItemLineHeight(itemID);
  const letterSpacing = localStorage.getItem(`${itemID}-letterSpacing`) || '0';
  const columnCount = localStorage.getItem(`${itemID}-column-count`) || '1';
  const columnGap = localStorage.getItem(`${itemID}-column-gap`) || '1em';

  const inlineStyle = `
    font-size: ${fontSize}pt;
    line-height: ${lineHeight};
    letter-spacing: ${letterSpacing}em;
    column-count: ${columnCount};
    column-gap: ${columnGap};
  `;

  return { fontSize, lineHeight, letterSpacing, columnCount, columnGap, inlineStyle };
};

const generateFvarStyle = (itemID) => {
  let fvarStyle = '';
  if (font.tables.fvar) {
    const fvarSupport = font.tables.fvar.axes.map(axis => axis.tag);
    fvarStyle = 'font-variation-settings: ' + 
      font.tables.fvar.axes.map(axis => {
        const storedValue = localStorage.getItem(`${itemID}-${axis.tag}-val`);
        const value = storedValue !== null ? storedValue : axis.defaultValue;
        return `'${axis.tag}' ${value}`;
      }).join(', ') + ';';
  }
  return fvarStyle;
};

const generateSliders = (itemID, sliderID, fontSize, lineHeight, letterSpacing) => {
  const hasCustomLineHeight = localStorage.getItem(`${itemID}-lineHeight`) !== null;
  const hasCustomFontSize = localStorage.getItem(`${itemID}-fontSize`) !== null;
  const hasCustomLetterSpacing = localStorage.getItem(`${itemID}-letterSpacing`) !== null;
  
  return `
    <div>
      <label for="${sliderID}-fontSize">Font Size</label>
      <span class="t__right text-small" id="${sliderID}-fontSize-val">${fontSize}pt</span>
      <span class="t__right material-symbols-outlined remove" onclick="removeStyleValue('${itemID}', 'fontSize')">clear</span>
      <input id="${sliderID}-fontSize" type="range" class="slider ${hasCustomFontSize ? 'modified' : ''}" 
        min="4" max="160" step="2" value="${fontSize}" 
        oninput="passStyleValue('${itemID}', 'fontSize', this.value)">
    </div>
    <div>
      <label for="${sliderID}-lineHeight">Line Height</label>
      <span class="t__right text-small" id="${sliderID}-lineHeight-val">${lineHeight}</span>
      <span class="t__right material-symbols-outlined remove" onclick="removeStyleValue('${itemID}', 'lineHeight')">clear</span>
      <input id="${sliderID}-lineHeight" type="range" class="slider ${hasCustomLineHeight ? 'modified' : ''}" 
        min="0.6" max="3.0" step="0.01" value="${lineHeight}" 
        oninput="passStyleValue('${itemID}', 'lineHeight', this.value)">
    </div>
    <div>
      <label for="${sliderID}-letterSpacing">Letter Spacing </label>
      <span class="t__right text-small" id="${sliderID}-letterSpacing-val">${letterSpacing}em</span>
      <span class="t__right material-symbols-outlined remove" onclick="removeStyleValue('${itemID}', 'letterSpacing')">clear</span>
      <input id="${sliderID}-letterSpacing" type="range" class="slider ${hasCustomLetterSpacing ? 'modified' : ''}" 
        min="-0.4" max="0.4" step="0.01" value="${letterSpacing}" 
        oninput="passStyleValue('${itemID}', 'letterSpacing', this.value)">
    </div>
  `;
};

const generateVariableSliders = (itemID, sliderID) => {
  if (!font.tables.fvar) return '';

  return font.tables.fvar.axes.map(axis => {
    const storedValue = localStorage.getItem(`${itemID}-${axis.tag}-val`);
    const value = storedValue !== null ? storedValue : axis.defaultValue;
    return `
      <label for="${sliderID}-${axis.tag}">${axis.name.en} </label>
      <span class="t__right text-small" id="${sliderID}-${axis.tag}-val">${value}</span>
      <input id="${sliderID}-${axis.tag}" type="range" class="slider" min="${axis.minValue}" max="${axis.maxValue}" value="${value}" oninput="passfvarValue('${itemID}', '${axis.tag}', this.value, '${font.tables.fvar.axes.map(a => a.tag).join(',')}')">
    `;
  }).join('');
};

export const generateFontButton = async (font, mode = 'local') => {
	let fontName, fontPath, fontType, displayName, isVariable;
  
	if (mode === 'local') {
	  fontName = font.replace('.', '-');
	  fontPath = `fonts/${font}`;
	  displayName = font.replace('-', ' ').replace(/\.[^/.]+$/, "");
	  fontType = font.split('.').pop().toUpperCase();
	  isVariable = await isVariableFont(fontPath);
	} else { // server mode
	  fontName = font.name.replace('.', '-');
	  fontPath = URL.createObjectURL(font);
	  displayName = font.name.replace('-', ' ').replace(/\.[^/.]+$/, "");
	  fontType = font.name.split('.').pop().toUpperCase();
	  isVariable = await isVariableFont(font);
	}
  
	if (isVariable) {
	  fontType = 'VF';
	}
  
	const button = document.createElement('div');
	button.className = 'btn__setfont chip btn d-flex justify-content-between';
	button.title = mode === 'local' ? font : font.name;
	button.id = `btn__setfont-${fontName}`;
	button.innerHTML = `${displayName}<span class="d-flex-grow text-small text-right">${fontType}</span>`;
	
	// Modified onclick handler to support shift-click for secondary font
	button.onclick = (e) => {
	  // Check if shift key is pressed
	  if (e.shiftKey) {
		// If shift is pressed, handle as secondary font
		const isAlreadySecondary = button.classList.contains('secondary');
		
		if (isAlreadySecondary) {
		  // If clicking the same secondary font button, clear secondary font
		  clearSecondaryFont();
		  return;
		}
		
		document.querySelectorAll('.btn__setfont').forEach(btn => {
		  btn.classList.remove('secondary'); // Remove secondary from all buttons
		});
		button.classList.add('secondary'); // Add secondary to this button
		
		// Store and apply the secondary font
		localStorage.setItem('secondaryFontPath', fontPath);
		localStorage.setItem('secondaryFontName', fontName);
		applySecondaryFont(fontPath, fontName);
		
		// Don't remove the active class from the primary font
		return;
	  }
	  
	  // Regular click (primary font) - original behavior
	  document.querySelectorAll('.btn__setfont').forEach(btn => {
		btn.classList.remove('active');
		btn.classList.remove('visited');
		// Keep secondary font selection if exists
		if (!btn.classList.contains('secondary')) {
		  btn.classList.remove('secondary');
		}
	  });
	  
	  // Add active class to clicked button
	  button.classList.add('active');
	  button.classList.add('visited');
	  
	  // Apply as primary font
	  setFont(fontPath, fontName);
	};
  
	return button;
  };
  
const isVariableFont = async (font) => {
	try {
	  let arrayBuffer;
	  if (typeof font === 'string') {
		// Local mode: font is a path
		const response = await fetch(font);
		arrayBuffer = await response.arrayBuffer();
	  } else {
		// Server mode: font is a File object
		arrayBuffer = await font.arrayBuffer();
	  }
	  const parsedFont = opentype.parse(arrayBuffer);
	  return parsedFont.tables.fvar !== undefined;
	} catch (error) {
	  console.error('Error checking if font is variable:', error);
	  return false;
	}
  };
  
const generateFontFaces = (fonts) => {
	return fonts.map(font => {
	  const fontName = font.replace('.', '-');
	  return `@font-face { font-family: "${fontName}"; src: url("fonts/${font}");}`;
	}).join('\n');
  };

window.updateColumns = (itemID) => {
	const columnCount = document.getElementById(`${itemID}-column-count`).value;
	const columnGap = document.getElementById(`${itemID}-column-gap`).value;
	
	passStyleValue(itemID, 'column-count', columnCount);
	passStyleValue(itemID, 'column-gap', columnGap);
  };

const generateStyleButtons = (itemID) => `
  <div id="btn__wrapper-case">
    <label>Case</label>
    <div class="d-flex g-1 btn__wrapper">
      <button class="btn btn-link textTransform-uppercase" title="Uppercase" onclick="passStyleValue('${itemID}','textTransform', 'uppercase')">TT</button>
      <button class="btn btn-link textTransform-capitalize" title="Capitalize" onclick="passStyleValue('${itemID}','textTransform', 'capitalize')">Tt</button>
      <button class="btn btn-link textTransform-lowercase" title="Lowercase" onclick="passStyleValue('${itemID}','textTransform', 'lowercase')">tt</button>
    </div>
  </div>
  <div id="btn__wrapper-columns">
    <label>Columns</label>
    <div class="d-flex g-1 btn__wrapper">
	<span class="text-small">Count</span>
      <input class="input" type="number" id="${itemID}-column-count" min="1" max="6" value="1" onchange="updateColumns('${itemID}')" style="width: 50px;">
	<span class="text-small">Gap</span>
      <input class="input" type="text" id="${itemID}-column-gap" value="10px" onchange="updateColumns('${itemID}')" style="width: 50px;">
    </div>
  </div>
`;

const getFeatureDescription = (font, tag, proof) => {
    if (tag.startsWith('ss')) {
        const ssNum = parseInt(tag.slice(2), 10);
        if (ssNum >= 1 && ssNum <= 20) {
            const nameID = 256 + (ssNum - 1);
            const ssName = font?.names?.[nameID]?.en;
            if (ssName) {
                return ssName;
            }
            return `Stylistic Set ${ssNum}`;
        }
    }
    return proof["Features"]?.[tag]?.["abstract"] || tag;
};

const generateFeatureCheckboxes = (itemID, proof, taglist) => {
    const uniqueTags = [...new Set(taglist)];
    return `
      <label>Features</label>  
      <div class="btn__wrapper d-flex flex-wrap g-0">
        ${uniqueTags.map(tag => {
          const featureDescription = getFeatureDescription(font, tag, proof);
          const definition = proof["Features"]?.[tag]?.["definition"] || '';
          
          return `
            <div title="${definition}" class="chip d-flex align-items-center justify-content-between d-flex-grow" onclick="document.getElementById('${itemID}-checkbox-${tag}').click()">
              <input id="${itemID}-checkbox-${tag}" type="checkbox" onclick="passfeatValue('${itemID}', '${tag}', '${uniqueTags.join(',')}')">
              <span class="d-flex-grow">${featureDescription}</span>
              <span class="tag-label text-small">${tag}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
};
  
const generateProofContent = (stage, title, proof, testAreaID, fvarStyle, textClass) => {
    if (!proof || !proof[stage] || !proof[stage][title]) {
      console.warn('Missing proof data:', { stage, title });
      return '';
    }

    let content = proof[stage][title];
    if (stage === "Features") {
      content = proof[stage][title].sample || '';
    }

    const savedContent = getStoredContent(testAreaID, content) || '';
    const savedTitle = getStoredContent(`${testAreaID}-title`, title) || '';
    const fontSize = whichFontSize(savedContent);
  
    const lineHeight = getItemLineHeight(testAreaID);
    const letterSpacing = localStorage.getItem(`${testAreaID}-letterSpacing`) || '0em';
    const columnCount = localStorage.getItem(`${testAreaID}-column-count`) || '1';
    const columnGap = localStorage.getItem(`${testAreaID}-column-gap`) || '1em';
  
    const inlineStyle = `
      font-size: ${fontSize}pt;
      line-height: ${lineHeight};
      letter-spacing: ${letterSpacing};
      column-count: ${columnCount};
      column-gap: ${columnGap};
    `;
    const html = `
      <div class="d-flex justify-content-between">
        <h6 class="h6" contentEditable="true" 
            id="${testAreaID}-title"
            onkeyup="saveEditableContent('${testAreaID}-title')">${savedTitle}</h6>
      </div>
      <div class="testarea-container">
        <div id="${testAreaID}" 
             style="${inlineStyle} ${fvarStyle}" 
             class="t__importedfontfamily testarea" 
             contenteditable="true" 
             spellcheck="false" 
             onkeyup="saveEditableContent('${testAreaID}')">
          ${savedContent}
        </div>
      </div>
    `;
  
    return html;
  };
  
const formatStyleValue = (property, value) => {
    switch (property) {
      case 'font-size':
        return value;
      case 'line-height':
        return value;
      case 'letter-spacing':
        return value.replace('em', '');
      default:
        return value;
    }
  };
  
const updateInlineText = (itemID, property, value) => {
	const container = document.querySelector(`#${itemID} .testarea-values`);
	if (!container) return;

	const fontSizeSlider = document.querySelector(`#${itemID}-fontSize`);
	const lineHeightSlider = document.querySelector(`#${itemID}-lineHeight`);
	const letterSpacingSlider = document.querySelector(`#${itemID}-letterSpacing`);

	const currentStyles = {
		'font-size': `${fontSizeSlider?.value || '14'}pt`,
		'line-height': lineHeightSlider?.value || '1.0',
		'letter-spacing': `${letterSpacingSlider?.value || '0'}em`
	};

	const inlineStyle = Object.entries(currentStyles)
		.map(([prop, val]) => `${prop}: ${val}`)
		.join('; ');

	container.innerHTML = generateTestAreaValues(inlineStyle);
  };

export const insertField = (aboveHere) => {
  const original = document.getElementById(aboveHere);
  const clone = original.cloneNode(true);
  
  // Create a unique ID for the new proof window
  const timestamp = Date.now();
  const newId = `custom-item-${timestamp}`;
  const originalId = original.id;
  clone.id = newId;
  
  // Update all element IDs
  clone.querySelectorAll('[id]').forEach(el => {
    el.id = `${el.id}-clone-${timestamp}`;
  });
  
  // Update all event handlers that reference the original ID
  clone.querySelectorAll('[oninput]').forEach(el => {
    // Replace the original itemID with the new one in all event handlers
    const updatedHandler = el.getAttribute('oninput').replace(
      new RegExp(`'${originalId}'`, 'g'), 
      `'${newId}'`
    );
    el.setAttribute('oninput', updatedHandler);
  });
  
  // Also update onclick attributes that may reference the original ID
  clone.querySelectorAll('[onclick]').forEach(el => {
    const updatedHandler = el.getAttribute('onclick').replace(
      new RegExp(`'${originalId}'`, 'g'), 
      `'${newId}'`
    );
    el.setAttribute('onclick', updatedHandler);
  });
  
  // Reset input values
  clone.querySelectorAll('input').forEach(input => {
    if (input.type === 'range') {
      // Don't reset slider values - they'll be handled by the style system
    } else {
      input.value = '';
    }
  });
  
  // Change the content to something new
  const testarea = clone.querySelector('.testarea');
  if (testarea) {
    testarea.innerHTML = "This is a new custom proof window. Type your text here.";
    
    // Save the content to localStorage
    saveEditableContent(testarea.id);
  }
  
  // Change the title
  const title = clone.querySelector('[id$="-title"]');
  if (title) {
    title.innerHTML = "Custom Proof Window";
    
    // Save the title to localStorage
    saveEditableContent(title.id);
  }
  
  original.parentNode.insertBefore(clone, original);
  
  // Animate the insertion
  clone.style.height = '0px';
  clone.style.overflow = 'hidden';
  clone.style.transition = 'height 0.6s ease';
  
  setTimeout(() => {
    clone.style.height = `${clone.scrollHeight}px`;
  }, 0);
  
  setTimeout(() => {
    clone.style.height = 'auto';
    clone.style.overflow = 'visible';
    
    // Save custom proof window to localStorage
    saveCustomProofWindow(newId, getCurrentStage());
  }, 600);
};

const getCurrentStage = () => {
  return localStorage.getItem('proofingPhase') || 'Hamburgers';
};

export const passStyleValue = (itemID, property, value) => {
	const elementIdSuffix = `-${property}-val`;
	const element = document.querySelector(`[id$="${itemID}${elementIdSuffix}"]`);
	
    if (['fontSize', 'lineHeight', 'letterSpacing', 'column-count', 'column-gap'].includes(property)) {
        localStorage.setItem(`${itemID}-${property}`, value);
        
        let displayValue = value;
        if (property === 'fontSize') displayValue += 'pt';
        if (property === 'letterSpacing') displayValue += 'em';
        if (element) element.textContent = displayValue;

        const slider = document.querySelector(`#${itemID}-${property}`);
        if (slider) {
            slider.classList.add('modified');
        }
    }

    const testarea = document.querySelector(`#${itemID} .testarea`);
    if (testarea) {
        let styleValue = value;
        if (property === 'fontSize') styleValue += 'pt';
        if (property === 'letterSpacing') styleValue += 'em';
        testarea.style[property] = styleValue;
    }

    updateInlineText(itemID, property, value);
  };
  
export const passfvarValue = (itemID, property, value, fvarSupport) => {
    const element = document.getElementById(`${itemID}-${property}-val`);
    if (element) {
        element.textContent = value;
    } else {
        console.warn(`Element with ID ${itemID}-${property}-val not found.`);
    }

    saveData(`${itemID}-${property}-val`, value);

    const fvarSupportArray = fvarSupport.split(',');
    let fvarcss = fvarSupportArray.map(tag => {
        const tagValue = tag === property ? value : document.getElementById(`${itemID}-${tag}`)?.value;
        return `'${tag}' ${tagValue}`;
    }).join(', ');

    const testarea = document.querySelector(`#${itemID} .testarea`);
    if (testarea) {
        testarea.style.fontVariationSettings = fvarcss;
    } else {
        console.warn(`Test area with ID ${itemID} not found.`);
    }

    updateInlineText(itemID, 'fvar', fvarcss);
};
  
export const passfeatValue = (itemID, feature, featureSupport) => {
	const featSupport = featureSupport.split(',');
	let featcss = "";
  
	for (let f = 0; f < featSupport.length; f++) {
	  if (document.getElementById(`${itemID}-checkbox-${featSupport[f]}`).checked) {
		featcss += `'${featSupport[f]}',`;
	  }
	}
	featcss = featcss.replace(/,\s*$/, "");
	document.querySelector(`#${itemID} .testarea`).style.fontFeatureSettings = featcss;
  };
  
const updateActiveButton = (property, value) => {
	document.querySelectorAll(`.btn.${property}-${value}`).forEach(btn => {
	  btn.classList.add('active');
	  
	  const wrapper = btn.closest('.btn__wrapper');
	  
	  if (wrapper) {
		wrapper.querySelectorAll('.btn').forEach(sibling => {
		  if (sibling !== btn) sibling.classList.remove('active');
		});
	  } else {
		document.querySelectorAll(`.btn[class*="${property}-"]`).forEach(sibling => {
		  if (sibling !== btn) sibling.classList.remove('active');
		});
	  }
	});
  };

export const removeStyleValue = (itemID, property) => {
    localStorage.removeItem(`${itemID}-${property}`);
    
    let defaultValue;
    if (property === 'fontSize') {
        const testarea = document.querySelector(`#${itemID} .testarea`);
        const text = testarea?.textContent || '';
        const ratio = parseFloat(document.getElementById('select__type-scale')?.value || 1.618);
        const baseSize = parseFloat(document.getElementById('input__base-font-size')?.value || 14);
        defaultValue = whichFontSize(text, baseSize, ratio);
    } else if (property === 'lineHeight') {
        defaultValue = getGlobalLineHeight();
    } else if (property === 'letterSpacing') {
        defaultValue = '0';
    } else {
        defaultValue = '0';
    }

    const slider = document.querySelector(`#${itemID}-${property}`);
    if (slider) {
        slider.value = defaultValue;
        slider.classList.remove('modified');
    }

    const valueDisplay = document.querySelector(`#${itemID}-${property}-val`);
    if (valueDisplay) {
        let displayValue = defaultValue;
        if (property === 'fontSize') displayValue += 'pt';
        if (property === 'letterSpacing') displayValue += 'em';
        valueDisplay.textContent = displayValue;
    }

    const testarea = document.querySelector(`#${itemID} .testarea`);
    if (testarea) {
        let styleValue = defaultValue;
        if (property === 'fontSize') styleValue += 'pt';
        if (property === 'letterSpacing') styleValue += 'em';
        testarea.style[property] = styleValue;
    }

    updateInlineText(itemID, property, defaultValue);

};

window.removeStyleValue = removeStyleValue;

export const generateStageButtons = (proof, currentStage) => {
  const hiddenTabs = JSON.parse(localStorage.getItem('hiddenTabs') || '[]');
  const visibleStages = Object.keys(proof).filter(stage => !hiddenTabs.includes(stage));
  
  if (visibleStages.length === 0 && Object.keys(proof).length > 0) {
    const defaultTab = 'Hamburgers' in proof ? 'Hamburgers' : Object.keys(proof)[0];
    visibleStages.push(defaultTab);
    const updatedHiddenTabs = hiddenTabs.filter(tab => tab !== defaultTab);
    localStorage.setItem('hiddenTabs', JSON.stringify(updatedHiddenTabs));
  }
  
  return visibleStages.map(stage => {
    const isActive = stage === currentStage ? 'active' : '';
    return `
      <div class="tab-item ${isActive} tab__setstage" onclick="setStage('${stage}')">
      <a href="#" class="stage-button d-flex justify-content-between g-2">
        <span class="stage-name">
        ${stage}
        </span>
        <span class="t__right tab-remove material-symbols-outlined remove" 
          onclick="event.stopPropagation(); removeTab('${stage}')">
        clear
        </span>
      </a>
      </div>
    `;
  }).join('');
};

export const removeTab = (stageName) => {
  const hiddenTabs = JSON.parse(localStorage.getItem('hiddenTabs') || '[]');
  
  if (!hiddenTabs.includes(stageName)) {
    hiddenTabs.push(stageName);
    localStorage.setItem('hiddenTabs', JSON.stringify(hiddenTabs));
  }
  
  const currentStage = localStorage.getItem('proofingPhase');
  if (currentStage === stageName) {
    fetch(CONFIG.jsonPath)
      .then(response => response.json())
      .then(proof => {
        const allTabs = Object.keys(proof);
        const visibleTabs = allTabs.filter(tab => !hiddenTabs.includes(tab));
        
        if (visibleTabs.length > 0) {
          setStage(visibleTabs[0]);
        } else {
          const defaultTab = 'Hamburgers' in proof ? 'Hamburgers' : allTabs[0];
          hiddenTabs.splice(hiddenTabs.indexOf(defaultTab), 1);
          localStorage.setItem('hiddenTabs', JSON.stringify(hiddenTabs));
          setStage(defaultTab);
        }
      });
  } else {
    fetch(CONFIG.jsonPath)
      .then(response => response.json())
      .then(proof => {
        const stageButtons = document.getElementById('section__header-stage-buttons');
        stageButtons.innerHTML = generateStageButtons(proof, currentStage);
      });
  }
};

window.removeTab = removeTab;

export const restoreAllTabs = () => {
  localStorage.removeItem('hiddenTabs');
  
  const currentStage = localStorage.getItem('proofingPhase') || 'Hamburgers';
  setStage(currentStage);
};

const originalLocalStorageClear = window.localStorageClear;
window.localStorageClear = () => {
  originalLocalStorageClear();
  localStorage.removeItem('hiddenTabs');
};

export const localLoad = () => {
	const fileButtonParent = document.getElementById('section__header-file-buttons');
	
	fetch('../src/txt/fonts.txt')
	  .then(response => response.text())
	  .then(data => {
		const fonts = data.split('fonts/')
		  .filter(font => font.trim() !== '')
		  .map(font => font.trim());
  
		const uniqueFonts = preserveUnique(fonts.sort());
		
		if (uniqueFonts.length === 0) {
		  fileButtonParent.innerHTML = 'Place fonts you want to proof into <code>/fonts</code> to begin';
		} else {
		  const navGroup = generateFontNavigation();
		  fileButtonParent.appendChild(navGroup);
		  
		  generateFontButtons(uniqueFonts, 'local')
		    .then(container => {
		      fileButtonParent.appendChild(container);
		      const fontFamilySource = localStorage.getItem('fontFamilySource') || 
		        `fonts/${uniqueFonts[uniqueFonts.length - 1]}`;
		      const fontFamily = localStorage.getItem('fontFamily') || 
		        fontFamilySource.replace('.', '-');
		      setFont(fontFamilySource, fontFamily);
		    });
		}
	  })
	  .catch(error => {
		console.error('Error loading fonts:', error);
		fileButtonParent.innerHTML = 'Place fonts you want to proof into <code>/fonts</code> to begin';
	  });
  };
  
export const serverLoad = () => {
	const fileButtonParent = document.getElementById('section__header-file-buttons');
	
	setFont('fonts/gooper-VF.ttf', 'gooper-VF-ttf');
	document.getElementById('style__fontface').innerHTML = '@font-face { font-family: "gooper-VF-ttf"; src: url("fonts/gooper-VF.ttf");}';
  
	const dragDropHtml = `
	  <div id="drag-drop-area" class="drag-drop-area">
		<p>Drag & drop font files here</p>
		<p>or</p>
		<label for="fontInput" class="file-input-label">Choose Files</label>
		<input id="fontInput" type="file" class="file-input" multiple accept=".ttf,.otf,.woff,.woff2" />
	  </div>
	`;

	fileButtonParent.innerHTML = dragDropHtml;
  
	const dragDropArea = document.getElementById('drag-drop-area');
	const fileInput = document.getElementById('fontInput');
  
	['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
	  dragDropArea.addEventListener(eventName, preventDefaults, false);
	  document.body.addEventListener(eventName, preventDefaults, false);
	});
  
	['dragenter', 'dragover'].forEach(eventName => {
	  dragDropArea.addEventListener(eventName, highlight, false);
	});
  
	['dragleave', 'drop'].forEach(eventName => {
	  dragDropArea.addEventListener(eventName, unhighlight, false);
	});
  
	dragDropArea.addEventListener('drop', handleDrop, false);
  
	fileInput.addEventListener('change', handleFiles, false);
  };
  
function preventDefaults(e) {
	e.preventDefault();
	e.stopPropagation();
  }
  
function highlight(e) {
	document.getElementById('drag-drop-area').classList.add('highlight');
  }
  
function unhighlight(e) {
	document.getElementById('drag-drop-area').classList.remove('highlight');
  }
  
function handleDrop(e) {
	const dt = e.dataTransfer;
	const files = dt.files;
	handleFiles(files);
  }
  
function handleFiles(filesOrEvent) {
	let files;
	if (filesOrEvent instanceof Event) {
	  files = filesOrEvent.target.files;
	} else {
	  files = filesOrEvent;
	}
  
	files = Array.from(files);
	
	const uploadPromises = files.map(file => uploadFile(file));
  
	Promise.all(uploadPromises).then(() => {
	  setTimeout(() => {
		const firstButton = document.querySelector('.btn__setfont');
		if (firstButton) {
		  firstButton.click();
		}
	  }, 100);
	});
  }
  
function uploadFile(file) {
	return new Promise((resolve) => {
	  onReadFile({ target: { files: [file] } });
	  setTimeout(resolve, 50);
	});
  }
  
function previewFile(file) {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onloadend = function() {
	  const img = document.createElement('img');
	  img.src = reader.result;
	  document.getElementById('drag-drop-area').appendChild(img);
	}
  }
  
export const setupEventListeners = () => {
	const fileButtons = document.getElementById('section__header-file-buttons');
	const stageButtons = document.getElementById('section__header-stage-buttons');
	const toolsToggle = document.getElementById('btn__view-tools-toggle');
	const modeToggle = document.getElementById('btn__mode-toggle');
	const localStorageClearButton = document.getElementById('btn__reset-local-storage');
	const settingsToggle = document.getElementById('btn__settings-toggle');
	const addNameAndVersionCheckbox = document.getElementById('checkbox__add-name-and-version');
	const lockProofDimensionsCheckbox = document.getElementById('checkbox__lock-proof-dimensions');
	if (fileButtons) {
	  fileButtons.addEventListener('click', handleFileButtonClick);
	}
	if (stageButtons) {
	  stageButtons.addEventListener('click', handleStageButtonClick);
	}
	if (toolsToggle) {
	  toolsToggle.addEventListener('click', toggleToolsVisibility);
	}
	if (modeToggle) {
		modeToggle.addEventListener('click', toggleMode);
	}
	if (localStorageClearButton) {
		localStorageClearButton.addEventListener('click', localStorageClear);
	}
	if (settingsToggle) {
		settingsToggle.addEventListener('click', toggleSettingsVisibility);
	}
	if (addNameAndVersionCheckbox) {
		const savedState = localStorage.getItem('showNameAndVersion') === 'true';
		addNameAndVersionCheckbox.checked = savedState;
		document.body.classList.toggle('show-font-details', savedState);
		
		addNameAndVersionCheckbox.addEventListener('change', toggleNameAndVersion);
	}
	if (lockProofDimensionsCheckbox) {
		const savedState = localStorage.getItem('lockProofDimensions') === 'true';
		lockProofDimensionsCheckbox.checked = savedState;
		
		applyLockProofDimensions(savedState);
		
		lockProofDimensionsCheckbox.addEventListener('change', toggleLockProofDimensions);
	}
	setupPasteHandling();

	const aspectRatioSelect = document.getElementById('select__aspect-ratio');
	if (aspectRatioSelect) {
		const proofs = document.querySelectorAll('.item__proof');
		proofs.forEach(proof => proof.classList.add('ratio-letter'));

		aspectRatioSelect.addEventListener('change', (e) => {
			const ratio = e.target.value;
			const proofs = document.querySelectorAll('.item__proof');
			
			proofs.forEach(proof => {
				proof.classList.remove('ratio-letter', 'ratio-a4');
				proof.classList.add(ratio === '8.5:11' ? 'ratio-letter' : 'ratio-a4');
			});

			localStorage.setItem('preferred-ratio', ratio);
		});

		const savedRatio = localStorage.getItem('preferred-ratio');
		if (savedRatio) {
			aspectRatioSelect.value = savedRatio;
			aspectRatioSelect.dispatchEvent(new Event('change'));
		}
	}

	const baseFontInput = document.getElementById('input__base-font-size');
	if (baseFontInput) {
		baseFontInput.addEventListener('change', (e) => {
			const baseSize = parseFloat(e.target.value);
			localStorage.setItem('base-font-size', baseSize);
			updateAllTypeScales();
		});

		const savedBaseSize = localStorage.getItem('base-font-size') || '14';
		baseFontInput.value = savedBaseSize;
	}

	const lineHeightInput = document.getElementById('input__line-height');
	if (lineHeightInput) {
		lineHeightInput.addEventListener('change', (e) => {
			const lineHeight = parseFloat(e.target.value);
			localStorage.setItem('line-height', lineHeight);
			updateAllLineHeights();
		});

		const savedLineHeight = getGlobalLineHeight();
		lineHeightInput.value = savedLineHeight;
	}

	const typeScaleSelect = document.getElementById('select__type-scale');
	if (typeScaleSelect) {
		typeScaleSelect.addEventListener('change', () => {
			updateAllTypeScales();
		});
	}

	initColorMode();

	setupCycleSpeedListener();
  };
  
const handleFileButtonClick = (event) => {
	if (event.target.classList.contains('btn__setfont')) {
	  event.target.classList.add('active', 'visited');
	  const siblings = Array.from(event.target.parentNode.children).filter(child => child !== event.target);
	  siblings.forEach(sibling => sibling.classList.remove('active'));
	}
  };
  
const handleStageButtonClick = (event) => {
	if (event.target.classList.contains('btn__setstage')) {
	  event.target.classList.add('active');
	  const siblings = Array.from(event.target.parentNode.children).filter(child => child !== event.target);
	  siblings.forEach(sibling => sibling.classList.remove('active'));
	}
  };
  
const toggleToolsVisibility = () => {
	document.body.classList.toggle('tools-visible');
  };

const setupPasteHandling = () => {
  document.addEventListener('paste', (e) => {
    if (!e.target.classList.contains('testarea')) {
      return;
    }

    e.preventDefault();

    const text = (e.clipboardData || window.clipboardData).getData('text/plain');

    const selection = window.getSelection();
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
    } else {
      e.target.textContent += text;
    }

    const event = new Event('keyup');
    e.target.dispatchEvent(event);
  });

  // Handle keyboard shortcuts for italic formatting
  document.addEventListener('keydown', (e) => {
    // Check for Cmd+I (Mac) or Ctrl+I (Windows/Linux)
    if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
      const activeElement = document.activeElement;
      
      // Only handle if we're in a testarea and have a secondary font selected
      if (activeElement && activeElement.classList.contains('testarea')) {
        const secondaryFontName = localStorage.getItem('secondaryFontName');
        
        if (secondaryFontName) {
          e.preventDefault(); // Prevent default italic behavior
          
          // Toggle italic using our secondary font system
          document.execCommand('italic', false, null);
          
          // The CSS we added will handle the font substitution and prevent faux italic
        }
      }
    }
  });
};

export const generateFontButtons = async (fonts, mode = 'local') => {
  const container = document.createElement('div');
  container.className = 'font-buttons-container';

  const chipsContainer = document.createElement('div');
  chipsContainer.className = 'font-chips';
  
  for (const font of fonts) {
    const button = await generateFontButton(font, mode);
    chipsContainer.appendChild(button);
  }

  return chipsContainer;
};

export const generateFontNavigation = () => {
  const navGroup = document.createElement('div');
  navGroup.className = 'btn-group d-flex g-1 mb-2 font-nav-group';
  
  const prevButton = document.createElement('button');
  prevButton.className = 'btn d-flex align-items-center justify-content-between d-flex-grow';
  prevButton.innerHTML = '<span class="material-symbols-outlined">chevron_left</span> Prev';
  prevButton.onclick = () => navigateFonts('prev');
  
  const playButton = document.createElement('button');
  playButton.className = 'btn font-play-btn d-flex align-items-center justify-content-center';
  playButton.title = 'Auto-cycle through fonts';
  playButton.innerHTML = '<span class="material-symbols-outlined">play_arrow</span>';
  playButton.setAttribute('data-playing', 'false');
  playButton.onclick = toggleFontAnimation;
  
  const nextButton = document.createElement('button');
  nextButton.className = 'btn d-flex align-items-center justify-content-between d-flex-grow';
  nextButton.innerHTML = 'Next <span class="material-symbols-outlined">chevron_right</span>';
  nextButton.onclick = () => navigateFonts('next');
  
  navGroup.appendChild(prevButton);
  navGroup.appendChild(playButton);
  navGroup.appendChild(nextButton);
  
  return navGroup;
};

const navigateFonts = (direction) => {
  const buttons = document.querySelectorAll('.btn__setfont');
  const activeButton = document.querySelector('.btn__setfont.active');
  
  if (!buttons.length) return;
  
  let nextIndex = 0;
  
  if (activeButton) {
    const currentIndex = Array.from(buttons).indexOf(activeButton);
    
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % buttons.length;
    } else {
      nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
    }
  }
  
  buttons[nextIndex].click();
};

const initAspectRatio = () => {
  const select = document.getElementById('select__aspect-ratio');
  const proofs = document.querySelectorAll('.item__proof');

  const normalizeRatio = (ratioStr) => {
    const [width, height] = ratioStr.split(':').map(Number);
    return width / height;
  };

  proofs.forEach(proof => {
    const ratioStr = select.value;
    const ratio = normalizeRatio(ratioStr);
    proof.style.aspectRatio = ratio;
  });

  select.addEventListener('change', (e) => {
    const ratioStr = e.target.value;
    const ratio = normalizeRatio(ratioStr);
    
    proofs.forEach(proof => {
      proof.style.aspectRatio = ratio;
    });
    
    localStorage.setItem('preferred-ratio', ratioStr);
  });

  const savedRatio = localStorage.getItem('preferred-ratio');
  if (savedRatio) {
    select.value = savedRatio;
    select.dispatchEvent(new Event('change'));
  }
};

const initTypeScale = () => {
    const ratio = parseFloat(document.getElementById('select__type-scale')?.value || 1.618);
    const baseSize = parseFloat(document.getElementById('input__base-font-size')?.value || 14);
    
    document.querySelectorAll('.item').forEach(item => {
        const itemID = item.id;
        const testarea = item.querySelector('.testarea');
        const text = testarea?.textContent || '';
        
        const itemLineHeight = getItemLineHeight(itemID);
        const itemFontSize = getItemFontSize(itemID, text, baseSize, ratio);
        
        if (testarea) {
            testarea.style.fontSize = `${itemFontSize}pt`;
            testarea.style.lineHeight = itemLineHeight;
        }
        
        const fontSizeSlider = item.querySelector(`#${itemID}-fontSize`);
        const fontSizeVal = item.querySelector(`#${itemID}-fontSize-val`);
        if (fontSizeSlider) {
            fontSizeSlider.value = itemFontSize;
            if (localStorage.getItem(`${itemID}-fontSize`)) {
                fontSizeSlider.classList.add('modified');
            }
        }
        if (fontSizeVal) {
            fontSizeVal.textContent = `${itemFontSize}pt`;
        }
    });
};

const updateAllTypeScales = () => {
    const ratio = parseFloat(document.getElementById('select__type-scale')?.value || 1.618);
    const baseSize = parseFloat(document.getElementById('input__base-font-size')?.value || 14);
    
    localStorage.setItem('preferred-scale', ratio);
    
    document.querySelectorAll('.item').forEach(item => {
        const itemID = item.id;
        const testarea = item.querySelector('.testarea');
        const text = testarea?.textContent || '';
        
        const fontSize = getItemFontSize(itemID, text, baseSize, ratio);
        const itemLineHeight = getItemLineHeight(itemID);
        
        if (testarea) {
            testarea.style.fontSize = `${fontSize}pt`;
            testarea.style.lineHeight = itemLineHeight;
        }
        
        const fontSizeSlider = item.querySelector(`#${itemID}-fontSize`);
        const fontSizeVal = item.querySelector(`#${itemID}-fontSize-val`);
        if (fontSizeSlider) {
            fontSizeSlider.value = fontSize;
            if (localStorage.getItem(`${itemID}-fontSize`)) {
                fontSizeSlider.classList.add('modified');
            }
        }
        if (fontSizeVal) {
            fontSizeVal.textContent = `${fontSize}pt`;
        }

        updateItemLineHeightDisplay(itemID, itemLineHeight);
    });
};

const updateAllLineHeights = () => {
    const globalLineHeight = getGlobalLineHeight();
    localStorage.setItem('line-height', globalLineHeight);
    
    document.querySelectorAll('.item').forEach(item => {
        const itemID = item.id;
        if (!localStorage.getItem(`${itemID}-lineHeight`)) {
            updateItemLineHeightDisplay(itemID, globalLineHeight);
        }
    });
};

const applyNameAndVersion = (isChecked) => {
  const headerNames = document.getElementById('section__header-names');
  const proofItems = document.querySelectorAll('.item__proof');

  proofItems.forEach(item => {
    const existingFooter = item.querySelector('.proof-footer');
    if (existingFooter) {
      existingFooter.remove();
    }

    if (isChecked) {
      const footer = document.createElement('div');
      footer.className = 'proof-footer';
      footer.innerHTML = headerNames.innerHTML;
      item.appendChild(footer);
    }
  });
};

const toggleNameAndVersion = (event) => {
  const isChecked = event.target.checked;
  localStorage.setItem('showNameAndVersion', isChecked);
  document.body.classList.toggle('show-font-details', isChecked);
};

const applyLockProofDimensions = (isChecked) => {
  document.querySelectorAll('.item__proof').forEach(proof => {
    if (isChecked) {
      proof.classList.add('locked-dimensions');
    } else {
      proof.classList.remove('locked-dimensions');
    }
  });
};
const toggleLockProofDimensions = (event) => {
  const isChecked = event.target.checked;
  localStorage.setItem('lockProofDimensions', isChecked);
  applyLockProofDimensions(isChecked);
};

const getItemFontSize = (itemID, text, baseSize, ratio) => {
    const storedSize = localStorage.getItem(`${itemID}-fontSize`);
    if (storedSize !== null) {
        return parseFloat(storedSize);
    }
    return whichFontSize(text, baseSize, ratio);
};

const getItemLineHeight = (itemID) => {
    return parseFloat(
        localStorage.getItem(`${itemID}-lineHeight`) ||
        getGlobalLineHeight()
    );
};

const getGlobalLineHeight = () => {
    return parseFloat(
        document.getElementById('input__line-height')?.value ||
        localStorage.getItem('line-height') || 1.0
    );
};

const setItemLineHeight = (itemID, value) => {
    localStorage.setItem(`${itemID}-lineHeight`, value);
    updateItemLineHeightDisplay(itemID, value);
};

const updateItemLineHeightDisplay = (itemID, value) => {
    const item = document.getElementById(itemID);
    if (!item) return;

    const testarea = item.querySelector('.testarea');
    const lineHeightSlider = item.querySelector(`#${itemID}-lineHeight`);
    const lineHeightVal = item.querySelector(`#${itemID}-lineHeight-val`);
    const valuesDisplay = item.querySelector('.testarea-values');
    
    if (testarea) testarea.style.lineHeight = value;
    if (lineHeightSlider) lineHeightSlider.value = value;
    if (lineHeightVal) lineHeightVal.textContent = value;
    
    if (valuesDisplay) {
        const currentStyles = {
            'font-size': testarea?.style.fontSize || '14pt',
            'line-height': `${value}`,
            'letter-spacing': testarea?.style.letterSpacing || '0em'
        };
        valuesDisplay.innerHTML = generateTestAreaValues(
            Object.entries(currentStyles)
                .map(([prop, val]) => `${prop}: ${val}`)
                .join('; ')
        );
    }
};

export const resetCustomValue = (itemID, property) => {
    localStorage.removeItem(`${itemID}-${property}`);
    
    let globalValue;
    if (property === 'lineHeight') {
        globalValue = getGlobalLineHeight();
    } else if (property === 'fontSize') {
        const testarea = document.querySelector(`#${itemID} .testarea`);
        const text = testarea?.textContent || '';
        const ratio = parseFloat(document.getElementById('select__type-scale')?.value || 1.618);
        const baseSize = parseFloat(document.getElementById('input__base-font-size')?.value || 14);
        globalValue = whichFontSize(text, baseSize, ratio);
    }
        
    updateItemDisplay(itemID, property, globalValue);
    
    const slider = document.querySelector(`#${itemID}-${property}`);
    if (slider) {
        slider.classList.remove('modified');
    }
};

export const applySecondaryFont = (fontPath, fontName) => {
  console.log(`Applying secondary font: ${fontName} from ${fontPath}`);
  
  opentype.load(fontPath, (err, loadedFont) => {
    if (err) {
      console.error('Error loading secondary font:', err);
      showErrorMessage(`Error loading secondary font: ${err}`);
      return;
    }
    
    window.secondaryFont = loadedFont;
    
    if ('FontFace' in window) {
      const secondaryFontFamily = `${fontName}-secondary`;
      const fontFace = new FontFace(
        secondaryFontFamily,
        `url('${fontPath}')`,
        { format: loadedFont.outlinesFormat === 'truetype' ? 'truetype' : 'opentype' }
      );
      
      fontFace.load().then(() => {
        document.fonts.add(fontFace);
        console.log(`Secondary font loaded successfully: ${secondaryFontFamily}`);
        
        const fontFaceRule = `
          @font-face {
            font-family: '${secondaryFontFamily}';
            src: url('${fontPath}') format('${loadedFont.outlinesFormat === 'truetype' ? 'truetype' : 'opentype'}');
          }
        `;
        
        let secondaryStyleElement = document.getElementById('style__secondary-font');
        if (!secondaryStyleElement) {
          secondaryStyleElement = document.createElement('style');
          secondaryStyleElement.id = 'style__secondary-font';
          document.head.appendChild(secondaryStyleElement);
        }
        
        secondaryStyleElement.textContent = fontFaceRule;
        
        secondaryStyleElement.textContent += `
          .testarea em, 
          .testarea i, 
          .testarea [style*="italic"],
          .testarea .emphasis,
          .font-italic {
            font-family: '${secondaryFontFamily}', var(--font-secondary, sans-serif) !important;
            font-style: normal !important;
          }
        `;
        
        const currentStage = localStorage.getItem('proofingPhase') || 'Hamburgers';
        setStage(currentStage);
      });
    }
  });
};

export const clearSecondaryFont = () => {
  // Remove secondary font styling
  const secondaryStyleElement = document.getElementById('style__secondary-font');
  if (secondaryStyleElement) {
    secondaryStyleElement.remove();
  }
  
  // Clear localStorage
  localStorage.removeItem('secondaryFontPath');
  localStorage.removeItem('secondaryFontName');
  
  // Remove secondary class from all buttons
  document.querySelectorAll('.btn__setfont.secondary').forEach(btn => {
    btn.classList.remove('secondary');
  });
  
  // Clear global reference
  window.secondaryFont = null;
  
  console.log('Secondary font cleared');
};

let fontAnimationInterval = null;

const toggleFontAnimation = (event) => {
  const playButton = event.currentTarget;
  const isPlaying = playButton.getAttribute('data-playing') === 'true';
  
  if (isPlaying) {
    stopFontAnimation();
    playButton.innerHTML = '<span class="material-symbols-outlined">play_arrow</span>';
    playButton.setAttribute('data-playing', 'false');
  } else {
    startFontAnimation();
    playButton.innerHTML = '<span class="material-symbols-outlined">pause</span>';
    playButton.setAttribute('data-playing', 'true');
  }
};

const startFontAnimation = () => {
  stopFontAnimation();
  
  const speedInput = document.getElementById('input__cycle-speed');
  const speed = speedInput ? parseInt(speedInput.value, 10) : 300;
  
  const safeSpeed = Math.max(100, speed);
  
  fontAnimationInterval = setInterval(() => {
    navigateFonts('next');
  }, safeSpeed);
};

const stopFontAnimation = () => {
  if (fontAnimationInterval) {
    clearInterval(fontAnimationInterval);
    fontAnimationInterval = null;
  }
};

const setupCycleSpeedListener = () => {
  const speedInput = document.getElementById('input__cycle-speed');
  if (!speedInput) return;
  
  const savedSpeed = localStorage.getItem('font-cycle-speed');
  if (savedSpeed) {
    speedInput.value = savedSpeed;
  }
  
  speedInput.addEventListener('change', () => {
    localStorage.setItem('font-cycle-speed', speedInput.value);
    
    const playButton = document.querySelector('.font-play-btn');
    if (playButton && playButton.getAttribute('data-playing') === 'true') {
      startFontAnimation();
    }
  });
};

export const removeCustomProofWindow = (itemId) => {
  const customWindows = JSON.parse(localStorage.getItem('customProofWindows') || '{}');
  const currentStage = getCurrentStage();
  
  if (customWindows[currentStage]) {
    const index = customWindows[currentStage].indexOf(itemId);
    if (index !== -1) {
      customWindows[currentStage].splice(index, 1);
      localStorage.setItem('customProofWindows', JSON.stringify(customWindows));
    }
  }
  
  const element = document.getElementById(itemId);
  if (element) {
    element.remove();
  }
};

window.removeCustomProofWindow = removeCustomProofWindow;

