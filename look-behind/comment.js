// This is a demonstration of the caveat about using rules and UDTs in look behind phrases.
// The caveat: when in look-behind mode, the parser is actually parsing right to left instead of the normal left to right.
// For all operators except rules (RNM) and UDTs (UDT) this is handled automatically by the parser.
// But rules and UDTs of any complexity are likely to be dependent on the left to right direction in order to work correctly.
// The example here is to match the character `$` at string position 14, but only if it is preceded by a comment.
// This example looks at using a comment rule that is left-to-right dependent and how it fails in look-behind.
// It then looks at how the problem <i>could</i> be fixed by writing a special right-to-left version
// of the comment rule especially for use in look-behind mode.
// Again, this is a very artificial example here,
// but is simulates a very real kind of situation that could arise
// in the context of a pattern matching engine (see `apg-exp`).
// What to expect:
// <ul><li>The parse of the first string will fail - there is no preceding comment.</li>
// <li>The parse of the second string will succeed, but the left-to-right rule will fail.
// The success will come from having written a special right-to-left version of the comment rule.</li>
// <li>Right-to-left rule writing is very tricky - not recommended.</li></ul>
// You can examine the trace of each of these examples to see how the rules work in look-behind mode.
//
// Note that in the case of UDTs, there is a flag in the system data which indicates
// whether the parser is in look-behind mode or not,
// but in general you may not want to assume that that flag has been honored or maybe more importantly
// whether it has been honored <i>correctly</i>.
(function(){
  var input = " not a comment$";
  var grammar = new (require("./comment-grammar.js"))();
  var setup = require("./setup.js");
  setup(input, grammar, "comment-fail");
  input = " /* comment */$";
  setup(input, grammar, "comment-success");
 })();
