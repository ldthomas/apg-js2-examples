// Simple demonstration that when a branch fails, matched rules in the failed branch are not retained. 
(function(){
  var setup = require("./setup.js");
  var input = "ayaa";
  var grammar = new (require("./branch-fail-grammar.js"))();
  var displayname = "branch-fail";
  var doTrace = true;
  setup(input, grammar, displayname, doTrace);
})();
