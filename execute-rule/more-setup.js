// This module sets up an application to demonstrate how to call any arbitrary rule name `RNM`
// callback function from any other callback function - in this case from a `UDT` callback.
// (See the initial discussion for [`colors-app.js`](./colors-app.html) for the motivation 
// and cautionary tales of doing this kind of craziness.)
module.exports = function(udtcallback, title){
  "use strict";
  var nodeUtil = require("util");
  var inspectOptions = {
      showHidden : true,
      depth : null,
      colors : true
    };
  try {
    // See [`simple/setup.js`](../simple/setup.html) for the basics of setting up the parser.
    var apglib = require("apg-lib");
    var grammar = new (require("./more.js"))();
    var parser = new apglib.parser();
    parser.stats = new apglib.stats();
    parser.trace = new apglib.trace();
    parser.callbacks["u_more"] = udtcallback;
    var inputString = "start more more";
    var inputCharacterCodes = apglib.utils.stringToChars(inputString);
    var startRule = 0;
    /* parse the input string */
    var result = parser.parse(grammar, startRule, inputCharacterCodes);
    /* display parser results */
    console.log();
    console.log("the parser's results");
    console.dir(result, inspectOptions);
    if (result.success === false) {
      throw new Error("input string: '" + inputString
          + "' : parse failed")
    }
    var html = "";
    // Returns the statistics and trace displays to the application.
    // The application will decide how to display it.
    html += parser.stats.toHtml("hits", title);
    html += parser.trace.toHtml(title);
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
