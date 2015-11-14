// This module defines the `UDT` callback functions for the demonstration.
// One `UDT` will match a phrase directly, the normal `UDT` function.
// One `UDT` will match a phrase by calling one of the rule name operators defined by the SABNF grammar.
// A strange thing to do, you might think, and you might well be right.
// But look at the trace of the parse tree and in this case you will see that there is a `RNM` operator
// below the `UDT` operator in the tree. There can be cases where this will turn out to be 
// useful when translating the `AST`.
//
// This module calls [`more-setup.js`](./more-setup.html) twice, once for each case described above.
// The stat and trace displays are collected and shown on a single web page for easy comparison.
(function() {
  var fs = require("fs");
  var apglib = require("apg-lib");
  var id = apglib.ids;
  var setup = require("./more-setup.js");
  // This `UDT` callback will do phrase matching with a call to `evaluateRule()`.
  var evalRuleCallback = function(result, chars, phraseIndex, data) {
    var matchFound = false;
    var phrase = phraseIndex;
    var length = 0;
    while (phrase + 5 <= chars.length) {
      /* call evaluateRule() here */
      result.evaluateRule(1, phrase, result);
      if (result.state === id.MATCH) {
        length += result.phraseLength;
        phrase += result.phraseLength;
      } else {
        break;
      }
    }
    if (length > 0) {
      result.state = id.MATCH;
      result.phraseLength = length;
    } else {
      result.state = id.NOMATCH;
      result.phraseLength = 0;
    }
  }
  // This `UDT` callback will simply match a phrase on its own.
  var udtCallback = function(result, chars, phraseIndex, data) {
    var matchFound = false;
    var phrase = phraseIndex;
    var length = 0;
    while (phrase + 5 <= chars.length) {
      if ((chars[phrase] === 32) && (chars[phrase + 1] === 109)
          && (chars[phrase + 2] === 111) && (chars[phrase + 3] === 114)
          && (chars[phrase + 4] === 101)) {
        length += 5;
        phrase += 5;
      } else {
        break;
      }
    }
    if (length > 0) {
      result.state = id.MATCH;
      result.phraseLength = length;
    } else {
      result.state = id.NOMATCH;
      result.phraseLength = 0;
    }
  }
  // Open the web page `html/more-evaluateRule.html`.
  var dir = "html";
  var filename = dir + "/more-evaluateRule.html"
  try {
    fs.mkdirSync(dir);
  } catch (e) {
    if (e.code !== "EEXIST") {
      throw new Error("fs.mkdir failed: " + e.message);
    }
  }
  var html = "";
  /* get the "regular" UDT phrase */
  html += setup(udtCallback, "more parsed with UDT");
  /* get the phrase with a call to evaluateRule() */
  html += setup(evalRuleCallback, "more parsed with evaluateRule()");
  // Display it all on the web page.
  var result = apglib.utils.htmlToPage(html, filename);
  if (result.hasErrors === true) {
    throw new Error(result.errors[0]);
  }
  console.log();
  console.log('view "' + filename
      + '" in any browser to display parsing stats and trace comparison');
})();
