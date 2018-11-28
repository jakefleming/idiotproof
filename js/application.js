//To Do
// * Select multiple fonts server side
// * Drag and drop?
// * save pdf to google drive?
// * Sliders attach to parent item class instead of ID of actual text contentEditable
// * Overall sliders
// * Letter spacing and Line Height often “undefined” instead of “0”
// * Pts instead of pixels
// * Occasionally the “Ease” button doesn’t fire on the first click. Once it's on, it's on forever. Is there no way to turn it off once triggered? If so, I couldn’t find it.
// * Can’t switch between 2 <-> 3 columns. Always have to switch back to one column first.
// * Are the settings—like line height—supposed to persist between tabs? Some tabs they do and some tabs they don’t.
// * Pt sizes IN proof
// * “Choose file” is a little unclear. What kinds of files are acceptable? A prompt with files types would help. Having a drag and drop area (rather than just drag to button) would be rad as well.
// * Add “Enabled” states for buttons
// * Add Tool Tips (Hover description) for all buttons
// * bug: font won't load if there's no designer name
// * 4. Switching tabs at the top — `Hamburgers` `Spacing` etc — erases formatting
// * 7. I think you might need some WYSIWYG action. These two things are quite different:
// * 8. It might be worth treating the sections as paragraphs, not separate pages. ie, having 26 pages with a single small paragraph isn't ideal:
// * OpenType feature proofing. For example, it's useless to proof a block of smallcaps as one huge paragraph. It's better to proof them as they'd actually be used, something like this:

//Left field
// * I usually proof from the “UFO”, ie using Test Install with RoboFont. If this was an RF extension… I would be v happy. Unless the web version could work with fonts installed on the system?
// * How about multiple fonts? For tracing drawing/spacing consistency across a family?
// * It would be nice to have also kind of friendly names for features. I think they mostly have comments like # Lowercase, a.alt, is it possible to access them?


var font = null;
window.proofingPhase = "Hamburgers";

var fontFormats = {
    truetype: 'ttf',
    opentype: 'otf',
}

var json = "js/proof.json";

var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
var utcNoSlash = new Date().toJSON().slice(0,10).replace(/-/g,'');

// Utility functions
//------------------------
function toggleClass(thisID, thisClass) {
      document.getElementById(thisID).classList.toggle(thisClass);
}
function preserveUnique(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
}
function showErrorMessage(message) {
    var el = document.getElementById('message');
    if (!message || message.trim().length === 0) {
        el.style.display = 'none';
    } else {
        el.style.display = 'block';
    }
    el.innerHTML = message;
}

function uint8ToBase64(buffer) {
     var binary = '';
     var len = buffer.byteLength;
     for (var i = 0; i < len; i++) {
         binary += String.fromCharCode(buffer[i]);
     }
     return window.btoa( binary );
}
// Was useful when I had a save button
// function localStorageSave(thisClass,valueWanted) {
//     //Attached to actual button
//     var classes = document.getElementsByClassName(thisClass);
//     for(var i = 0; i < classes.length; i++) {
//             localStorage.setItem(classes[i].getAttribute('id'), classes[i][valueWanted]);
//     }
// }
function localStorageClear() {
    localStorage.clear();
    localStorage.setItem('proofingPhase', 'Hamburgers');
    location.reload();
}
function whichFontSize(thisString) {
    if (thisString === "t__size-xxl") {
        return "140";
    } else if (thisString === "t__size-xl") {
        return "100";
    } else if (thisString === "t__size-l") {
        return "84";
    } else if (thisString === "t__size-m") {
        return "56";
    } else if (thisString === "t__size-s") {
        return "28";
    } else if (thisString === "t__size-xs") {
        return "14";
    } else {
          var charCount = thisString.length;
          if (charCount < 25 ) {
                return "t__size-xxl";
          } else if (charCount < 50 ) {
                return "t__size-xl";
          } else if (charCount < 95) {
                return "t__size-l";
          } else if (charCount < 200 ){
                return "t__size-m";
          } else if (charCount < 1000 ){
                return "t__size-s";
          } else {
                return "t__size-xs";
          }
    }
}
// Probably useful one day
// function isVariableFont() {
//     if (font.tables["fvar"]) {
//         return true;
//     } else {
//         return false;
//     }
// }
function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
function removeElementsByID(IDName){
    document.getElementById(IDName).outerHTML = "";
}
function saveData(id, value) {
    if (typeof(Storage) !== "undefined") {
          if (value !== "thisContent") {
                localStorage.setItem(id, value);
          } else {
                var thisContent = $('#'+id).text();
                localStorage.setItem(id, thisContent);
          }
    }
}
//Meat and potatoes
//------------------------

