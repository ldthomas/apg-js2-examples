(function() {
	var demo = require("./setup.js");
	var trace = new (require("apg-lib").trace)();
	var number;
	trace.filter.operators["tls"] = true;
	trace.filter.operators["tbs"] = true;
	trace.filter.operators["trg"] = true;
	trace.filter.rules["<ALL>"] = true;
	trace.setMaxRecords(100);
	number = ';display last 100 records only\n';
	number += ';ornament number\n';
	number += '\u2768555\u2769888\u20129999\n';
	demo(trace, number, "limited-lines");
})();
