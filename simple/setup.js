// This is a demonstration of the bare minimum needed to set up a parser
// and parse a given input string.
// - *doStats* - if true, demonstrates how to collect and display parsing statistics
// - *doTrace* - if true, demonstrates how to trace the parser and display the traced records
module.exports = function(doStats, doTrace) {
  "use strict";
  var nodeUtil = require("util");
  var fs = require("fs");
  var inspectOptions = {
    showHidden : true,
    depth : null,
    colors : true
  };
  doStats = doStats === true ? true : false;
  doTrace = doTrace === true ? true : false;
  try {
    // Get the apg library. The variable `apglib` has references to all of the library objects
    // and object contructors.
    var apglib = require("apg-lib");
    // Create a parser object. This gets further definition later with the
    // `grammar` object, the `stats` and `trace` objects and the callback function references.
    var parser = new apglib.parser();
    // The `grammar` object defines the SABNF grammar the parser will use to
    // parse an input string.
    // `phone-number.js` is the output of [`apg`](https://github.com/ldthomas/apg-js2) for the SABNF grammar
    // defined by the `phone-number.bnf` file.
    var grammar = new (require("./phone-number.js"))();
    // These identifiers are used by the callback functions to identify the state of the parser
    // at the time the callback function was called.
    var id = apglib.ids;
    // The utility library in [`apg-lib`](https://github.com/ldthomas/apg-js2-lib) has a number of utility functions that are often helpful, even essential
    // for handling string, character codes, HTML display of results and other things.
    var utils = apglib.utils;
    if (doStats) {
      // This creates a `stats` object and attaches it to the parser. When attached,
      // the parser will initialize the object and collect parsing statistics with it
      // for each parse tree node it visits.
      parser.stats = new apglib.stats();
    }
    if (doTrace) {
      // This creates a `trace` object and attaches it to the parser. When attached,
      // the parser will initialize the object and collect tracing records 
      // for each parse tree node it visits
      // (see the [`trace`](../trace/setup.html) example for details on filtering the records).
      parser.trace = new apglib.trace();
    }
    // The next four variables define the parser callback functions for the rule name phrases we are interested in.
    // Callback functions are optional and can be defined for all or none of the rule names
    // defined by the SABNF grammar.
    // Normally, these will be defined in a module of their own to keep the flow of the application clean,
    // but are included here to keep things simple.
    //The callback function arguments are:
    // - *result* - communicates the parsing results to and from the callback functions
    // (see the `parser.parse()` function in [`apg-lib`](https://github.com/ldthomas/apg-js2-lib) for a complete description).
    // Here only `result.state` and `result.phraseLength` are of interest.
    // - *chars* - the array of character codes for the input string being parsed.
    // - *phraseIndex* - index to the first character in *chars* of the phrase the parser is attempting to match
    // - *data* - an optional user data object passed to `parser.parse()` by the user.
    // For callback function use only. The parser never modifies or uses this in any way.
    //
    // For the `phoneNumber()` function, a general case is displayed. In general,
    // a callback function may want to respond to all of the parser states.
    // - *ACTIVE* indicates that the parser is visiting this node on the way down the parse tree.
    // At this point there is no matched phrase - it is not even known whether a phrase will be matched or not.
    // - *EMPTY* indicates that the parser is visiting this node on the way up the parse tree and an empty phrase has been matched.
    // - *MATCH* indicates that the parser is visiting this node on the way up the parse tree
    // and a phrase of `result.phraseLength` (\> 0) has been matched.
    // - *NOMATCH* indicates that the parser is visiting this node on the way up the parse tree
    // and the parser failed to match any phrase at all.
    //
    // For these functions, it is assumed that *data* is an array that they will use to collect the matched phrases in.
    // (See `var phoneParts` below.)
    var phoneNumber = function(result, chars, phraseIndex, data) {
      switch (result.state) {
      case id.ACTIVE:
        if (Array.isArray(data) === false) {
          throw new Error("parser's user data must be an array");
        }
        data.length = 0;
        break;
        /* the following cases not used in this example */
      case id.EMPTY:
        break;
      case id.MATCH:
        break;
      case id.NOMATCH:
        break;
      }
    }
    var areaCode = function(result, chars, phraseIndex, data) {
      if (result.state === id.MATCH) {
        /* capture the area code */
        data["area-code"] = utils.charsToString(chars, phraseIndex,
            result.phraseLength);
      }
    }
    var office = function(result, chars, phraseIndex, data) {
      if (result.state === id.MATCH) {
        /* capture the 3-digit central office or exchange number */
        data["office"] = utils.charsToString(chars, phraseIndex,
            result.phraseLength);
      }
    }
    var subscriber = function(result, chars, phraseIndex, data) {
      if (result.state === id.MATCH) {
        /* capture the 4-digit subscriber number */
        data["subscriber"] = utils.charsToString(chars, phraseIndex,
            result.phraseLength);
      }
    }
    // Define which rules the parser will call callback functions for.
    // (*HINT: the generated grammar object,
    // [`phone-number.js`](./phone-number.html) in this case, will have a pre-defined `callbacks` array for all rule names.*)
    parser.callbacks["phone-number"] = phoneNumber;
    parser.callbacks["area-code"] = areaCode;
    parser.callbacks["office"] = office;
    parser.callbacks["subscriber"] = subscriber;
    /* use a hard-coded input string for this example */
    var inputString = "(555)234-5678";
    /* convert string to character codes */
    var inputCharacterCodes = utils.stringToChars(inputString);
    /* set the parser's "start rule" */
    var startRule = "phone-number";
    /* the callback function's *data* */
    var phoneParts = [];
    // This is the call that will finally parse the input string.
    var result = parser.parse(grammar, startRule, inputCharacterCodes, phoneParts);
    /* display parser results */
    console.log();
    console.log("the parser's results");
    console.dir(result, inspectOptions);
    if (result.success === false) {
      throw new Error("input string: '" + inputString + "' : parse failed")
    }
    /* display phone number parts, captured as matched phrases in the callback functions */
    console.log();
    console.log("phone number: '" + inputString);
    console.log("   area-code: " + phoneParts["area-code"]);
    console.log("      office: " + phoneParts["office"]);
    console.log("  subscriber: " + phoneParts["subscriber"]);
    if (doStats) {
      // This section will demonstrate all of the options for the display of the
      // parsing statistics. Finally, all options will be displayed
      // on a single web page. See the page `html/simple-stats.html` for the results.
      var html = "";
      html += parser.stats.toHtml("ops", "ops-only stats");
      html += parser.stats.toHtml("index", "rules ordered by index");
      html += parser.stats.toHtml("alpha", "rules ordered alphabetically");
      html += parser.stats.toHtml("hits", "rules ordered by hit count");
      var dir = "html";
      var name = dir + "/simple-stats.html";
      try {
        fs.mkdirSync(dir);
      } catch (e) {
        if (e.code !== "EEXIST") {
          throw new Error("fs.mkdir failed: " + e.message);
        }
      }
      html = utils.htmlToPage(html, "simple-stats");
      fs.writeFileSync(name, html);
      console.log();
      console.log('view "'+name+'" in any browser to display parsing statistics');
    }

    if (doTrace) {
      // This section will demonstrate the display of the
      // parser's trace.
      // See the page `html/simple-trace.html` for the results.
      var html = parser.trace.toHtmlPage("ascii", "good phone number, default trace");
      var dir = "html";
      var name = dir + "/simple-trace.html";
      try {
        fs.mkdirSync(dir);
      } catch (e) {
        if (e.code !== "EEXIST") {
          throw new Error("fs.mkdir failed: " + e.message);
        }
      }
      fs.writeFileSync(name, html);
      console.log();
      console.log('view "'+name+'" in any browser to display parser\'s trace');
    }
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
    throw e;
  }
}
