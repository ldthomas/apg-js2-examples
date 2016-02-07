// Simple demonstration of case-sensitive and case-insensitive back reference phrase matching. 
(function(){
  var setup = require("./setup.js");
  var input = "ayaa";
  var grammar = new (require("./branch-fail-grammar.js"))();
  var displayname = "branch-fail";
  var doTrace = true;
  setup(input, grammar, displayname, doTrace);
})();
