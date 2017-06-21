// This is a simple demonstration of the negative `look-behind` operator.
// The grammar defines two types of text (ASCII printing characters,)
// Comment text begins with `//`, other text does not.
// Both of these input lines will parse successfully.
// Look at the trace to see that in the one case `other-text` is matched,
// while in the other case `comment-text` is matched.
// In a more realistic application the `AST` would be used to translate
// or otherwise distiguish between the two types of text.
(function(){
  var input = "// this is a comment";
  var grammar = new (require("./negative-grammar.js"))();
  var setup = require("./setup.js");
  setup(input, grammar);
 })();
