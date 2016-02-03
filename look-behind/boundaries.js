// This is a demonstration using `look-around` operators to define word boundaries.
// In this straight-forward grammar, parsing environment, it is a very artificial example.
// It simply wants to know if the whole word `cat` is found at the 10th character.
// However, in the context of a pattern matching engine (see `apg-exp`) it is very real use.
// You can examine the trace of each of these examples to see how the left boundary is matched,
// or not matched, using negative `look-behind` (`!!` or `BKN`) and the right boundary is determined
// with negative `look-ahead` (`!` or `NOT`).
(function(){
  var input = "The black cat is in the window.";
  var grammar = new (require("./boundaries-grammar.js"))();
  var setup = require("./setup.js");
  setup(input, grammar, "boundaries-cat");
  input = "Don't truncate this line.";
  setup(input, grammar, "boundaries-truncate");
  input = "It's a Bobcat, not house cat..";
  setup(input, grammar, "boundaries-bobcat");
  input = "You can't categorize it.";
  setup(input, grammar, "boundaries-catagorize");
 })();
