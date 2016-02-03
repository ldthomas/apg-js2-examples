// Simple demonstration of case-sensitive and case-insensitive back reference phrase matching. 
(function(){
  var setup = require("./setup.js");
  var input = "xXXx";
  var grammar = new (require("./simple-grammar.js"))();
  var displayname = "back-reference-simple";
  var doTrace = true;
  setup(input, grammar, displayname, doTrace);
})();
