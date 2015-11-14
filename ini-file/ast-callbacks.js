// This module defines the `AST` translation callback functions functions. This is where the real work is done
// manipulating the data gleaned from the INI file format.
module.exports = function() {
  "use strict";
  var apglib = require("apg-lib");
  var id = apglib.ids;
  var thisFileName = "ast-callbacks.js: ";
  var currentSection;
  var currentKey;
  var inspectOptions = {
    showHidden : true,
    depth : null,
    colors : true
  };
  // Find a specific named key in a section object.
  var findKey = function(keyname, section) {
    var lower = keyname.toLowerCase();
    for ( var name in section) {
      if (name.toLowerCase() === lower) {
        return section[keyname];
      }
    }
    return undefined
  }
  // Find a specific named section in a list of sections.
  var findSection = function(sectionname, sections) {
    var lower = sectionname.toLowerCase();
    for ( var name in sections) {
      if (name.toLowerCase() === lower) {
        return sections[sectionname];
      }
    }
    return undefined
  }
  // Initialize the collection data object.
  function astIniFile(state, chars, phraseIndex, phraseLength, data) {
    var ret = id.SEM_OK;
    if (state == id.SEM_PRE) {
      currentSection = {};
      data[0] = currentSection;
      currentKey = undefined;
    } else if (state == id.SEM_POST) {
    }
    return ret;
  }
  // Collect key name and as set it the current key object.
  function astKeyName(state, chars, phraseIndex, phraseLength, data) {
    var ret = id.SEM_OK;
    if (state == id.SEM_PRE) {
      var name = apglib.utils.charsToString(chars, phraseIndex, phraseLength);
      currentKey = findKey(name, currentSection);
      if (currentKey === undefined) {
        currentKey = [];
        currentSection[name] = currentKey;
      }
    } else if (state == id.SEM_POST) {
    }
    return ret;
  }
  // Collect section name and as set it the current section object.
  function astSectionName(state, chars, phraseIndex, phraseLength, data) {
    var ret = id.SEM_OK;
    if (state == id.SEM_PRE) {
      var name = apglib.utils.charsToString(chars, phraseIndex, phraseLength);
      currentSection = findSection(name, data);
      if (currentSection === undefined) {
        currentSection = {};
        data[name] = currentSection;
      }
    } else if (state == id.SEM_POST) {
    }
    return ret;
  }
  // Push a value into the current key object.
  function astValue(state, chars, phraseIndex, phraseLength, data) {
    var ret = id.SEM_OK;
    if (state == id.SEM_PRE) {
      var value = apglib.utils.charsToString(chars, phraseIndex, phraseLength);
      currentKey.push(value);
    } else if (state == id.SEM_POST) {
    }
    return ret;
  }
  // Define all of the callback functions that will be used.
  // (*Created as a copy, paste & edit from [the grammar](./ini-file.html).*)
  this.callbacks = [];
  this.callbacks['alpha'] = false;
  this.callbacks['alphadigit'] = false;
  this.callbacks['any'] = false;
  this.callbacks['badblankline'] = false;
  this.callbacks['badsectionline'] = false;
  this.callbacks['badvalueline'] = false;
  this.callbacks['blankline'] = false;
  this.callbacks['comment'] = false;
  this.callbacks['digit'] = false;
  this.callbacks['dquotedstring'] = false;
  this.callbacks['goodblankline'] = false;
  this.callbacks['goodsectionline'] = false;
  this.callbacks['goodvalueline'] = false;
  this.callbacks['inifile'] = astIniFile;
  this.callbacks['keyname'] = astKeyName;
  this.callbacks['lineend'] = false;
  this.callbacks['section'] = false;
  this.callbacks['sectionline'] = false;
  this.callbacks['sectionname'] = astSectionName;
  this.callbacks['squotedstring'] = false;
  this.callbacks['value'] = astValue;
  this.callbacks['valuearray'] = false;
  this.callbacks['valueline'] = false;
  this.callbacks['wsp'] = false;
};