function setStage(thisStage) {
    //insert stage buttons
    var articleID = 'section__article-app',
        article = document.getElementById(articleID),
        stageButtonsID = 'section__header-stage-buttons',
        stageButtons = document.getElementById(stageButtonsID),
        html = '',
        sliderhtml = '',
        proofhtml = '',
        buttonhtml = '',
        styles = '',
        fvarStyle = '';

    $.getJSON(json, function(proof) {
        for(stage in proof) {
            if (stage === thisStage) {
                  var addVariableSliders = function() {
                        if (font.tables.fvar) {
                           var fvarSupport = [];
                           for (var a in font.tables.fvar.axes) {
                                  var tag = font.tables.fvar.axes[a].tag;
                                  fvarSupport.push(tag);
                           }
                           fvarStyle += 'font-variation-settings:';
                           for (var b in font.tables.fvar.axes) {
                                var min = font.tables.fvar.axes[b].minValue;
                                var max = font.tables.fvar.axes[b].maxValue;
                                var tag = font.tables.fvar.axes[b].tag;
                                var name = font.tables.fvar.axes[b].name.en;
                                console.log(testAreaID+'-slider-'+tag+'-val');
                                if (localStorage.getItem(testAreaID+'-slider-'+tag+'-val')) {
                                    var defaultValue = localStorage.getItem(testAreaID+'-slider-'+tag+'-val');
                                    fvarStyle += '\''+tag+'\' '+defaultValue+' ';
                                } else {
                                    var defaultValue = font.tables.fvar.axes[b].defaultValue;
                                }
                                html += '<label for="'+sliderID+'-'+tag+'">'+name+' </label>';
                                html += '<span id="'+sliderID+'-'+tag+'-val">'+defaultValue+'</span>';
                                html += '<button onclick="animatefvarValue(\''+testAreaID+'\', \''+tag+'\', \''+defaultValue+'\', \''+min+'\', \''+max+'\', \''+fvarSupport+'\')" class="btn">ease</button>';
                                html += '<input id="'+sliderID+'-'+tag+'" type="range" class="slider" min="'+min+'" max="'+max+'" value="'+defaultValue+'" oninput="passfvarValue(\''+testAreaID+'\', \''+tag+'\', this.value, \''+fvarSupport+'\')">';
                                if (b != font.tables.fvar.axes.length - 1) {
                                      fvarStyle += ", ";
                                }
                           }
                           fvarStyle += ';';

                        }

                  }
                    html = '';
                    gsubFeatures = font.tables.gsub.features;
                    var taglist = [];
                    for (var i in gsubFeatures) {
                        if (gsubFeatures[i].tag !== "aalt") {
                              var tag = gsubFeatures[i].tag;
                              taglist.push(tag);
                        }
                    }
                    taglist = preserveUnique(taglist);

                    for(var title in proof[stage]) {
                        if (stage === "Features" && !taglist.includes(title)) {
                              continue;
                        } else {
                              var textClass = whichFontSize(proof[stage][title]);
                              var testAreaID = 'section__proofing-'+title;
                              var sliderID = testAreaID+'-slider';
                              var testAreaParent = 'item--'+title;
                              var inlineStyle = '';
                              // font value check localstorage
                              if (localStorage.getItem(sliderID+'-fontSize-val')) {
                                    var fontSize = localStorage.getItem(sliderID+'-fontSize-val');
                                    inlineStyle += 'font-size: '+fontSize+'px;';
                              } else {
                                      var fontSize = whichFontSize(textClass);
                              }
                              if (localStorage.getItem(sliderID+'-lineHeight-val')) {
                                    var lineHeight = localStorage.getItem(sliderID+'-lineHeight-val');
                                    inlineStyle += 'line-height: '+lineHeight+';';
                              }
                              if (localStorage.getItem(sliderID+'-letterSpacing-val')) {
                                    var letterSpacing = localStorage.getItem(sliderID+'-letterSpacing-val');
                                    inlineStyle += 'letter-spacing: '+letterSpacing+'em;';
                              }
                              html += '<div id="'+testAreaParent+'" class="item u__flex">';
                              html += '<div class="item__sliders mr-2 pt-2"><div class="item__sliders-wrapper">';
                              html += '<label for="'+sliderID+'-fontSize">Font Size </label><span id="'+sliderID+'-fontSize-val">'+fontSize+'</span><input id="'+sliderID+'-fontSize" type="range" class="slider" min="4" max="160" step="2" value="'+fontSize+'" oninput="passStyleValue(\''+testAreaID+'\', \'fontSize\', this.value)">';
                              html += '<label for="'+sliderID+'-lineHeight">Line Height </label><span id="'+sliderID+'-lineHeight-val">'+lineHeight+'</span><input id="'+sliderID+'-lineHeight" type="range" class="slider" min="0.6" max="5.0" step="0.05" value="'+lineHeight+'" oninput="passStyleValue(\''+testAreaID+'\', \'lineHeight\', this.value)">';
                              html += '<label for="'+sliderID+'-letterSpacing">Letter Spacing </label><span id="'+sliderID+'-letterSpacing-val">'+letterSpacing+'</span><input id="'+sliderID+'-letterSpacing" type="range" class="slider" min="-0.4" max="0.4" step="0.01" value="'+letterSpacing+'" oninput="passStyleValue(\''+testAreaID+'\', \'letterSpacing\', this.value)">';
                              //Variable sliders
                              addVariableSliders();
                              //plus minus buttons
                              html += '<div class="u__flex btn__wrapper">';
                              html += '<div class="add-item-above mr-1 mb-1"><button class="btn btn-link" onclick="insertField(\''+testAreaParent+'\')">+</button></div>';
                              html += '<div class="remove-item-this mr-1 mb-1"><button class="btn btn-link" onclick="removeElementsByID(\''+testAreaParent+'\')">-</button></div>';
                              //toggle feature button
                              if (stage === "Features") {
                                    html += '<div class="turn-off-feature"><button class="btn btn-link" title="Turn on and off feature preview" onclick="toggleClass(\''+testAreaID+'\', \''+testAreaID+'\')">♫&#xFE0E;</button></div>';
                              }
                              // other style buttons
                              html += '<div class="case-uppercase mr-1 mb-1"><button class="btn btn-link" onclick="passStyleValue(\''+testAreaID+'\',\'textTransform\', \'uppercase\')">TT</button></div>';
                              html += '<div class="case-capitalize mr-1 mb-1"><button class="btn btn-link" onclick="passStyleValue(\''+testAreaID+'\',\'textTransform\', \'capitalize\')">Tt</button></div>';
                              html += '<div class="case-lowercase mr-1 mb-1"><button class="btn btn-link" onclick="passStyleValue(\''+testAreaID+'\',\'textTransform\', \'lowercase\')">tt</button></div>';
                              html += '</div>';
                              html += '<div id="btn__wrapper-columns" class="u__flex btn__wrapper">';
                              html += '<button class="btn btn-link mr-1 mb-1" onclick="passStyleValue(\''+testAreaID+'\',\'column-count\', \'1\')">☱</button>';
                              html += '<button class="btn btn-link mr-1 mb-1" onclick="passStyleValue(\''+testAreaID+'\',\'column-count\', \'2\')">☷</button>';
                              html += '<button class="btn btn-link mr-1 mb-1" onclick="passStyleValue(\''+testAreaID+'\',\'column-count\', \'3\')">☵</button>';
                              html += '</div>';
                              //close tools
                              html += '</div>';
                              html += '</div>';
                              html += '<div class="item__proof">';
                              if (stage === "Features") {
                                    styles += "."+testAreaID+' { font-feature-settings: "'+title+'" 1;}';
                                    var textClass = whichFontSize(proof[stage][title].sample);
                                    html += '<h6 class="h6 text-gray" title="'+proof[stage][title].definition+'">'+title+'</h6>';
                                    html += '<div id="'+testAreaID+'" style="'+inlineStyle+' '+fvarStyle+'" class="t__importedfontfamily '+textClass+' testarea" contenteditable="true" spellcheck="false" onkeyup="saveData(\''+testAreaID+'\', \'thisContent\')">';
                                    // content check localstorage
                                    if (localStorage.getItem(testAreaID)) {
                                          html += localStorage.getItem(testAreaID);
                                    } else {
                                           html +=  proof[stage][title].sample;
                                    }
                              } else {
                                    html += '<h6 class="h6 text-gray">'+title+'</h6>';
                                    html += '<div id="'+testAreaID+'" style="'+inlineStyle+' '+fvarStyle+'" class="t__importedfontfamily '+textClass+' testarea" contentEditable="true" spellcheck="false" onkeyup="saveData(\''+testAreaID+'\', \'thisContent\')">';
                                    // content check localstorage
                                    if (localStorage.getItem(testAreaID)) {
                                          html += localStorage.getItem(testAreaID);
                                    } else {
                                           html += proof[stage][title];
                                    }
                              }
                              html += '</div>';
                              html += '</div>';
                              html += '</div>';
                        }
                    }
                }
                if (html === '') {
                      console.log(html);
                      html += '<div class="item u__flex t__center"><div class="item__proof">No features found! :...(</div></div>';
                }
               if (stage === thisStage) {
                     buttonhtml += '<li class="tab-item active tab__setstage" onclick="setStage(\''+stage+'\')"><a class="#">'+stage+'</a></li>';
               } else {
                     buttonhtml += '<li class="tab-item tab__setstage" onclick="setStage(\''+stage+'\')"><a class="#">'+stage+'</a></li>';
               }
        }
        stageButtons.innerHTML = buttonhtml;
        article.innerHTML = html;
        $("#style__opentype-features").html(styles);

    });
    saveData("proofingPhase",thisStage);
}

