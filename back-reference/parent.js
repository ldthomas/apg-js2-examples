// Demonstrates how back references work in parent frame mode.
(function(){
  var setup = require("./setup.js");
  var input = "xybx";
  var grammar = new (require("./parent-grammar.js"))();
  var displayname = "back-reference-parent";
  var doTrace = true;
  setup(input, grammar, displayname, doTrace);
})();
