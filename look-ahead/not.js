// Demonstration for the `NOT(!)` syntactic predicate operator.
// This is a grammar for the C-style comment.
// The problem is that after the initial "/\*", we want to collect all characters,
// including  "\*" and "/" characters up until they appear in the
// specific combination "\*/"
// This is easily done with a `NOT` operator [`c-commment.js`](./c-comment.html#section-3).
//
// Here we have separated the end characters "\*/" and the stop characters (also "\*/")
// into to differently named rules. This example will demonstrate that the
// stop rule does not appear on the `AST` even though specifically named to it.
(function(){
  "use strict";
  var setup = require("./setup.js");
  var grammar = new (require("./c-comment.js"))();
  var input = "/* a comment with **** characters, line breaks \n and \r\n and tabs \t ****/";
  var callbacks = [];
  callbacks['any'] = false;
  callbacks['begin'] = true;
  callbacks['comment'] = true;
  callbacks['end'] = true;
  callbacks['stop'] = true;
  setup(grammar, callbacks, input);
})();
