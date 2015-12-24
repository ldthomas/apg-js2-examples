// This is the general set up for demonstrating both 
// the translation and `XML` display of the `AST`.
// See [`simple/setup.js`](../simple/setup.html) for a complete description of the various parts of this set up.
module.exports = function() {
  "use strict";
  var nodeUtil = require("util");
  var inspectOptions = {
    showHidden : true,
    depth : null,
    colors : true
  };
  try {
    // Acquire the required parser components.
    var grammar = new (require("./phone-number.js"))();
    var apglib = require("apg-lib");
    var parser = new apglib.parser();
    // Construct an `AST` object and attach it to the parser.
    parser.ast = new apglib.ast();
    var id = apglib.ids;
    // The `AST` translating callback functions. These are similar to the parsers syntax callback functions
    // in that they are each called twice, once down the tree and once up the tree, with matched phrase information.
    // With the `AST`, however, the matched phrase is known in the down direction as well as up.
    // - *state* - `SEM_PRE` (down) or `SEM_POST` (up)
    // - *chars* - the array of character codes for the entire input string.
    // - *phraseIndex* - the index in *chars* of the first character of the matched phrase
    // - *phraseLength* - the number of characters in the matched phrase
    // - *data* - the user's optional data object, passed to the translator when it is called
    // - *return value* - normally `SEM_OK`. Can also be `SEM_SKIP` in the `SEM_PRE` 
    // state to skip the translation of the branch below the current node.
    var phoneNumber = function(state, chars, phraseIndex, phraseLength, data) {
      var ret = id.SEM_OK;
      if (state == id.SEM_PRE) {
        if (Array.isArray(data) === false) {
          throw new Error("parser's user data must be an array");
        }
        data.length = 0;
      } else if (state == id.SEM_POST) {
        /* not used in this example */
      }
      return ret;
    }
    var areaCode = function(state, chars, phraseIndex, phraseLength, data) {
      var ret = id.SEM_OK;
      if (state == id.SEM_PRE) {
        data["area-code"] = apglib.utils.charsToString(chars, phraseIndex,
            phraseLength);
      } else if (state == id.SEM_POST) {
        /* not used in this example */
      }
      return ret;
    }
    var office = function(state, chars, phraseIndex, phraseLength, data) {
      var ret = id.SEM_OK;
      if (state == id.SEM_PRE) {
        data["office"] = apglib.utils.charsToString(chars, phraseIndex,
            phraseLength);
      } else if (state == id.SEM_POST) {
        /* not used in this example */
      }
      return ret;
    }
    var subscriber = function(state, chars, phraseIndex, phraseLength, data) {
      var ret = id.SEM_OK;
      if (state == id.SEM_PRE) {
        data["subscriber"] = apglib.utils.charsToString(chars, phraseIndex,
            phraseLength);
      } else if (state == id.SEM_POST) {
        /* not used in this example */
      }
      return ret;
    }
    parser.ast.callbacks["phone-number"] = phoneNumber;
    parser.ast.callbacks["area-code"] = areaCode;
    parser.ast.callbacks["office"] = office;
    parser.ast.callbacks["subscriber"] = subscriber;
    /* use a hard coded input string */
    var inputString = "xxxx(555)234-5678xxxx";
    var inputCharacterCodes = apglib.utils.stringToChars(inputString);
    var startRule = "phone-number";
    /* parse the string here, generating an `AST` */
    var result = parser.parseSubstring(grammar, startRule, inputCharacterCodes, 4, 13);
    console.log();
    console.log("the parser's results");
    console.dir(result, inspectOptions);
    if (result.success === false) {
      throw new Error("input string: '" + inputString + "' : parse failed")
    }
    // Return the `AST` object for further processing.
    return parser.ast;
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
