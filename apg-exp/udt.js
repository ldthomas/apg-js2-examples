// Sometimes the academic question comes up as to exactly where in the Chomsky hierarchy of things, modern `regex` engines fall.
// An interesting discussion thread of that question can be found  
// [here](http://cstheory.stackexchange.com/questions/1047/where-do-most-regex-implementations-fall-on-the-complexity-scale).
// As noted there, `"regexes that can contain arbitrary program code"` are considered Turing complete.
// Allowing arbitrary code is probably not an academically satisfying way of getting completeness,
// but nonetheless, being able to match a tough phrase by simply writing
// a special routine to do it can get you over the hump.
//
// `apg-exp` allows for including arbitrary code snippets for phrase matching through `apg`'s
// User-Defined Terminal (`UDT`) feature. This example will give a simple demonstration of how that is done.
//
// It is well knows that the grammar for 
// [a<sup>n</sup>b<sup>n</sup>](https://en.wikipedia.org/wiki/Context-free_language) (n >= 1)is Context Free and that
// [a<sup>n</sup>b<sup>n</sup>c<sup>n</sup>](https://en.wikipedia.org/wiki/Parsing_expression_grammar)
// can be matched with the addition of look ahead.
// Let's ramp that up a little with (a/A)<sup>n</sup>(b/B)<sup>n</sup>(c/C)<sup>n</sup>
// and add the requirement that the sequences of "a"s, "b"s and "c"s must match in case.
// I'm not a mathematician and that may not be a Turing-complete problem, per se, 
// but I'm pretty sure that falls outside the range of "context-free, plus look around, plus back referencing."
// True or not, here is how to do it with `apg-exp` and `UDT`'s.
(function() {
  var apgexp = require("apg-exp");
  var apglib = require("apg-lib");
  var id = apglib.ids;
  var charsToString = apglib.utils.charsToString;
  // Define the `UDT` callback function.
  // `data` is not used here. With a normal `apg` parser, the user has the option of passing
  // in a data object for use by the user-written functions.
  // But there is no facility for this in `apg-exp`.
  var udtPhrase = function(sysData, chars, phraseIndex, data) {
    var i, j, an, ai, bi, bend, ci, cend;
    /* default to failure - any early return is a failure to find a match */
    sysData.state = id.NOMATCH;
    sysData.phraseLength = 0;
    ai = phraseIndex;
    an = 0;
    for (i = ai; i < chars.length; i += 1) {
      if (chars[i] === 65 || chars[i] === 97) {
        an += 1;
      } else {
        break;
      }
    }
    if(an === 0){
      return;
    }
    bi = ai + an;
    bend = bi + an;
    if (bend > chars.length) {
      /* not enough characters left in the string for a match */
      return;
    }
    for (i = ai, j = bi; j < bend; i += 1, j += 1) {
      if (chars[j] === 66) {
        if (chars[i] !== 65) {
          /* doesn't match upper case */
          return;
        }
      } else if (chars[j] === 98) {
        if (chars[i] !== 97) {
          /* doesn't match lower case */
          return;
        }
      } else {
        /* doesn't match - period */
        return;
      }
    }
    ci = bi + an;
    cend = ci + an;
    if (cend > chars.length) {
      /* not enough characters left in the string for a match */
      return;
    }
    for (i = ai, j = ci; j < cend; i += 1, j += 1) {
      if (chars[j] === 67) {
        if (chars[i] !== 65) {
          /* doesn't match upper case */
          return;
        }
      } else if (chars[j] === 99) {
        if (chars[i] !== 97) {
          /* doesn't match lower case */
          return;
        }
      } else {
        /* doesn't match - period */
        return;
      }
    }
    /* if we made it all the way to here, it's a match */
    sysData.state = id.MATCH;
    sysData.phraseLength = 3*an;
  }
  try {
    var grammar, exp, flags, result, str, html, page, htmlName;
    /* simple grammar to just match the phrase */
    grammar = 'anbncn = u_phrase\n';
    str = "aaAAaabbBBbbccCCcc";
    exp = new apgexp(grammar);
    // The user must write the `UDT` *and* tell the `apg-exp` object about it.
    exp.defineUdt("u_phrase", udtPhrase);
    console.log();
    console.log("grammar:");
    console.log(exp.source);
    result = exp.exec(str);
    console.log();
    console.log("cases match:");
    console.log("input string: "+str);
    if(result){
      console.log(result.toText());
    }else{
      console.log("result: null");
      throw new Error("cases should match for this input string");
    }
    str = "aaAAaabbBBbbcccCcc";
    result = exp.exec(str);
    console.log();
    console.log("cases don't match:");
    console.log("input string: "+str);
    if(result){
      console.log(result.toText());
      throw new Error("cases should not match for this input string");
    }else{
      console.log("result: null");
    }
    // Just to make the example a little more interesting, let's combine this with the
    // matching parentheses grammar.
    grammar = 'R     = (open text R text close) / (open u_phrase close)\n';
    grammar += 'open  = %d40               ; open paren "("\n';
    grammar += 'close = %d41               ; close paren ")"\n';
    grammar += 'text  = *(%d32-39/%d42-126); any characters but "()"\n';
    exp = new apgexp(grammar);
    exp.defineUdt("u_phrase", udtPhrase);
    str = 'find anbncn in within parentheses (down 1(down 2(down 3(aAabBbcCc)up 3)up 2)up 1)';
    console.log();
    console.log("grammar:");
    console.log(exp.source);
    console.log("within parentheses:");
    console.log("input string: "+str);
    result = exp.exec(str);
    if(result){
      console.log(result.toText());
    }else{
      console.log("result: null");
      throw new Error("cases should match for this input string");
    }
  } catch (e) {
    console.log("EXCEPTION: " + e.message);
  }
})();
