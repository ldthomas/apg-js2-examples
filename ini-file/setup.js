// This module provides an example of how a more "real world" parser might be built.
// It parses the [INI file format](https://en.wikipedia.org/wiki/INI_file), commonly
// used as a configuration file for many types of applications.
// The [grammar](./ini-file.html) (grammar.bnf) presented here includes "error productions".
// That is, rules are defined to catch errors in the configuration file format.
// This way, instead of simply having the parser fail on bad input (a very frustrating user experience)
// the application can provide callback functions to catch the errors and report them to the user.
//
// To keep things modular the syntax and `AST` callback functions are defined in separate modules,
// [`parser-callbacks.js`](./parser-callbacks.html) and [`ast-callbacks.js`](./ast-callbacks.html), resectively,
// and "require()"ed by the application as need.
//
// - *input* - the input string to parse
// - *trace* - if `true` display the trace
// - *stats* - if `true` display the stats
module.exports = function(input, trace, stats) {
  "use strict";
  var thisFileName = "setup.js: ";
  var nodeUtil = require("util");
  var fs = require("fs");
  var inspectOptions = {
    showHidden : true,
    depth : null,
    colors : true
  };
  /* build an array of names (strings) and sort them alphabetically */
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
    if (typeof (input) !== "string") {
      throw new Error(thisFileName + "invalid input string");
    }
    if (trace === null || typeof (trace) !== "object"
        || trace.traceObject !== "traceObject") {
      trace = null;
    }
    if (stats === null || typeof (stats) !== "object"
        || stats.statsObject !== "statsObject") {
      stats = null;
    }
    // Get the required parser components (see [`simple/setup.js`](../simple/setup.html) for the basics of setting up the parser).
    var apglib = require("apg-lib");
    var parser = new apglib.parser();
    var grammar = new (require("./ini-file.js"))();
    var parserCallbacks = new (require("./parser-callbacks.js"))();
    var astCallbacks = new (require("./ast-callbacks.js"))();
    parser.ast = new apglib.ast();
    // Define the syntax callback functions to the parser.
    parser.callbacks = parserCallbacks.callbacks;
    // Define the semantic (`AST`) callback functions to the parser.
    parser.ast.callbacks = astCallbacks.callbacks;
    parser.trace = trace;
    parser.stats = stats;
    var id = apglib.ids;
    var inputCharacterCodes = apglib.utils.stringToChars(input);
    /* object to hold error messages from the syntax callback functions */
    var syntaxData = {};
    // Parse the input string. The syntax callback functions simply
    // monitor the parser, reporting any syntax errors it finds in the input string.
    var result = parser.parse(grammar, 0, inputCharacterCodes, syntaxData);
    console.log();
    console.log("the parser's results");
    console.dir(result, inspectOptions);
    if (result.success !== true) {
      throw new Error(thisFileName + "parse failed");
    }
    if (syntaxData.errors.length > 0) {
      console.log();
      console.log("syntax errors found:");
      syntaxData.errors.forEach(function(error) {
        console.log(error);
      });
    }
    var html, pageName;
    if (parser.stats !== null) {
      // Display stats, if requested.
      var dir = "html";
      try {
        fs.mkdirSync(dir);
      } catch (e) {
        if (e.code !== "EEXIST") {
          throw new Error("fs.mkdir failed: " + e.message);
        }
      }
      html = parser.stats.displayHtml("hits", "rules ordered by hit count");
      pageName = dir + "/ini-file-stats.html";
      result = apglib.utils.htmlToPage(html, pageName);
      if (result.hasErrors === true) {
        throw result;
      }
      console.log();
      console.log('view "' + pageName
          + '" in any browser to display parsing statistics');
    }
    if (parser.trace !== null) {
      // Display the trace, if requested
      var dir = "html";
      try {
        fs.mkdirSync(dir);
      } catch (e) {
        if (e.code !== "EEXIST") {
          throw new Error("fs.mkdir failed: " + e.message);
        }
      }
      pageName = dir + "/ini-file-trace.html";
      html = parser.trace.displayHtml("IniFile Trace", "ascii");
      result = apglib.utils.htmlToPage(html, pageName);
      if (result.hasErrors === true) {
        throw result;
      }
      console.log();
      console.log('view "' + pageName
          + '" in any browser to display parser\'s trace');
    }
    /* object to hold the parsed data */
    var data = {};
    // The syntax is correct, so translate the ini file format data into a JSON-like object.
    // Alphabetize the section names and the key names within each section and display on the console.
    parser.ast.translate(data);
    console.log();
    console.log("alphabetized AST translation data:")
    console.log();
    var sectionNames = sortNames(data);
    sectionNames.forEach(function(sectionName) {
      if (sectionName !== '0') {
        console.log();
        console.log('[' + sectionName + ']');
      }
      var keys = sortNames(data[sectionName]);
      keys.forEach(function(keyName) {
        console.log(keyName + ': ' + data[sectionName][keyName]);
      });
    });
  } catch (e) {
    var msg = "\nEXCEPTION THROWN: ";
    +"\n";
    if (e instanceof Error) {
      msg += e.name + ": " + e.message;
    } else if (typeof (e) === "string") {
      msg += e;
    } else {
      msg += nodeUtil.inspect(e, inspectOptions);
    }
    process.exitCode = 1;
    console.log(msg);
    throw e;
  }
}