var fieldcount = 0;
function insertField(aboveHere) {
    fieldcount += 1;
    console.log(aboveHere);
    var thisClone = jQuery("#"+aboveHere).clone();
    var thisCloneId = thisClone.attr("id");
    console.log(thisCloneId);
    thisCloneId = thisCloneId.replace("item--", "");
    console.log(thisCloneId);
    thisClone.html().replace(thisCloneId, fieldcount);
    thisClone.children("textarea").text("eff yeah");

    $("#"+aboveHere).parent().prepend(thisClone);
}

function passStyleValue(id,property,value) {
      if (property === "fontSize" || property === "lineHeight" || property === "letterSpacing") {
            document.getElementById(id+"-slider-"+property+"-val").innerHTML=value;
            saveData(id+"-slider-"+property+"-val", value);
            if (property === "fontSize") {
                  value = value+"px";
            } else if (property === "letterSpacing") {
                  value = value+"em";
            }
      } else {
            saveData(id+property, value);
      }

      document.getElementById(id).style[property] = value;
}
function passfvarValue(id,property,value,fvarSupport) {
      document.getElementById(id+"-slider-"+property+"-val").innerHTML=value;
      saveData(id+"-slider-"+property+"-val", value);
      if (!(Array.isArray(fvarSupport))){
            fvarSupport = fvarSupport.split(',');
      }
       var fvarcss = "";
       if (fvarSupport.length == 1) {
             fvarcss += "'"+property+"' "+value+" ";
      } else {
            for (f = 0; f < fvarSupport.length; f++) {
                   if (property == fvarSupport[f]) {
                        fvarcss += "'"+property+"' "+value;
                  } else {
                        var fvalue = document.getElementById(id+"-slider-"+fvarSupport[f]).value;
                        fvarcss += "'"+String(fvarSupport[f])+"' "+fvalue;
                  }
                  if (f != fvarSupport.length - 1) {
                        fvarcss += ", ";
                  }
             }
      }
      $('#' + id).css('font-variation-settings', fvarcss);
}

