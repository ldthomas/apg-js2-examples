// This is the general set up for demonstrating both 
// the translation and `XML` display of the `AST`.
// See [`simple/setup.js`](../simple/setup.html) for a complete description of the various parts of this set up.
module.exports = function(input, grammar, trace, universalMode) {
  "use strict";
  var nodeUtil = require("util");
  var inspectOptions = {
    showHidden : true,
    depth : null,
    colors : true
  };
  try {
    var grammar = new (require(grammar))();
    var apglib = require("apg-lib");
    var parser = new apglib.parser();
    parser.trace = new apglib.trace();
    parser.trace.filter.operators["<ALL>"] = true;
    var id = apglib.ids;
    var inputCharacterCodes = apglib.utils.stringToChars(input);
    var mode = "parent frame";
    if(universalMode === true){
      parser.setUniversalMode(true);
      mode = "universal";
    }
    var result = parser.parse(grammar, 0, inputCharacterCodes);
    console.log();
    console.log("backreference mode: " + mode);
    console.log("        HTML trace: " + "./html/" +trace + ".html");
    console.log("           results:");
    console.dir(result, inspectOptions);
    apglib.utils.htmlToPage(parser.trace.displayHtml(), "./html/" +trace + ".html");
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
};
