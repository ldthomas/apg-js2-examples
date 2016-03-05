// This module demonstrates some of the many options available for displaying the results.
// Functions are available for displaying the source (grammar syntax), the `result` and the `last match` (the `apg-exp` object).
// The `last result` is patterned after the JavaScript `RegExp` object as described
//at [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
//
// Let:
// ```
// var apgexp = require("apg-exp");
// var grammar = 'rule = "abc"\n';
// var exp = new apgexp(grammar);
// var str = "<<<-abc->>>";
// var result = exp.exec(str);
// ```
// There are text and HTML display options for each of the objects `result`, `exp` and `exp.source`.
// <ul>
// <li>
// `result`:
// <ul>
// <li>
// `result.toText()` - returns a text string of the results.
// </li>
// <li>
// `result.toHtml()` - returns the results in HTML format.
// </li>
// <li>
// `result.toHtmlPage()` - returns the results in a complete HTML page, ready for browser viewing.
// </li>
// </ul>
// </li>
// <li>
// `exp`:
// <ul>
// <li>
// `exp.toText()` - returns the `last match` as a text string.
// </li>
// <li>
// `exp.toHtml()` - returns the `last match` in HTML format.
// </li>
// <li>
// `exp.toHtmlPage()` - returns the `last match` in a complete HTML page, ready for browser viewing.
// </li>
// </ul>
// </li>
// <li>
// `source` (SABNF grammar):
// <ul>
// <li>
// `exp.sourceToText()` - returns source as a text string.
// </li>
// <li>
// `exp.sourceToHtml()` - returns source in HTML format.
// </li>
// <li>
// `exp.sourceToHtmlPage()` - returns source in a complete HTML page, ready for browser viewing.
// </li>
// </ul>
// </li>
// </ul>
(function() {
  try {
    var apgexp = require("apg-exp");
    var apglib = require("apg-lib");
    var writeHtml = require("../writeHtml.js");
    var grammar = 'pattern = "abc"\n';
    var exp, flags, result, str, html, txt, page;
    html = "";
    flags = "";
    str = "<<<-abc->>>";
    exp = new apgexp(grammar, flags);
    result = exp.exec(str);
    txt = exp.sourceToText();

    /* source */
    console.log();
    console.log("source:");
    console.log(txt);
    html += "<h3>source example</h3>"
    html += exp.sourceToHtml();
    page = exp.sourceToHtmlPage();
    writeHtml(page, "display-source");

    /* results */
    txt = result.toText();
    console.log();
    console.log(txt);
    html += "<h3>results example</h3>"
    html += result.toHtml();
    page = result.toHtmlPage();
    writeHtml(page, "display-results");

    /* last match */
    txt = exp.toText();
    console.log();
    console.log(txt);
    html += "<h3>last match example</h3>"
    html += exp.toHtml();
    page = exp.toHtmlPage();
    writeHtml(page, "display-exp");

    html = apglib.utils.htmlToPage(html);
    writeHtml(html, "display-all");
    // With the unicode flag, `u`, `result` and `last match` each has four mode options, `ascii`, `decimal`, `hexidecimal` and
    // `unicode`.
    // These are demonstrated here for the `last match`.
    flags = "u";
    exp = new apgexp(grammar, flags);
    result = exp.exec(str);
    html = "<h3>last match ASCII</h3>";
    html += exp.toHtml('ascii');
    html += "<h3>last match decimal</h3>";
    html += exp.toHtml('decimal');
    html += "<h3>last match hexidecimal</h3>";
    html += exp.toHtml('hexidecimal');
    html += "<h3>last match Unicode</h3>";
    html += exp.toHtml('Unicode');
    html += "<h3>result Unicode</h3>";
    html += result.toHtml('Unicode');
    html = apglib.utils.htmlToPage(html);
    writeHtml(html, "display-modes");
  } catch (e) {
    console.log("EXCEPTION: " + e.message);
  }
})();
