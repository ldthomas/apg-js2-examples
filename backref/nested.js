(function(){
  var setup = require("./setup.js");
  var input = "<Root><NEXT><Top>...</top></next></ROOT>";
  var grammar = "./nested-grammar.js";
  var tracedisplayname = "nested-grammar";
  var mode = false;
  setup(input, grammar, tracedisplayname, mode);
})();