var isAnimating = null;
function animatefvarValue(id,property,value,minValue,maxValue,fvarSupport) {
        document.getElementById(id+"-slider-"+property+"-val").value=value;
        //generate insert keyframe animation based on value
        var styles = '',
            addKeyFrames = null;
        if (isAnimating !== null) {
            $("#style__fvar-animation").html('');
            isAnimating = null;
        } else {
            addKeyFrames = function(name, frames){
                if (CSSRule.WEBKIT_KEYFRAMES_RULE) { // WebKit
                    styles += "@-webkit-keyframes " + name + " {" + frames + "}";
                } else if (CSSRule.MOZ_KEYFRAMES_RULE) { // Mozilla
                    styles += "@-moz-keyframes " + name + " {" + frames + "}";
                } else if (CSSRule.KEYFRAMES_RULE) { // W3C
                    styles += "@keyframes " + name + " {" + frames + "}";
                }
            }
            if (!(Array.isArray(fvarSupport))){
                fvarSupport = fvarSupport.split(',');
            }
            var fvarcss = "";
            if (fvarSupport.length == 1) {
                 addKeyFrames(
                    property+'infinite',
                    '0%, 100% {font-variation-settings:"'+property+'" '+value+';}' +
                    '25% {font-variation-settings:"'+property+'" '+minValue+';}' +
                    '50% {font-variation-settings:"'+property+'" '+maxValue+';}'
                );
            } else {
                for (f = 0; f < fvarSupport.length; f++) {
                    if (property !== fvarSupport[f]) {
                        var fvalue = document.getElementById(id+"-slider-"+fvarSupport[f]).value;
                        fvarcss += "'"+String(fvarSupport[f])+"' "+fvalue+",";
                    }
                 }
                 fvarcss = fvarcss.substring(0, fvarcss.length - 1);
                addKeyFrames(
                    property+'infinite',
                    '0%, 100% {font-variation-settings:"'+property+'" '+value+', '+fvarcss+';}' +
                    '25% {font-variation-settings:"'+property+'" '+minValue+', '+fvarcss+';}' +
                    '50% {font-variation-settings:"'+property+'" '+maxValue+', '+fvarcss+';}'
                );
            }
            $("#style__fvar-animation").html(styles);
            $('#' + id).css("font-variation-settings","unset").css('animation',  property+'infinite 4s ease-in-out infinite');
            isAnimating = true;
        }
}
function displayFontData(fontFamily) {

    var tablename, table, property, value, tag;
    var styles = '';

    for (tablename in font.tables) {
        table = font.tables[tablename];

        if (tablename === 'cmap') {
            var gim = font.tables.cmap.glyphIndexMap;
            var gimLength = Object.keys(gim).length;
            if (gimLength <= 100 ) {
                window.proofingPhase = "Hamburgers";
            } else if (gimLength >= 400 ) {
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
                nameHtml = '';
                if (font.names.designer) {
                    var designerName = font.names.designer.en;
                } else {
                    var designerName = "Designer Name";
                }
                if (font.names.postScriptName) {
                    var postScriptName = font.names.postScriptName.en;
                } else {
                    var postScriptName = "Font Name";
                }
                nameHtml += '<h6 class="h6 section__header-name u__flex-grow-1 t__left" contenteditable="true" spellcheck="false">'+designerName+'</h6>';

                nameHtml += '<a class="off-canvas-toggle h6 section__header-name u__flex-grow-1 t__center p-sticky" href="#sidebar-demo" spellcheck="false">'+postScriptName+'</a>';
                styles += '.t__importedfontfamily { font-family: "'+fontFamily+'" }';
                nameHtml += '<h6 class="h6 section__header-name  u__flex-grow-1 t__right">'+utc+'</h6>';
                document.getElementById('section__header-names').innerHTML = nameHtml;
                continue;
        }
    }
    //Inject css of necessary features
    $("#style__fontfamily").html(styles);
    //setStage
    if (localStorage.getItem('proofingPhase')) {
            // Check for local storage settings
            setStage(localStorage.getItem('proofingPhase'));
    } else {
            setStage(window.proofingPhase);
    }
}

function onFontLoaded(font, fontFamilySource, fontFamily) {
    window.font = font;
    var binaryData = [];
    binaryData.push(font);
    window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}));
    window.fontFamily = fontFamily;

    // Do the actual proofing build
    displayFontData(fontFamily);
    //Set selection into localstorage for potential  livereload later
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "") {
        localStorage.setItem("fontFamily", fontFamily);
        localStorage.setItem("fontFamilySource", fontFamilySource);
    }

}

