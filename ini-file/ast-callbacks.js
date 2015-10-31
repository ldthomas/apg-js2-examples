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

	var findKey = function(keyname, section) {
		var lower = keyname.toLowerCase();
		for ( var name in section) {
			if (name.toLowerCase() === lower) {
				return section[keyname];
			}
		}
		return undefined
	}

	var findSection = function(sectionname, sections) {
		var lower = sectionname.toLowerCase();
		for ( var name in sections) {
			if (name.toLowerCase() === lower) {
				return sections[sectionname];
			}
		}
		return undefined
	}

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

	function astKeyName(state, chars, phraseIndex, phraseLength, data) {
		var ret = id.SEM_OK;
		if (state == id.SEM_PRE) {
			var name = apglib.utils.charsToString(chars, phraseIndex,phraseLength);
			currentKey = findKey(name, currentSection);
			if (currentKey === undefined) {
				currentKey = [];
				currentSection[name] = currentKey;
			}
		} else if (state == id.SEM_POST) {
		}
		return ret;
	}

	function astSectionName(state, chars, phraseIndex, phraseLength, data) {
		var ret = id.SEM_OK;
		if (state == id.SEM_PRE) {
			var name = apglib.utils.charsToString(chars, phraseIndex,phraseLength);
			currentSection = findSection(name, data);
			if (currentSection === undefined) {
				currentSection = {};
				data[name] = currentSection;
			}
		} else if (state == id.SEM_POST) {
		}
		return ret;
	}

	function astValue(state, chars, phraseIndex, phraseLength, data) {
		var ret = id.SEM_OK;
		if (state == id.SEM_PRE) {
			var value = apglib.utils.charsToString(chars, phraseIndex,phraseLength);
			currentKey.push(value);
		} else if (state == id.SEM_POST) {
		}
		return ret;
	}

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
