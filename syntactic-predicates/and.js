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
