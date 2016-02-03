// This is a simple demonstration of the positive 'look-behind' operator.
// The grammar defines a line of any ASCII printing characters,
// but the line must end with the word `end`.
(function(){
  var input = "this line must end";
  var grammar = new (require("./positive-grammar.js"))();
  var setup = require("./setup.js");
  setup(input, grammar, "positive-ok");
  input = "this line does not end correctly";
  setup(input, grammar, "positive-fail");
 })();
