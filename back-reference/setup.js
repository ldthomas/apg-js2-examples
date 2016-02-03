// This is the general set up for the back reference examples.
module.exports = function(input, grammar, name, doTrace) {
  "use strict";
  var fs = require("fs");
  var nodeUtil = require("util");
  var inspectOptions = {
    showHidden : true,
    depth : null,
    colors : true
  };
  // Quick and dirty conversion of ascii chars to HTML format.
  // Needed for HTML display of grammars that contain HTML entity characters.
  var charsToHtml = function(chars){
    var html = "";
    chars.forEach(function(char){
      switch(char){
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
  try {
    var chars;
    var html = "";
    var pageName = "./html/" + name + ".html";
    var apglib = require("apg-lib");
    var parser = new apglib.parser();
    if(doTrace === true){
      parser.trace = new apglib.trace();
      parser.trace.filter.operators["<ALL>"] = true;
    }
    var id = apglib.ids;
    /* parse the input string */
    var result = parser.parse(grammar, 0, input);
    /* output to console */
    console.log();
    console.log("        HTML: " + pageName);
    console.log("           results:");
    console.dir(result, inspectOptions);
    /* display input, results and trace on HMTL page */
    html += "<h3>Grammar Source</h3>";
    html += "<pre>";
    chars = apglib.utils.stringToChars(grammar.toString())
    html += charsToHtml(chars);
    html += "</pre>";
    html += "<h3>Input String</h3>";
    html += "<pre>";
    chars = apglib.utils.stringToChars(input);
    html += apglib.utils.charsToAsciiHtml(chars);
    html += "</pre>";
    html += apglib.utils.parserResultToHtml(result, "Parser Results");
    if(doTrace){
      html += parser.trace.toHtml("ascii", name);
    }
    html = apglib.utils.htmlToPage(html, name, name);
    fs.writeFileSync(pageName, html);
    console.log("see " + pageName + " for html display of output");
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
