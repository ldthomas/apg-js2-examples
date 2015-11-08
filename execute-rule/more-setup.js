module.exports = function(udtcallback, title){
  "use strict";
  var nodeUtil = require("util");
  var inspectOptions = {
      showHidden : true,
      depth : null,
      colors : true
    };
  try {
    // get the required parser components
    var apglib = require("apg-lib");
    var grammar = new (require("./more.js"))();
    var parser = new apglib.parser();
    parser.stats = new apglib.stats();
    parser.trace = new apglib.trace();
    
    // set the parser callback functions
    parser.callbacks["u_more"] = udtcallback;
    
    // get the input string (hard-coded for this example)
    var inputString = "start more more";
    
    // convert string to character codes
    var inputCharacterCodes = apglib.utils.stringToChars(inputString);
    
    // set the parser's "start rule"
    var startRule = 0;
    var result = parser.parse(grammar, startRule, inputCharacterCodes);
    
    // display parser results
    console.log();
    console.log("the parser's results");
    console.dir(result, inspectOptions);
    if (result.success === false) {
      throw new Error("input string: '" + inputString
          + "' : parse failed")
    }
    var html = "";
    html += parser.stats.displayHtml("hits", title);
    html += parser.trace.displayHtml(title);
    return html;
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
