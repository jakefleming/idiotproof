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
	toggleUi  } from './utils.js';

let font = null;
const fontFormats = {
    truetype: 'ttf',
    opentype: 'otf',
};

export const onFontLoaded = (loadedFont, fontFamilySource, fontFamily) => {
	return new Promise((resolve, reject) => {
	  try {
		font = loadedFont;
		console.log(`Font assigned globally: ${fontFamily}`);
		
		// Create and apply the font-face rule
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
  
		displayFontData(fontFamily);
  
		if (['localhost', '127.0.0.1', ''].includes(location.hostname)) {
		  localStorage.setItem('fontFamily', fontFamily);
		  localStorage.setItem('fontFamilySource', fontFamilySource);
		  console.log(`Font information saved to localStorage`);
		}
  
		// If there's a pending stage, set it now
		if (window.pendingStage) {
		  setStage(window.pendingStage);
		  window.pendingStage = null;
		} else {
		  // Set a default stage if none is pending
		  setStage('Hamburgers');  // or whatever your default stage should be
		}
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
  
	Array.from(files).forEach(async file => {
	  const button = await generateFontButton(file, 'server');
	  fileButtonParent.appendChild(button);
	});
  
	// Activate the first button automatically after all chips have loaded
	setTimeout(() => {
	  const firstButton = fileButtonParent.querySelector('.btn__setfont');
	  if (firstButton) {
		firstButton.click(); // Simulate a click on the first button
	  }
	}, 0);
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

export const setFont = (fontPath, fontName) => {
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

export const displayFontData = (fontFamily) => {
    var tablename, table, property, value, tag;
    var styles = '';

    for (tablename in font.tables) {
        table = font.tables[tablename];

        if (tablename === 'cmap') {
            var gim = font.tables.cmap.glyphIndexMap;
            var gimLength = Object.keys(gim).length;
            if (gimLength <= 100) {
                window.proofingPhase = "Hamburgers";
            } else if (gimLength >= 400) {
                window.proofingPhase = "Diacritics";
            } else {
                window.proofingPhase = "Spacing";
            }
        }
        // Determine if TTF or OTF
        var fontFormat = font.outlinesFormat;
        fontFormat = fontFormats[fontFormat];
        // Inserting header data: font name, foundry name, etc.
        if (tablename === 'name') {
                let nameHtml = '';
                if (font.names.designer) {
                    var designerName = font.names.designer.en;
                } else {
                    var designerName = "No Designer Name :(";
                }
                if (font.names.postScriptName) {
                    var postScriptName = font.names.postScriptName.en;
                } else {
                    var postScriptName = "Font Name";
                }
                nameHtml += '<div class="section__header-name d-flex-grow t__left" contenteditable="true" spellcheck="false">'+designerName+'</div>';

                nameHtml += '<div class="section__header-name d-flex-grow t__center" spellcheck="false">'+postScriptName+'</div>';
                styles += `.t__importedfontfamily { font-family: "${fontFamily}" }`;
                nameHtml += '<div class="section__header-name  d-flex-grow t__right">'+getFormattedDate()+'</div>';
                document.getElementById('section__header-names').innerHTML = nameHtml;
                continue;
        }
    }
    //Inject css of necessary features
    document.getElementById('style__fontfamily').innerHTML = styles;
    
    //setStage
    if (localStorage.getItem('proofingPhase')) {
            // Check for local storage settings
            setStage(localStorage.getItem('proofingPhase'));
    } else {
            setStage(window.proofingPhase);
    }
};

export const setStage = (stage) => {
	const article = document.getElementById('section__article-app');
	const stageButtons = document.getElementById('section__header-stage-buttons');
	
	if (!font) {
	  console.warn('Font not loaded yet. Deferring stage setting.');
	  // Store the stage to set later
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
	  })
	  .catch(error => console.error('Error loading JSON:', error));
  };
  
  const generateStageHtml = (proof, stage) => {
    if (!proof[stage]) {
      return '<div class="item d-flex t__center"><div class="item__proof">No features found! :...(</div></div>';
    }
  
    const gsubFeatures = font.tables.gsub.features;
    const taglist = Object.values(gsubFeatures)
		.filter(feature => typeof feature === 'object' && feature.tag)
		.map(feature => feature.tag)
		.filter(tag => proof["Features"][tag] !== undefined);
  
    let html = '';
  
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
                <button class="btn btn-secondary mr-1 mb-1 mt-6" title="Apply these styles to all visible proof sheets." onclick="passStyleValue('${itemID}','idiocracy','global')">Global Idiocracy</button>
              </div>
            </div>
            <div class="item__proof">
              <button class="btn btn-link remove-item-this invisible" onclick="removeElementsByID('${itemID}')">×</button>
              ${generateProofContent(stage, title, proof, testAreaID, inlineStyle, fvarStyle, textClass)}
            </div>
          </div>
        </div>
      `;
    }
	return html;
  };
  
  const getStoredStyles = (sliderID, textClass) => {
    const fontSize = localStorage.getItem(`${sliderID}-fontSize-val`) || whichFontSize(textClass);
    const lineHeight = localStorage.getItem(`${sliderID}-lineHeight-val`) || '1.2';
    const letterSpacing = localStorage.getItem(`${sliderID}-letterSpacing-val`) || '0em';
  
    const inlineStyle = `
      font-size: ${fontSize}pt;
      line-height: ${lineHeight};
      letter-spacing: ${letterSpacing};
    `;
  
    return { fontSize, lineHeight, letterSpacing, inlineStyle };
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
  
  const generateSliders = (itemID, sliderID, fontSize, lineHeight, letterSpacing) => `
    <label for="${sliderID}-fontSize">Font Size </label>
    <span class="t__right text-small" id="${sliderID}-fontSize-val">${fontSize}pt</span>
    <input id="${sliderID}-fontSize" type="range" class="slider" min="4" max="160" step="2" value="${fontSize}" oninput="passStyleValue('${itemID}', 'fontSize', this.value)">
    
    <label for="${sliderID}-lineHeight">Line Height </label>
    <span class="t__right text-small" id="${sliderID}-lineHeight-val">${lineHeight}</span>
    <input id="${sliderID}-lineHeight" type="range" class="slider" min="0.6" max="3.0" step="0.01" value="${lineHeight}" oninput="passStyleValue('${itemID}', 'lineHeight', this.value)">
    
    <label for="${sliderID}-letterSpacing">Letter Spacing </label>
    <span class="t__right text-small" id="${sliderID}-letterSpacing-val">${letterSpacing}</span>
    <input id="${sliderID}-letterSpacing" type="range" class="slider" min="-0.4" max="0.4" step="0.01" value="${letterSpacing}" oninput="passStyleValue('${itemID}', 'letterSpacing', this.value)">
  `;
  
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
	button.onclick = () => setFont(fontPath, fontName);
  
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
      		<button class="btn btn-link column-count-1" title="1 column layout" onclick="passStyleValue('${itemID}','column-count', '1')"><span class="material-symbols-outlined">subject</span></button>
      		<button class="btn btn-link column-count-2" title="2 column layout" onclick="passStyleValue('${itemID}','column-count', '2')"><span class="material-symbols-outlined">view_column_2</span></button>
      		<button class="btn btn-link column-count-3" title="3 column layout" onclick="passStyleValue('${itemID}','column-count', '3')"><span class="material-symbols-outlined">view_week</span></button>
		</div>
    </div>
  `;
  
  const generateFeatureCheckboxes = (itemID, proof, taglist) => {
	const uniqueTags = [...new Set(taglist)];
	return `
	<label>Features</label>  
	<div class="btn__wrapper d-flex flex-column g-1">
		${uniqueTags.map(tag => {
		  const name = proof["Features"][tag]["abstract"];
		  return `
			<div class="btn__setfont d-flex justify-content-between">
			  <input id="${itemID}-checkbox-${tag}" type="checkbox" onclick="passfeatValue('${itemID}', '${tag}', '${uniqueTags.join(',')}')">
			  ${name}<span class="d-flex-grow text-right text-small">${tag}</span>
			</div>
		  `;
		}).join('')}
	  </div>
	`;
  };
  
  const generateProofContent = (stage, title, proof, testAreaID, inlineStyle, fvarStyle, textClass) => {
    if (stage === "Features") {
      const definition = proof[stage][title].definition;
      const sample = localStorage.getItem(testAreaID) || proof[stage][title].sample;
      return `
        <h6 class="h6" title="${definition}" contentEditable="true" onkeyup="saveData('${testAreaID}-title', 'thisContent')">${title}</h6>
        <span class="testarea-values small">${generateTestAreaValues(inlineStyle)}</span>
        <div id="${testAreaID}" style="${inlineStyle} ${fvarStyle}" class="t__importedfontfamily ${textClass} testarea" contenteditable="true" spellcheck="false" onkeyup="saveData('${testAreaID}', 'thisContent')">
          ${sample}
        </div>
      `;
    } else {
      const content = localStorage.getItem(testAreaID) || proof[stage][title];
      return `
        <h6 contentEditable="true" onkeyup="saveData('${testAreaID}-title', 'thisContent')">${title}</h6>
        <span class="testarea-values small">${generateTestAreaValues(inlineStyle)}</span>
        <div id="${testAreaID}" style="${inlineStyle} ${fvarStyle}" class="t__importedfontfamily ${textClass} testarea" contentEditable="true" spellcheck="false" onkeyup="saveData('${testAreaID}', 'thisContent')">
          ${content}
        </div>
      `;
    }
  };
  
  const generateTestAreaValues = (inlineStyle) => {
    const styles = inlineStyle.split(';').filter(s => s.trim());
    return styles.map(style => {
      const [property, value] = style.split(':').map(s => s.trim());
      return `<span class="${property}">${property}: ${value}</span>`;
    }).join(' ');
  };
  
  const updateInlineText = (itemID, property, value) => {
	const container = document.querySelector(`#${itemID} .testarea-values`);
	const existingSpan = container.querySelector(`.${property}`);
	
	if (existingSpan) {
	  existingSpan.textContent = `${property}: ${value}`;
	} else {
	  const newSpan = document.createElement('span');
	  newSpan.className = property;
	  newSpan.textContent = `${property}: ${value}`;
	  container.appendChild(newSpan);
	}
  };

// Global functions

export const insertField = (aboveHere) => {
	const original = document.getElementById(aboveHere);
	const clone = original.cloneNode(true);
	
	// Reset any unique IDs or input values in the clone
	clone.id = `${aboveHere}-clone-${Date.now()}`;
	clone.querySelectorAll('[id]').forEach(el => {
	  el.id = `${el.id}-clone-${Date.now()}`;
	});
	clone.querySelectorAll('input').forEach(input => {
	  input.value = '';
	});
  
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
	}, 600);
  };
  
  export const passStyleValue = (itemID, property, value) => {
	const elementIdSuffix = `-${property}-val`;
	const element = document.querySelector(`[id$="${itemID}${elementIdSuffix}"]`);
	
	if (['fontSize', 'lineHeight', 'letterSpacing'].includes(property)) {
	  saveData(`${itemID}${elementIdSuffix}`, value);
	  if (property === 'fontSize') value += 'pt';
	  if (property === 'letterSpacing') value += 'em';
	  if (element) element.textContent = value;
	} else {
	  saveData(itemID + property, value);
	}
  
	const testarea = document.querySelector(`#${itemID} .testarea`);
	if (property === 'idiocracy') {
	  const css = testarea.getAttribute('style');
	  document.querySelectorAll('.testarea').forEach(el => el.setAttribute('style', css));
	} else {
	  testarea.style[property] = value;
	}
  
	updateInlineText(itemID, property, value);
  
	// Only update active button for non-slider properties
	if (!['fontSize', 'lineHeight', 'letterSpacing'].includes(property)) {
	  updateActiveButton(property, value);
	}
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
        const tagValue = tag === property ? value : document.getElementById(`${itemID}-${tag}`)?.value; // Use optional chaining
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
	  
	  // Find the parent wrapper
	  const wrapper = btn.closest('.btn__wrapper');
	  
	  if (wrapper) {
		// If we found a wrapper, remove 'active' class from all sibling buttons
		wrapper.querySelectorAll('.btn').forEach(sibling => {
		  if (sibling !== btn) sibling.classList.remove('active');
		});
	  } else {
		// Fallback: remove 'active' class from all buttons with the same property
		document.querySelectorAll(`.btn[class*="${property}-"]`).forEach(sibling => {
		  if (sibling !== btn) sibling.classList.remove('active');
		});
	  }
	});
  };

// generate buttons
export const generateStageButtons = (proof, currentStage) => {
    return Object.keys(proof).map(stage => {
      const isActive = stage === currentStage ? 'active' : '';
      return `
        <div class="tab-item ${isActive} tab__setstage" onclick="setStage('${stage}')">
          <a href="#" class="stage-button">${stage}</a>
        </div>
      `;
    }).join('');
  };

  // localload vs server

  export const localLoad = () => {
	const fileButtonParent = document.getElementById('section__header-file-buttons');
	fileButtonParent.innerHTML = 'Place fonts you want to proof into <code>/fonts</code> to begin';
  
	fetch('../src/txt/fonts.txt')
	  .then(response => response.text())
	  .then(async data => {
		const fonts = data.split('fonts/')
		  .filter(font => font.trim() !== '')
		  .map(font => font.trim());
  
		const uniqueFonts = preserveUnique(fonts.sort());
		
		// Generate buttons asynchronously
		const buttonPromises = uniqueFonts.map(font => generateFontButton(font, 'local'));
		const buttons = await Promise.all(buttonPromises);
		
		// Append buttons to the parent element
		buttons.forEach(button => fileButtonParent.appendChild(button));
  
		// Set the default font
		const fontFamilySource = localStorage.getItem('fontFamilySource') || `fonts/${uniqueFonts[uniqueFonts.length - 1]}`;
		const fontFamily = localStorage.getItem('fontFamily') || fontFamilySource.replace('.', '-');
		setFont(fontFamilySource, fontFamily);
	  })
	  .catch(error => console.error('Error loading fonts:', error));
  };
  
  export const serverLoad = () => {
	const fileButtonParent = document.getElementById('section__header-file-buttons');
	
	setFont('fonts/gooper-VF.ttf', 'gooper-VF-ttf');
	document.getElementById('style__fontface').innerHTML = '@font-face { font-family: "gooper-VF-ttf"; src: url("fonts/gooper-VF.ttf");}';
  
	const fileInputHtml = `
    <form class="box has-advanced-upload" method="post" action="" enctype="multipart/form-data">
      <div class="box__input">
        <input id="fontInput" class="box__file" type="file" name="files[]" data-multiple-caption="{count} files selected" multiple />
      </div>
    </form>
  `;
  
  fileButtonParent.innerHTML = fileInputHtml;
  document.getElementById('fontInput').addEventListener('change', onReadFile);
};
  
  export const setupEventListeners = () => {
	const fileButtons = document.getElementById('section__header-file-buttons');
	const stageButtons = document.getElementById('section__header-stage-buttons');
	const toolsToggle = document.getElementById('btn__view-tools-toggle');
	const modeToggle = document.getElementById('btn__mode-toggle');
	const localStorageClearButton = document.getElementById('btn__reset-local-storage');
  
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
  };
  
  const handleFileButtonClick = (event) => {
	if (event.target.classList.contains('btn__setfont')) {
	  event.target.classList.add('active', 'visited');
	  // Remove 'active' class from sibling elements
	  const siblings = Array.from(event.target.parentNode.children).filter(child => child !== event.target);
	  siblings.forEach(sibling => sibling.classList.remove('active'));
	}
  };
  
  const handleStageButtonClick = (event) => {
	if (event.target.classList.contains('btn__setstage')) {
	  event.target.classList.add('active');
	  // Remove 'active' class from sibling elements
	  const siblings = Array.from(event.target.parentNode.children).filter(child => child !== event.target);
	  siblings.forEach(sibling => sibling.classList.remove('active'));
	}
  };
  
  const toggleToolsVisibility = () => {
	document.body.classList.toggle('tools-visible');
  };