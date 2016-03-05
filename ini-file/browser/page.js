// This module is the event handler for the "parse" button on the web page.
// It is set as the handler in [`setup.js`](./setup.html).
// It reads the input string from a textbox on the web page,
// parses the string and displays the results on the same web page.
// It uses [`jQuery`](https://www.npmjs.com/package/jquery) to manipulate the DOM.
module.exports = function() {
  "use strict";
  var thisFileName = "page.js: ";
  var html = "";
  var statsHtml = "";
  var traceHtml = "";
  var sortNames = function(obj) {
    var count = 0;
    var names = [];
    for ( var name in obj) {
      count += 1;
      names.push(name);
    }
    return names.sort();
  }
  try {
    var $ = require("jquery");
    var apglib = require("apg-lib");
    var grammar = new (require("../ini-file.js"))();
    var parserCallbacks = new (require("../parser-callbacks.js"))();
    var astCallbacks = new (require("../ast-callbacks.js"))();
    var id = apglib.ids;
    var parser = new apglib.parser();
    parser.ast = new apglib.ast();
    parser.callbacks = parserCallbacks.callbacks;
    parser.ast.callbacks = astCallbacks.callbacks;
    html += apglib.utils.styleClasses();
    html += apglib.utils.styleLeftTable();
    html += apglib.utils.styleRightTable();
    html += apglib.utils.styleLastLeftTable();
    html += apglib.utils.styleLast2LeftTable();
    if ($("#trace").prop("checked")) {
      parser.trace = new apglib.trace();
    }
    if ($("#stats").prop("checked")) {
      parser.stats = new apglib.stats();
    }
    // Get the input string from the textbox.
    var input = $("#input-string").val();
    var inputCharacterCodes = apglib.utils.stringToChars(input);
    var syntaxData = {};
    // Parse the input string (INI file data).
    var result = parser.parse(grammar, 0, inputCharacterCodes, syntaxData);
    if (parser.stats !== null) {
      statsHtml = parser.stats.toHtml("hits", "rules ordered by hit count");
    }
    if (parser.trace !== null) {
      traceHtml = parser.trace.toHtml("IniFile Trace", "ascii");
    }
    html += "<p><b>the parser's results: </b></p><p>";
    html += apglib.utils.parserResultToHtml(result);
    html += "</p>";
    if (result.success !== true) {
      throw new Error(thisFileName + "parse failed");
    }
    if (syntaxData.errors.length > 0) {
      html += "<p><b>syntax errors found: </b></p><p>";
      syntaxData.errors.forEach(function(error) {
        html += error + "<br>";
      });
      html += "</p>";
    }
    var data = {};
    // Translate the parsed data into a data object of sections and keys.
    // Sort the sections and keys alphabetically.
    parser.ast.translate(data);
    var sectionNames = sortNames(data);
    html += "<p><b>alphabetized AST translation data:</b></p><p>";
    sectionNames.forEach(function(sectionName) {
      if (sectionName !== '0') {
        html += '[' + sectionName + ']<br>';
      }
      var keys = sortNames(data[sectionName]);
      keys.forEach(function(keyName) {
        html += keyName + ' = ' + data[sectionName][keyName] + '<br>';
      });
      html += "<br>";
    });
    html += "</p>";
  } catch (e) {
    var msg = "\nEXCEPTION THROWN: \n";
    if (e instanceof Error) {
      msg += e.name + ": " + e.message;
    } else if (typeof (e) === "string") {
      msg += e;
    } else {
      msg += nodeUtil.inspect(e, inspectOptions);
    }
    console.log(msg);
    html += "<p>" + msg + "</p>";
    throw e;
  } finally {
    // Display all collected results on the web page.
    $("#parser-output").html(html + statsHtml + traceHtml);
  }
}
