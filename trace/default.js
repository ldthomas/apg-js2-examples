(function() {
	var demo = require("./setup.js");
	var trace = new (require("apg-lib").trace)();
	var number;
	number = '(555)888-9999\n';
	demo(trace, number, "default");
})();
