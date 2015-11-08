(function() {
	var setup = require("./setup.js");
	var trace = new (require("apg-lib").trace)();
	var number;
	number = '(555)888-9999\n';
	setup(trace, number, "default");
})();
