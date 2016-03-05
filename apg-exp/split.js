// This module demonstrates the `split()` function.
// It is roughly equivalent to the JavaScript string `String.split(regex[, limit])` function
// (It loosely follows the [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) description.)
// Let:
// ```
// exp = new apgexp(grammar,flags);
// rstr = exp.split(str[, limit]);
// ```
// If `str` is omitted, null or an empty string, an array with one element is returned, `[""]`.
// Otherwise, `exp.exec(str)` is called in global mode. If a one or more matched phrases are found, they are removed from the string
// and the substrings are returned in an array.
// If no matched phrases are found, the array contains one element consisting of the entire string, `["str"]`.
// Empty string matches will split the string and advance `lastIndex` by one character.
// That means, for example, the grammar `rule=""\n` would match the empty string at every character
// and an array of all characters would be returned. It would be similar to calling the JavaScript function `str.split("")`.
// Unlike the JavaScript function, capturing parentheses (rules) are not spliced into the output string.
// `split()` ignores all flags except `u`. It will throw an exception if the unicode flag is set.
// If the `limit` argument is used, it must be a positive number and no more than `limit` matches will be
(function() {
  try {
    var apgexp = require("apg-exp");
    var grammar = "";
    var exp, flags, result, str, restr, patternString, patternFunc;
    grammar += 'rule = ""\n';
    exp = new apgexp(grammar, flags);
    console.log();
    str = 'abcxyz';
    console.log(" grammar: " + exp.source);
    restr = exp.split(str);
    console.log("        : split into characters");
    console.log("   input: " + str);
    console.log("   split: [" + restr + "]");

    restr = exp.split(str, 3);
    console.log();
    console.log("        : limit to 3 matched phrases");
    console.log("   input: " + str);
    console.log("   split: [" + restr + "]");

    str = undefined;
    restr = exp.split(str);
    console.log();
    console.log("        : no input");
    console.log("   input: " + str);
    console.log("   split: [" + restr + "]");
    console.log("  length: [" + restr.length + "]");

    str = "abcxyz";
    grammar = 'rule = "d"\n';
    exp = new apgexp(grammar, flags);
    restr = exp.split(str);
    console.log();
    console.log("        : no matches");
    console.log("   input: " + str);
    console.log("   split: [" + restr + "]");
  } catch (e) {
    console.log("EXCEPTION: " + e.message);
  }
})();
