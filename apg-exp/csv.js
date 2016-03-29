// This module addresses the problem of matching the fields in Microsoft's Comma Separated Value (CSV) format.
// This problem is addressed in Jeffrey Friedl's book *Mastering Regular Expressions*, pg. 213
// and you can compare this solution to his discussion there.
//
// Two separate approaches are taken.
// The first is to define a grammar that will match only one field, and then find them all in a loop with the global flag set.
// The second is to define a grammar that scoops up all fields in one fell swoop.
//
// The Microsoft format calls for escaping a quote within a quoted string by using a pair of quotes.
// Therefore, this is not entirely just a pattern matching problem.
// Regardless of whether using `regex` or `apg-exp`,
// a replacement process (translation) must follow the pattern matching (parsing) process.
// In this simple case, it is easiest to just use the built-in, JavaScript string replacement functions.
// However, I will also show how it can be almost as easily done with `apg-exp`.
// The only thing that makes `apg-exp` slightly more inconvenient is that it is not built into the JavaScript language.
(function() {
  try {
    var apgexp = require("apg-exp");
    var apglib = require("apg-lib");
    var grammar1 = new (require("./grammars/csv-fields.js"))();
    var grammar2 = new (require("./grammars/csv.js"))();
    var exp, str, rstr, result, value;
    str = 'Ten Thousand,10000, 2710 ,,"10,000","It\'s ""10 Grand"", baby",10K';
    exp = new apgexp(grammar1, "g");
    console.log();
    console.log("the single-field grammar:");
    console.log(exp.source);
    console.log();
    console.log("the input string:");
    console.log(str);
    // This first pass simply finds the raw fields. Neither the surrounding or embedded quotes are removed.
    console.log("the raw fields:");
    while(true){
      result = exp.exec(str);
      if(result === null){
        break;
      }
      if(result[0] === ""){
        exp.lastIndex += 1;
      }
      console.log("field: "+result[0]);
    }
    // This pass will use the SABNF grammar to distinguish between quoted and non-quoted fields.
    // In this case, the grammar will eliminate the surrounding quotes as part of the parsing or pattern matching process.
    // But replacing the interior pairs of quotes with a single quote requires a second, translation, step.
    // I'll do it here both with the JavaScript string replacement function and the `apg-exp` replacement function.
    console.log();
    console.log("the input string:");
    console.log(str);
    console.log("the field values found separately:");
    while(true){
      result = exp.exec(str);
      if(result === null){
        break;
      }
      if(result[0] === ""){
        exp.lastIndex += 1;
      }
      if(result.rules['quoted-text']){
        if(result.rules['double-quote']){
          // Replace the double quote with a single quote using the built-in JavaScript `replace()` function.
          var phrase = result.rules['quoted-text'][0].phrase;
          rstr = phrase.replace(/""/g, '"');
          console.log("value: "+rstr + " : JavaScript replacement function");
          // Replace the double quote with a single quote using the `apg-exp replace()` function.
          // Note that in the SABNF syntax `%d34` represents a double quote, character code 34.
          // (Yes, the constructor should be outside of the loop, but I wanted it explicitly displayed here
          // for clarity.)
          var rrexp = new apgexp('rule = 2%d34\n', "g");
          rstr = rrexp.replace(phrase, '"');
          console.log("value: "+rstr + " : apg-exp replacement function");
        }else{
          console.log("value: "+result.rules['quoted-text'][0].phrase);
        }
      }
      if(result.rules['text']){
        console.log("value: "+result.rules['text'][0].phrase);
      }
    }
    // Now we will try to scoop them all up at once.
    // The advantage here is that we get all of the raw comma-separated fields in a single array.
    // In this case `result.rules['field']` is an array of phrase objects. i.e. `{phrase : string, index : number}`.
    // The disadvantage is that we have to remove the surrounding quotes as well as replace the 
    // interior pairs of quotes in separate steps.
    // It also points out a weakness in the `apg-exp result` format.
    // Even though it is more complete than its JavaScript `RegExp` counterpart in that it has all
    // of the matched phrases for each rule (`RegExp` grouping) instead of just the last one matched,
    // there is no easy way to associate which `result.rules['quoted-text']` belongs to which
    // `result.rules['field']`.
    // (We could do this with a translation of the `exp.ast` object, but that is for another time and place.)
    exp = new apgexp(grammar2);
    exp.exclude(["any-but-quote", "any-but-comma"]);
    console.log();
    console.log("the 'all-at-once' grammar:");
    console.log(exp.source);
    console.log();
    console.log("the input string:");
    console.log(str);
    console.log("the field values found all at once:");
    result = exp.exec(str);
    var rrexp = new apgexp('rule = 2%d34\n', "g");
    var rexp = new apgexp('rule = (%^ %d34) / (%d34 %$)\n', "g");
    result.rules['field'].forEach(function(field){
      /* replace pairs of quotes, if any */
      value = rrexp.replace(field.phrase, '"');
      /* remove surrounding quotes, if any */
      value = rexp.replace(value, '');
      console.log("value: "+value);
    });
  } catch (e) {
    console.log("EXCEPTION: " + e.message);
  }
})();
