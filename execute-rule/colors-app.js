// This example demonstrates how to call a `UDT` from a rule name callback function.
// This is something you will probably never need to do and you might want to just skip over this example.
// Using this feature changes the grammar that the parser will recognize in unpredictable ways,
// unless you really, really know what you are doing and exactly how the `UDT` you are calling works.
// The only reason these examples are here, is to verify that the
// `evaluateRule()` and `evaluateUdt()` functions are working.
// And the only reason this feature exists at all is because there was a case at one time where
// I really wanted to use a `UDT` but I also really wanted some rule name nodes below it on the `AST`
// for easy translation. For completeness, [`evaluateRule()`](./more-app.html) was added along with `evaluateUdt()`.
//
// There are actually three demonstrations here.
// - the first and most common case is that the syntax callback functions just monitor the parsing process without altering it.
// This might include looking for specific rules designed to locate errors, or tabulating data, or some other administrative activity.
// - in the second demonstration, the callback function actually alters the flow of the parser.
// In this case, it simply causes the parser to fail no matter what the input string is, correct or not.
// A more realistic use of this might be to examine two alternatives, both of which are correct syntactically,
// but reject one based on some type of semantic criteria.
// - in the third demonstration, the syntax callback alters the parsing process by ignoring the prescribed grammar
// altogether and matching phrases with available `UDT` functions.
//
// All three demonstrations are done and the traces of them displayed on a single web page for comparison
// of how the parser actually performed. For the basics of setting up and executing the parser
// see [`simple/setup.js`](../simple/setup.html).
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
    var result;
    var data;
    var inputString;
    var inputCharacterCodes;
    var startRule;
    var html, pageName;
    var apglib = require("apg-lib");
    var grammar = new (require("./colors.js"))();
    var callbacks = require("./colors-callbacks.js");
    var parser = new apglib.parser();
    /* make sure we have an output directory */
    var dir = "html";
    try{
      fs.mkdirSync(dir);
    }catch(e){
      if (e.code !== "EEXIST") {
        throw new Error("fs.mkdir failed: " + e.message);
      }
    }
    /* set up the parser */
    parser.trace = new apglib.trace();
    inputString = "red,white,blue";
    inputCharacterCodes = apglib.utils.stringToChars(inputString);
    startRule = 0;
    /* define the callback fuctions for demo one */
    parser.callbacks['start'] = callbacks.startCallback;
    parser.callbacks['u_blue'] = callbacks.u_blueCallback;
    parser.callbacks['u_red'] = callbacks.u_redCallback;
    parser.callbacks['u_white'] = callbacks.u_whiteCallback;
    parser.callbacks['u_yellow'] = callbacks.u_yellowCallback;
    // In this case, the `color` callback function just monitors the parser's flow without altering it.
    // The input string is parsed and the trace saved for later display on a web page.
    // (See [`colors-callbacks.js`](./colors-callbacks.html) for the callback functions.)
    data = [];
    parser.callbacks['color'] = callbacks.monitorCallback;
    result = parser.parse(grammar, startRule, inputCharacterCodes, data);
    console.log();
    console.log("the monitor callback results");
    console.dir(result, inspectOptions);
    html = parser.trace.toHtml(null, "monitor callback")
    // In this case, the `color` callback function actually modifies the parsing process
    // by returning a non-`ACTIVE` state. The action in this case is to always fail,
    // which is simply to demonstrate how modification from a syntax callback function can be done.
    parser.callbacks['color'] = callbacks.modifyCallback;
    result = parser.parse(grammar, startRule, inputCharacterCodes, data);
    console.log();
    console.log("the modify callback results");
    console.dir(result, inspectOptions);
    html += parser.trace.toHtml(null, "modify callback")
    // In this case the `color` callback function modifies the parsing process by calling a `UDT` function to do its work.
    // In addition to accepting the colors red, white and blue, it uses a `UDT` to accept yellow as well.
    inputString = "red,white,blue,yellow";
    inputCharacterCodes = apglib.utils.stringToChars(inputString);
    parser.callbacks['color'] = callbacks.callUdtCallback;
    result = parser.parse(grammar, startRule, inputCharacterCodes, data);
    console.log();
    console.log("the evaluateUdt() callback results");
    console.dir(result, inspectOptions);
    html += parser.trace.toHtml("ascii","evaluateUdt() callback")
    html = apglib.utils.htmlToPage(html, "colors app");
    pageName = dir + "/colors-app.html";
    fs.writeFileSync(pageName, html);
    console.log('view "' + pageName + '" in any browser to display parsing trace comparison');
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
