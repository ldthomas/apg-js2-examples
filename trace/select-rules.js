(function() {
	var setup = require("./setup.js");
	var trace = new (require("apg-lib").trace)();
	var number;
	trace.filter.rules["phone-number"] = true;
	trace.filter.rules["prefix"] = true;
	trace.filter.rules["area"] = true;
	trace.filter.rules["u_office"] = true;
	trace.filter.rules["subscriber"] = true;
	number = ';select rules\n;ornament number\n\u2768555\u2769888\u20129999\n';
	setup(trace, number, "select-rules");
})();
