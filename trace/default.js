// This is the default trace filtering. It includes all rule and `UDT` names and excludes all other operator nodes.
(function() {
  var setup = require("./setup.js");
  var trace = new (require("apg-lib").trace)();
  var number;
//  number = '(\t5\f5\x7e5)\xff88\r\n8-9999\n';
  number = '(555)888-9999\n';
  setup(trace, number, "default");
})();
