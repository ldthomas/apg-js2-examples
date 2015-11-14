// This module defines the syntax callback functions.
// Called by the parser during parsing or syntax analysis.
module.exports = function() {
  "use strict";
  var apglib = require("apg-lib");
  var id = apglib.ids;
  var thisFileName = "parser-callbacks.js: ";
  var msg = "";
  var synIniFile = function(result, chars, phraseIndex, data) {
    var funcName = thisFileName + "sysIniFile: ";
    switch (result.state) {
    case id.ACTIVE:
      /* initialize the data object */
      data.errors = [];
      data.lineNo = 0;
      break;
    case id.EMPTY:
      break;
    case id.MATCH:
      break;
    case id.NOMATCH:
      break;
    }
  }
  var synBadSectionLine = function(result, chars, phraseIndex, data) {
    var funcName = thisFileName + "synBadSectionLine: ";
    switch (result.state) {
    case id.ACTIVE:
      break;
    case id.EMPTY:
      break;
    case id.MATCH:
      /* report this line of text as a section line error */
      msg = funcName + "line no: " + data.lineNo
          + ": bad section definition:\n";
      msg += apglib.utils
          .charsToString(chars, phraseIndex, result.phraseLength);
      data.errors.push(msg)
      break;
    case id.NOMATCH:
      break;
    }
  }
  var synBadValueLine = function(result, chars, phraseIndex, data) {
    var funcName = thisFileName + "synBadValueLine: ";
    switch (result.state) {
    case id.ACTIVE:
      break;
    case id.EMPTY:
      break;
    case id.MATCH:
      /* report this line of text as a vaLue line error */
      msg = funcName + "line no: " + data.lineNo
          + ": bad key/value definition:\n";
      msg += apglib.utils
          .charsToString(chars, phraseIndex, result.phraseLength);
      data.errors.push(msg)
      break;
    case id.NOMATCH:
      break;
    }
  }
  var synBadBlankLine = function(result, chars, phraseIndex, data) {
    var funcName = thisFileName + "synBadBlankLine: ";
    switch (result.state) {
    case id.ACTIVE:
      break;
    case id.EMPTY:
      break;
    case id.MATCH:
      /* report this line of text as a blank line error */
      msg = funcName + "line no: " + data.lineNo
          + ": blank lines only allowed to have white space and comments\n";
      msg += apglib.utils
          .charsToString(chars, phraseIndex, result.phraseLength);
      data.errors.push(msg)
      break;
    case id.NOMATCH:
      break;
    }
  }
  var synLineEnd = function(result, chars, phraseIndex, data) {
    switch (result.state) {
    case id.ACTIVE:
      break;
    case id.EMPTY:
      break;
    case id.MATCH:
      /* count the lines */
      data.lineNo += 1;
      break;
    case id.NOMATCH:
      break;
    }
  }
  // Define all of the callback functions that will be used.
  // (*Created as a copy, paste & edit from [the grammar](./ini-file.html).*)
  this.callbacks = [];
  this.callbacks['alpha'] = false;
  this.callbacks['alphadigit'] = false;
  this.callbacks['any'] = false;
  this.callbacks['badblankline'] = synBadBlankLine;
  this.callbacks['badsectionline'] = synBadSectionLine;
  this.callbacks['badvalueline'] = synBadValueLine;
  this.callbacks['blankline'] = false;
  this.callbacks['comment'] = false;
  this.callbacks['digit'] = false;
  this.callbacks['dquotedstring'] = false;
  this.callbacks['goodblankline'] = false;
  this.callbacks['goodsectionline'] = false;
  this.callbacks['goodvalueline'] = false;
  this.callbacks['inifile'] = synIniFile;
  this.callbacks['keyname'] = false;
  this.callbacks['lineend'] = synLineEnd;
  this.callbacks['section'] = false;
  this.callbacks['sectionline'] = false;
  this.callbacks['sectionname'] = false;
  this.callbacks['squotedstring'] = false;
  this.callbacks['value'] = false;
  this.callbacks['valuearray'] = false;
  this.callbacks['valueline'] = false;
  this.callbacks['wsp'] = false;
};
