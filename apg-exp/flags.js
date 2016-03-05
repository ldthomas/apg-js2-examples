// This module briefly describes all of the arguments to the `apg-exp` constructor
// and demonstrates in detail the four different flags available.
// ```
// var apgexp = require("apg-exp");
// var exp = new apgexp(grammar, flags, nodeHits, treeDepth);
// grammar   - this can be either a string defining the
//             SABNF grammar or a pre-compiled grammar object.
//           - e.g. grammar = 'rule = "a" / "b"\n';
//             (note: newline character is required
//              by the SABNF syntax)
//           - or grammar = new (require("/path/to/rule.js")();
//             where rule.js was previously created
//             with the apg parser generator.
// flags     - any combination of g, y, u and d.
//             (note: if both g and y are specified,
//             y prevails)
// nodeHits  - limits the number of node hits (unit parser steps)
// treeDepth - limits the maximum depth allowed of the parse tree 
// ```
// The flags available to the `exec()` function are described in more detail below.
// (All flags are ignored by the `test()` function.)
// <ul>
//<li>
// `g` - the `global` flag is used to match all occurrences of a pattern in a string.
// This is used with repeated calls to the `exec()` function.
// After each successful pattern match, the `lastIndex` variable is repositioned to the character just following the match.
// After an unsuccessful match, `lastIndex` is reset to zero.
// When used with the `replace()` function, all occurrences of the pattern are replaced with one call.
//</li>
//<li>
// `y` - the `sticky` flag is described in the
// [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
// documentation, but does not seem to be implemented in `node.js`.
// It is also very similar to the [`\G`](http://perldoc.perl.org/perlre.html)
// or [`pos()`](http://doc.perl6.org/language/regexes)
// anchors in Perl `regexes`.
// With the `y` flag set, `lastIndex` acts as an anchor. The match is attempted at the index `lastIndex` only.
// If a match is not found, `lastIndex` is set to 0 and the result is null.
// If a match is found, it acts similarly to global mode in that `lastIndex` is repositioned to the next
// character following the match.
// Therefore, it can also be used with repeated calls to `exec()`, finding all *consecutive* phrases that exactly follow one another.
// When used with the `replace()` function, all consecutive occurrences of the pattern are replaced with one call.
//</li>
//<li>
// `u` - with the unicode flag set, all matched phrases in the `result` and `last match` objects are
// returned as arrays of character code integers rather than JavaScript strings.
// (The `replace()` and `split()` functions will throw an exception if called with the `u` flag set.)
//</li>
//<li>
// `d` - the debug flag is used to turn on tracing, `apg`'s debugger.
// The `apg` tracing object can be configured and displayed just
// as with any other `apg` application to see exactly how the parser is behaving.
//</li>
// </ul>
//
// Some simple examples of using each of these flags follow.
(function() {
  try {
    var apgexp = require("apg-exp");
    var grammar = 'rule = "abc" / "xyz"\n';
    var exp, flags, result, str;
    // With no flags, `lastIndex` remains at 0 after a successful match and repeated calls simply find the same match.
    console.log();
    console.log("  grammar: " + grammar);
    flags = "";
    exp = new apgexp(grammar, flags);
    str = '---abc---xyz---ABC---';
    result = exp.exec(str);
    console.log("         : With no flags, lastIndex is never repositioned. The same phrase is found over and over.");
    console.log("    flags: '" + exp.flags + "'");
    console.log("    input: '" + str + "'");
    console.log("lastIndex: " + exp.lastIndex + ": index: " + result.index + ": result[0]: " + "'" + result[0] + "'");
    result = exp.exec(str);
    console.log("lastIndex: " + exp.lastIndex + ": index: " + result.index + ": result[0]: " + "'" + result[0] + "'");
    result = exp.exec(str);
    console.log("lastIndex: " + exp.lastIndex + ": index: " + result.index + ": result[0]: " + "'" + result[0] + "'");
    // With the global flag, `g`, repeated calls will find the next match.
    flags = "g";
    exp = new apgexp(grammar, flags);
    console.log();
    console.log("         : With the 'g' flag, lastIndex is repositioned. Each call finds the next phrase.");
    console.log("    flags: '" + exp.flags + "'");
    console.log("    input: '" + str + "'");
    while (true) {
      result = exp.exec(str);
      if (result === null || result[0] === "") {
        console.log("lastIndex: " + exp.lastIndex + ": result: " + "'" + result + "'");
        break;
      }
      console.log("lastIndex: " + exp.lastIndex + ": index: " + result.index + ": result[0]: " + "'" + result[0] + "'");
    }
    // With the 'sticky' flag, `y`, the patterns must be consecutive for repeated matching.
    flags = "y";
    exp = new apgexp(grammar, flags);
    console.log();
    console.log("         : With the 'y' flag, lastIndex is an anchor. The phrase must be found exactly at lastIndex.");
    console.log("    flags: '" + exp.flags + "'");
    console.log("    input: '" + str + "'");
    while (true) {
      result = exp.exec(str);
      if (result === null || result[0] === "") {
        console.log("lastIndex: " + exp.lastIndex + ": result: " + "'" + result + "'");
        break;
      }
      console.log("lastIndex: " + exp.lastIndex + ": index: " + result.index + ": result[0]: " + "'" + result[0] + "'");
    }
    str = "abcxyzABC";
    console.log();
    console.log("         : With the 'y' flag, 'consecutive' phrases will be found with subsequent calls.");
    console.log("    flags: '" + exp.flags + "'");
    console.log("    input: '" + str + "'");
    while (true) {
      result = exp.exec(str);
      if (result === null || result[0] === "") {
        console.log("lastIndex: " + exp.lastIndex + ": result: " + "'" + result + "'");
        break;
      }
      console.log("lastIndex: " + exp.lastIndex + ": index: " + result.index + ": result[0]: " + "'" + result[0] + "'");
    }
    // With the unicode flag, `u`, the result is an array of character codes rather than a string.
    flags = "ug";
    exp = new apgexp(grammar, flags);
    str = '---abc---xyz---ABC---';
    console.log();
    console.log("         : With the 'u' flag, phrases are arrays of character codes, not strings.");
    console.log("    flags: '" + exp.flags + "'");
    console.log("    input: '" + str + "'");
    while (true) {
      result = exp.exec(str);
      if (result === null || result[0] === "") {
        console.log("lastIndex: " + exp.lastIndex + ": result: " + "'" + result + "'");
        break;
      }
      console.log("lastIndex: " + exp.lastIndex + ": index: " + result.index + ": result[0]: " + "'[" + result[0] + "]'");
    }
    // With the debug flag, `d`, the trace object is available for inspection.
    // We will see in other examples how to configure and display the trace information.
    // For now, we just demonstrate that the trace object can be made available with the `d` flag.
    flags = "d";
    exp = new apgexp(grammar, flags);
    console.log();
    console.log("         : When the 'd' flag is set, the exp.trace object is available for use.");
    console.log("    flags: '" + exp.flags + "'");
    console.log("exp.trace: " + exp.trace);
    flags = "";
    exp = new apgexp(grammar, flags);
    console.log();
    console.log("         : When the 'd' flag is not set, the exp.trace object is null.");
    console.log("    flags: '" + exp.flags + "'");
    console.log("exp.trace: " + exp.trace);
  } catch (e) {
    console.log("EXCEPTION: " + e.message);
  }
})();
