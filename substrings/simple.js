// This is a simple demonstration of the parsing a substring.
// The grammar is for a simplified phone number.
// The first example parses the entire string to match the phone number.
// The second example also matches the phone number, but only as a sub-string with a leading prefix phrase.
// The final example parses a substring which is completely embedded in the full input string. 
(function(){
  var input, grammar, setup;
  grammar = new (require("./phone-number.js"))();
  setup = require("./setup.js");
  /* defaults the substring to the full string */
  input = "(800)555-1234";
  setup(input, undefined, undefined, grammar, "substring-full");
  /* substring starts interior to string an runs to end of string*/
  input = "xxx(800)555-1234";
  setup(input, 3, undefined, grammar, "substring-interior");
  /* selects an embedded substring */
  input = "xxx(800)555-1234yyy";
  setup(input, 3, 13, grammar, "substring-embedded");
 })();
