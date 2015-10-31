(function() {
	var demo = require("./setup.js");
	var trace = new (require("apg-lib").trace)();
	var number;
	trace.filter.operators["<ALL>"] = true;
	number = ';ornament number\n';
	number += '\u2768555\u2769888\u20129999\n';
	demo(trace, number, "all-operators");
})();
