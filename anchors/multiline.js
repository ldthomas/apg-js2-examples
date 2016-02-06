// General execution module for the substring examples.
"use strict";
(function() {
  var nodeUtil = require("util");
  var fs = require("fs");
  var opts = {
    showHidden : true,
    depth : null,
    colors : true
  };
  // Quick and dirty conversion of ascii chars to HTML format.
  // Needed for HTML display of grammars that contain HTML entity characters.
  var charsToHtml = function(chars) {
    var html = "";
    chars.forEach(function(char) {
      switch (char) {
      case 32:
        html += "&nbsp;";
        break;
      case 38:
        html += "&#38;";
        break;
      case 39:
        html += "&#39;";
        break;
      case 60:
        html += "&#60;";
        break;
      case 62:
        html += "&#62;";
        break;
      case 92:
        html += "&#92;";
        break;
      default:
        html += String.fromCharCode(char);
      }
    });
    return html;
  }
  var input = "abc\nabc\nxabc\nabc\nxxxx";
  var grammar = new (require("./multiline-grammar.js"))();
  var name = "multiline";
  try {
    var html = "";
    var chars, dir, pageName;
    var apglib = require("apg-lib");
    var parser = new apglib.parser();
    parser.trace = new apglib.trace();
    parser.trace.filter.operators["<ALL>"] = true;
    var id = apglib.ids;
    /* parse the input string */
    chars = apglib.utils.stringToChars(input);
    var result;
    for (var i = 0; i < (chars.length - 3 + 1); i += 1) {
      result = parser.parseSubstring(grammar, 0, chars, i, 3);
      console.log("index: " + i + " :success: " + result.success);
    }
  } catch (e) {
    var msg = "\nEXCEPTION THROWN: ";
    +"\n";
    if (e instanceof Error) {
      msg += e.name + ": " + e.message;
    } else if (typeof (e) === "string") {
      msg += e;
    } else {
      msg += nodeUtil.inspect(e, opts);
    }
    process.exitCode = 1;
    console.log(msg);
    throw e;
  }
})();
