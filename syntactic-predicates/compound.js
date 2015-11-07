(function(){
  "use strict";
  var setup = require("./setup.js");
  var grammar = new (require("./nested.js"))();
  var input = "aabbcc aaaa aaabbbccc";
  var callbacks = [];
  callbacks['anbn'] = false;
  callbacks['anbncn'] = true;
  callbacks['any'] = false;
  callbacks['begin'] = true;
  callbacks['bncn'] = true;
  callbacks['comment'] = true;
  callbacks['consumeas'] = true;
  callbacks['end'] = true;
  callbacks['prefix'] = true;
  setup(grammar, callbacks, input);
})();
