// `regexes` often have [trouble handling recursion](http://perl6.org/archive/doc/design/apo/A05.html).
// Matching pairs of parentheses is a classic recursion problem and is handled easily with `apg` parsers
// and by extension `apg-exp`.
// Here is a simple demonstration of matching paired parentheses and capturing all of the recursive matches.
//
// The parenthesis pairs are found *and* all values of the recursive rule `R` are retained.
(function() {
  try {
    var apgexp = require("apg-exp");
    var apglib = require("apg-lib");
    var writeHtml = require("../writeHtml.js");
    var grammar = "";
    var exp, flags, result, str, txt, html, htmlName;
    grammar += 'R     = (open text R text close) / (open text close)\n';
    grammar += 'open  = %d40               ; open paren "("\n';
    grammar += 'close = %d41               ; close paren ")"\n';
    grammar += 'text  = *(%d32-39/%d42-126); any characters but "()"\n';
    exp = new apgexp(grammar, "");
    console.log();
    str = 'find the matched parentheses (down 1(down 2(down 3(the middle)up 3)up 2)up 1)';
    console.log("grammar:");
    console.log(exp.source);
    console.log();
    console.log("     input: " + str);
    result = exp.exec(str);
    if (result) {
      txt = result.toText();
      console.log(txt);
      txt = exp.toText();
      console.log(txt);
    } else {
      console.log("    result: null");
    }
  } catch (e) {
    console.log("EXCEPTION: " + e.message);
  }
})();
