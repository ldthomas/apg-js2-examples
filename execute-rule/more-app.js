(function() {
  var fs = require("fs");
  var apglib = require("apg-lib");
  var id = apglib.ids;
  var setup = require("./more-setup.js");
  var evalRuleCallback = function(result, chars, phraseIndex, data) {
    var matchFound = false;
    var phrase = phraseIndex;
    var length = 0;
    while (phrase + 5 <= chars.length) {
      result.evalRule(1, phrase, result);
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

  var dir = "html";
  var filename = dir + "/more-evalRule.html"
  try {
    fs.mkdirSync(dir);
  } catch (e) {
    if (e.code !== "EEXIST") {
      throw new Error("fs.mkdir failed: " + e.message);
    }
  }
  var html = "";
  html += setup(udtCallback, "more parsed with UDT");
  html += setup(evalRuleCallback, "more parsed with evalRule()");
  var result = apglib.utils.htmlToPage(html, filename);
  if (result.hasErrors === true) {
    throw new Error(result.errors[0]);
  }
  console.log();
  console.log('view "' + filename
      + '" in any browser to display parsing stats and trace comparison');
})();
