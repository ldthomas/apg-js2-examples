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
