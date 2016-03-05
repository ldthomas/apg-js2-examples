// This module demonstrates the `replace()` function.
// It is roughly equivalent to the JavaScript string `String.replace(regex, string | function)` function
// (It follows closely the [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) description.)
// If the global flag `g` is not set, only the first matched phrase is replaced.
// If the global flag `g` is set, all matched phrases will be replaced. 
// If the sticky flag `y` is set, all matched 'consecutive' phrases will be replaced.
// If the unicode flag `u` is set, an exception will be thrown. `replace()` only works on strings, not character code arrays.
// Consider something like:
// ```
// exp = new apgexp('rule = "abc"\n);
// str = "---abc---";
// restr = "xyz";
// var re = exp.replace(str, restr);
// ```
// This will replace `abc` with `xyz` and return the result in `re`.
// The string `restr` may contain replacement patterns.
// ```
// $$ - insert the character $ - is the escape sequence for the $ character
// $` - insert the prefix to the matched pattern
// $& - insert the matched pattern
// $' - insert the suffix of the matched pattern
// ${name} - insert the last match to the rule "name"
// ```
// `restr` may also be a user-written function of the form
// ```
// var restr = function(result, exp){
// // result is the result object from the pattern match
// // exp is the "last match" object
// }
// ```
// There is quite a bit of redundancy here with both the `result` object and the `apg-exp` object being passed to the
// replacement function. However, this provides the user with a great deal of flexibility in what might be the
// most convenient way to create the replacement. Also, the `apg-exp` object has the AST which is a powerful
// translation tool for really tough replacement jobs. We'll see some examples of that elsewhere.
(function() {
  try {
    var apgexp = require("apg-exp");
    var grammar = "";
    var exp, flags, result, str, restr, patternString, patternFunc;
    grammar += 'rule = ABC / XYZ\n';
    grammar += 'ABC  = A BC\n';
    grammar += 'A    = "a"\n';
    grammar += 'BC   = "bc"\n';
    grammar += 'XYZ  = X YZ\n';
    grammar += 'X    = "x"\n';
    grammar += 'YZ   = "yz"\n';
    flags = "";
    exp = new apgexp(grammar, flags);
    console.log();
    console.log("  grammar: " + exp.source);
    str = '---abc---xyz---ABC---';
    console.log("        : simple replacement of a single match");
    console.log("   flags: '" + exp.flags + "'");
    console.log("   input: " + str);
    restr = exp.replace(str, "replace abc with this");
    console.log("replaced: " + restr);

    flags = "g";
    exp = new apgexp(grammar, flags);
    console.log();
    console.log("        : global replacement of all matches");
    console.log("   flags: '" + exp.flags + "'");
    console.log("   input: " + str);
    restr = exp.replace(str, "555");
    console.log("replaced: " + restr);

    flags = "";
    str = "<<<abc>>>";
    patternString = "$'---$`";
    exp = new apgexp(grammar, flags);
    console.log();
    console.log("        : use 'pattern' string replacement");
    console.log("   flags: '" + exp.flags + "'");
    console.log("   input: " + str);
    console.log(" pattern: " + patternString);
    restr = exp.replace(str, patternString);
    console.log("replaced: " + restr);

    flags = "";
    patternString = "${BC}";
    exp = new apgexp(grammar, flags);
    console.log();
    console.log("        : use rule 'pattern' string replacement");
    console.log("   flags: '" + exp.flags + "'");
    console.log("   input: " + str);
    console.log(" pattern: " + patternString);
    restr = exp.replace(str, patternString);
    console.log("replaced: " + restr);

    flags = "";
    patternFunc = function(result, exp) {
      var a, bc, restr;
      if (result.rules['ABC']) {
        a = result.rules['A'][0].phrase;
        bc = result.rules['BC'][0].phrase;
        restr = bc + a;
      } else if (exp["${XYZ}"]) {
        a = exp["${X}"];
        bc = exp["${YZ}"];
        restr = bc + a;
      }
      return restr;
    }
    exp = new apgexp(grammar, flags);
    console.log();
    console.log("        : function replacement - manipulate matched sub-rules for string replacement");
    console.log("   flags: '" + exp.flags + "'");
    console.log("   input: " + str);
    restr = exp.replace(str, patternFunc);
    console.log("replaced: " + restr);
    str = "---xyz---"
    console.log("   input: " + str);
    restr = exp.replace(str, patternFunc);
    console.log("replaced: " + restr);

    flags = "u";
    exp = new apgexp(grammar, flags);
    console.log();
    console.log("        : can't do replace with the unicode, 'u', flag set");
    console.log("   flags: '" + exp.flags + "'");
    console.log("   input: " + str);
    restr = exp.replace(str, "555");
  } catch (e) {
    console.log("EXCEPTION: " + e.message);
  }
})();
