// With the Unicode flag, `u`, set, `apg-exp` returns its matched phrases as arrays of character codes rather than
// Javascript strings.
// This module gives a short demonstration of how one might take advantage of that to deal with Unicode text.
// I don't read or speak Greek, but I took a couple of phrases from [here](http://www.omniglot.com/language/phrases/greek.php)
//to experiment with.
//
// Here I will simply define a Greek word as any string of Unicode characters from the
//[Greek and Coptic range](http://www.unicode.org/charts/PDF/U0370.pdf) U+0370-03FF.
// The exercise will be to find and display any Greeks word fitting this loose description.
(function() {
  try {
    var apgexp = require("apg-exp");
    var apglib = require("apg-lib");
    var writeHtml = require("../writeHtml.js");
    var grammar, exp, flags, result, str, html, page, htmlName;
    grammar = new (require("./grammars/greek-words.js"))();
    flags = "ug";
    exp = new apgexp(grammar, flags);
    console.log();
    console.log("SABNF grammar:");
    console.log(exp.sourceToText());
    str = "";
    str += 'The word for "yes" is \u039d\u03b1\u03b9\n';
    str += 'The word for "no" is \u038c\u03c7\u03b9\n';
    str += 'The word for "maybe" is \u038a\u03c3\u03c9\u03c2\n';
    console.log();
    console.log("input string:");
    console.log(str);
    html = "";
    html += "<h3>Greek words found</h3>\n";
    while (true) {
      result = exp.exec(str);
      if (result == null) {
        break;
      }
      var greek = result.rules["greek-word"];
      // When a Greek word is found, its character codes are converted to HTML entities for web page display.
      if (greek) {
        /* generate text output for the console */
        /* (displays Greek characters on my Ubuntu console) */
        var txt = apglib.utils.charsToString(greek[0].phrase);
        console.log("Greek word found: " + txt);
        /* convert the characters to HTML entities for page display */
        html += "Greek word: ";
        for (var i = 0; i < greek[0].phrase.length; i += 1) {
          html += "&#" + greek[0].phrase[i] + ";";
        }
        html += "<br>\n";
      }
    }
    /* display the greek words, represented as HTML entities, on a page */
    page = apglib.utils.htmlToPage(html);
    htmlName = "unicode-words";
    writeHtml(page, htmlName);
  } catch (e) {
    console.log("EXCEPTION: " + e.message);
  }
})();
