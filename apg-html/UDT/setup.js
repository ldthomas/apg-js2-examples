// This module demonstrates the use of User-Defined Terminals (`UDT`s).
// It is the same basic demonstration as the [simple](../simple/setup.html) example.
// The only difference is that one of the rule names has been replaced with a `UDT`.
module.exports = function () {
  "use strict";
  var nodeUtil = require("util");
  var inspectOptions = {
    showHidden: true,
    depth: null
  };
  try {
    // See [simple/setup.js](../simple/setup.html) for the basics of setting up the parser.
    var apglib = require("apg-lib");
    var save = require("../../weblinks/tree-save.js");
    var grammar = new (require("./phone-number.js"))();
    var parser = new apglib.parser();
    parser.trace = new apglib.trace();
    // This is the required `UDT` callback function.
    // Rule name callback functions are optional, however
    // when `UDT`s are present in the grammar,
    // the parser will fail with an error message if all of the `UDT`s in the grammar
    // do not have callback functions defined for them.
    var UDToffice = function (result, chars, phraseIndex, data) {
      var matchFound = false;
      while (true) {
        if (chars + phraseIndex + 3 <= chars.length) {
          /* not three digits left in the string */
          break;
        }
        var dig1 = chars[phraseIndex];
        var dig2 = chars[phraseIndex + 1];
        var dig3 = chars[phraseIndex + 2];
        if (dig1 < 50 || dig1 > 57) {
          /* first digit must be in range 2-9 */
          break;
        }
        if (dig2 < 48 || dig2 > 57 || dig3 < 48 || dig3 > 57) {
          /* second & third digits must be in range 0-9 */
          break;
        }
        if (dig2 === 49 && dig3 === 49) {
          /* if the second digit is "1" then the third digit cannot also be "1" */
          throw new Error("UDT u_office: digits 2 and 3 cannot both be 1");
          break;
        }
        matchFound = true;
        break;
      }
      if (matchFound === true) {
        result.state = id.MATCH;
        result.phraseLength = 3;
        if (data !== null) {
          data["u_office"] = apglib.utils.charsToString(chars, phraseIndex, result.phraseLength);
        }
      } else {
        result.state = id.NOMATCH;
        result.phraseLength = 0;
      }
    };
    var id = apglib.ids;

    // Define some rule name (`RNM`) callback functions.
    var phoneNumber = function (result, chars, phraseIndex, data) {
      if (result.state === id.MATCH) {
        if (Array.isArray(data) === false) {
          throw new Error("parser's user data must be an array");
        }
        /* initialize the data array length to zero */
        data.length = 0;
      }
    };
    var areaCode = function (result, chars, phraseIndex, data) {
      if (result.state === id.MATCH) {
        /* capture the area code */
        data["area-code"] = apglib.utils.charsToString(chars, phraseIndex,
            result.phraseLength);
      }
    };
    var subscriber = function (result, chars, phraseIndex, data) {
      if (result.state === id.MATCH) {
        /* capture the 4-digit subscriber number */
        data["subscriber"] = apglib.utils.charsToString(chars, phraseIndex,
            result.phraseLength);
      }
    };
    parser.callbacks["phone-number"] = phoneNumber;
    parser.callbacks["area-code"] = areaCode;
    parser.callbacks["u_office"] = UDToffice;
    parser.callbacks["subscriber"] = subscriber;
    parser.trace.filter.operators["<ALL>"] = true;
    parser.trace.filter.rules["<ALL>"] = true;
    var inputString = "(555)234-5678";
    var inputCharacterCodes = apglib.utils.stringToChars(inputString);
    var startRule = "phone-number";
    var phoneParts = [];
    // Parse the phone number.
    var result = parser.parse(grammar, startRule, inputCharacterCodes,
        phoneParts);
    console.log();
    console.log("the parser's results");
    console.dir(result, inspectOptions);
    if (result.success === false) {
      throw new Error("input string: '" + inputString + "' : parse failed");
    }
    // Display parsed phone number parts on the console.
    console.log();
    console.log("phone number: '" + inputString);
    console.log("   area-code: " + phoneParts["area-code"]);
    console.log("    u_office: " + phoneParts["u_office"]);
    console.log("  subscriber: " + phoneParts["subscriber"]);

    // display the traced parse tree
    var name = "data.js";
    save(parser.trace, "unicode", name);
    console.log();
    console.log('include <script src="' + name + '"></script> in tree.html to view the parse tree.');
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
    console.log(msg);
    throw e;
  }
};
