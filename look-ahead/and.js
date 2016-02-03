// Demonstration for the `AND(&)` syntactic predicate operator.
// This is the classic example of a grammar
// which can be represented with syntactic predicates, but not
// with a strictly context-free grammar.
// It is the grammar for equal numbers of as, bs, and cs
// [`anbncn.js`](./anbncn.html#section#section-3)
(function(){
	"use strict";
  var setup = require("./setup.js");
  var grammar = new (require("./anbncn.js"))();
  var input = "aaaabbbbcccc";
  var callbacks = [];
  callbacks['anbn'] = true;
  callbacks['anbncn'] = true;
  callbacks['bncn'] = true;
  callbacks['consumeas'] = true;
  callbacks['prefix'] = true;
  setup(grammar, callbacks, input);
})();
