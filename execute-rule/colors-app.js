(function() {
  "use strict";
  var fs = require("fs");
  var nodeUtil = require("util");
  var inspectOptions = {
    showHidden : true,
    depth : null,
    colors : true
  };
  try {
    // get the required parser components
    var result;
    var data;
    var inputString;
    var inputCharacterCodes;
    var startRule;
    var html = "";
    var apglib = require("apg-lib");
    var grammar = new (require("./colors.js"))();
    var callbacks = require("./colors-callbacks.js");
    var parser = new apglib.parser();
    parser.trace = new apglib.trace();

    // get the input string (hard-coded for this example)
    inputString = "red,white,blue";

    // convert string to character codes
    inputCharacterCodes = apglib.utils.stringToChars(inputString);

    // set the parser's "start rule"
    startRule = 0;

    parser.callbacks['start'] = callbacks.startCallback;
    parser.callbacks['u_blue'] = callbacks.u_blueCallback;
    parser.callbacks['u_red'] = callbacks.u_redCallback;
    parser.callbacks['u_white'] = callbacks.u_whiteCallback;
    parser.callbacks['u_yellow'] = callbacks.u_yellowCallback;
    // monitor
    data = [];
    parser.callbacks['color'] = callbacks.monitorCallback;
    result = parser.parse(grammar, startRule, inputCharacterCodes, data);
    console.log();
    console.log("the monitor callback results");
    console.dir(result, inspectOptions);
    html += parser.trace.displayHtml("monitor callback")

    // modify
    parser.callbacks['color'] = callbacks.modifyCallback;
    result = parser.parse(grammar, startRule, inputCharacterCodes, data);
    console.log();
    console.log("the modify callback results");
    console.dir(result, inspectOptions);
    html += parser.trace.displayHtml("modify callback")

    // evalUdt()
    inputString = "red,white,blue,yellow";
    inputCharacterCodes = apglib.utils.stringToChars(inputString);
    parser.callbacks['color'] = callbacks.callUdtCallback;
    result = parser.parse(grammar, startRule, inputCharacterCodes, data);
    console.log();
    console.log("the evalUdt() callback results");
    console.dir(result, inspectOptions);
    html += parser.trace.displayHtml("evalUdt() callback")

    // display parser results
    var dir = "html";
    var filename = dir + "/colors-evalUdt.html"
    try {
      fs.mkdirSync(dir);
    } catch (e) {
      if (e.code !== "EEXIST") {
        throw new Error("fs.mkdir failed: " + e.message);
      }
    }
    result = apglib.utils.htmlToPage(html, filename);
    if (result.hasErrors === true) {
      throw new Error(result.errors[0]);
    }
    console.log();
    console.log('view "' + filename
        + '" in any browser to display parsing trace comparison');
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
})();
