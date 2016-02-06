// This is a simple demonstration of the positive 'look-behind' operator.
// The grammar defines a line of any ASCII printing characters,
// but the line must end with the word `end`.
(function(){
  var input = "abc";
  var grammar = new (require("./abc-grammar.js"))();
  var setup = require("./setup.js");
  setup(input, 0, 3, grammar, "abc");
  input = "abcxyz";
  setup(input, 0, 3, grammar, "abcxyz");
  input = "xyzabc";
  setup(input, 3, 3, grammar, "xyzabc");
  input = "xyzabcxyz";
  setup(input, 3, 3, grammar, "xyzabcxyz");
 })();