function onReadFile(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        try {
            var font = opentype.parse(e.target.result);
            var fontFamily = font.names.postScriptName.en;
            var fontFamilySource = "fonts/"+font.names.postScriptName.en;
            onFontLoaded(font, fontFamilySource, fontFamily);

            // store info about the file
            font.file = {
                name: e.name,
                lastModified: e.lastModified,
                size: e.size,
                type: e.type,
            };
            font.type = "user:local";

            var tempUint8array = new Uint8Array(e.target.result);
            $("#style__fontface").html("@font-face {font-family:'" +window.fontFamily+ "'; " + "src: url('data:;base64," + uint8ToBase64(tempUint8array) + "') format('truetype');} ");
            showErrorMessage('');
        } catch (err) {
            showErrorMessage(err.toString());
            if (err.stack) console.log(err.stack);
        throw(err);
        }
    };
    reader.onerror = function(err) {
        showErrorMessage(err.toString());
    };
    reader.readAsArrayBuffer(file);
}

function setFont(fontFamilySource, fontFamily) {
    opentype.load(fontFamilySource, function(err, font) {
        onFontLoaded(font, fontFamilySource, fontFamily);
    });
}

window.onload = function() {
    var fileButtonParent = document.getElementById('section__header-file-buttons');

    if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "") {
        // local
        document.getElementById('section__header-file-buttons').innerHTML = 'Place fonts you want to proof into <code>/fonts</code> to begin';
        var html = '';
        var style = '';
        var allFontFilesInFolder = '';
        $.get( "../txt/fonts.txt", {}, function( data ) {
            allFontFilesInFolder = data.split("fonts/");
            var fonts = [];
            for(var a=0; a<allFontFilesInFolder.length; a++) {
                if (allFontFilesInFolder[a] != "") {
                    thisFont = allFontFilesInFolder[a].trim();
                    fonts.push(thisFont);
                }
            }
            preserveUnique(fonts)
            for(var a=0; a<fonts.length; a++) {
                  var thisFontSource = fonts[a];
                  var thisFontFamily = thisFontSource.replace('.', '-');
                  html += '<span class="btn__setfont chip d-block" title="'+thisFontSource+'" id="btn__setfont-'+thisFontFamily+'" onclick="setFont(\'fonts/'+thisFontSource+'\', \''+thisFontFamily+'\')">'+thisFontSource.replace('ignore/','') +'</span>';
                  style += '@font-face { font-family: "'+thisFontFamily+'"; src: url("fonts/'+thisFontSource+'");}';
            }
            fileButtonParent.innerHTML = html;
            if (localStorage.getItem('fontFamilySource')) {
                    // Check for local storage settings
                  var fontFamilySource = localStorage.getItem('fontFamilySource');
                  var fontFamily = localStorage.getItem('fontFamily');
            } else {
                    var fontFamilySource = "fonts/"+fonts[fonts.length - 1];
                    var fontFamily = thisFontFamily;
            }
            setFont(fontFamilySource, fontFamily);
            document.getElementById("btn__setfont-"+fontFamily).classList.add('active');
            $('#style__fontface').append(style);

            // check local storage values
            var i;
            console.log("local storage");
            for (i = 0; i < localStorage.length; i++)   {
                console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
            }

        }, "text");

    } else {
            // server
            // set first load as gooper
            setFont('fonts/gooper-VF.ttf', 'gooper-VF-ttf');
            $('#style__fontface').html('@font-face { font-family: "gooper-VF-ttf"; src: url("fonts/gooper-VF.ttf");}');
            // watch for user upload
            fileButtonParent.innerHTML = '<input id="fontInput" type="file"><div id="message"></div>';
            var fileButton = document.getElementById('fontInput');
            fileButton.addEventListener('change', onReadFile, false);

    }

    //Active button toggles
    $('#section__header-file-buttons').on('click', '.btn__setfont', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('#section__header-stage-buttons').on('click', '.btn__setstage', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('#btn__view-tools-toggle').on('click', function(e) {
        $('.body__idiotproofed').toggleClass("tools-visible");
    });
    //Tools buttons active class
    $('.btn__wrapper').on('click', '.btn', function() {
      console.log("hey");
      $(this).addClass('active').siblings().removeClass('active');
    });

    document.body.className += " loaded";
    // if (localStorage.getItem('professionalMode')) {
    //         // Check for local storage settings
    //       document.body.className += " professional";
    // } else {
    //         var fontFamilySource = "fonts/"+fonts[fonts.length - 1];
    //         var fontFamily = thisFontFamily;
    // }
}
