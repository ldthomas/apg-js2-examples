// General execution module for the substring examples.
module.exports = function(input, beg, len, grammar, name) {
  "use strict";
  var nodeUtil = require("util");
  var fs = require("fs");
  var opts = {
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
    var html = "";
    var chars, dir, pageName;
    var apglib = require("apg-lib");
    var parser = new apglib.parser();
    parser.trace = new apglib.trace();
    parser.trace.filter.operators["<ALL>"] = true;
    var id = apglib.ids;
    /* parse the substring */
    var result = parser.parseSubstring(grammar, 0, input, beg, len);
    /* output info to console */
    console.log();
    console.log("     input: " + input);
    console.log("   results:");
    console.dir(result, opts);
    /* put input, results and trace on HTML page */
    dir = "./html";
    pageName = dir + "/" + name + ".html";
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
    html += apglib.utils.parserResultToHtml(result);
    html += parser.trace.toHtml("ascii", name);
    html = apglib.utils.htmlToPage(html);
    try {
      fs.mkdirSync(dir);
    } catch (e) {
      if (e.code !== "EEXIST") {
        throw new Error("fs.mkdir failed: " + e.message);
      }
    }
    fs.writeFileSync(pageName, html);
    console.log("HTML trace at: " + pageName);
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
};
