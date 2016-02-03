// Demonstrates how parent frame mode back references can be used to match the tag names
// of opening and closing HTML tags.
(function(){
  var setup = require("./setup.js");
  var input = "<Root><NEXT><Top>...</top></next></ROOT>";
  var grammar = new (require("./html-grammar.js"))();
  var displayname = "back-reference-html";
  var doTrace = true;
  setup(input, grammar, displayname, doTrace);
  input = "<Root><NEXT><Top>...</top></next></notroot>";
  displayname = "back-reference-html-fail";
  setup(input, grammar, displayname, doTrace);
})();
