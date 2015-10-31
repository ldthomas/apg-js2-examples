(function() {
	var demo = require("./setup.js");
	var trace = new (require("apg-lib").trace)();
	var number;
	trace.filter.operators["tls"] = true;
	trace.filter.operators["tbs"] = true;
	trace.filter.operators["trg"] = true;
	trace.filter.rules["phone-number"] = true;
	trace.filter.rules["prefix"] = true;
	trace.filter.rules["area"] = true;
	trace.filter.rules["u_office"] = true;
	trace.filter.rules["subscriber"] = true;
	number = ';select operators\n';
	number += ';TLS, TBS & TRG\n';
	number += ';find the error\n';
	number += '(555)888-999A\n';
	demo(trace, number, "select-operators");
})();
