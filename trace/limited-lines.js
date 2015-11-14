// Often the trace will put out many thousands of records,
// whereas, for an HTML web page, usually no more than 5-10,000 is practical.
// The trace records filter can limit the number of lines to the last `N`.
// Usually, if you are looking for an error, it will occur near the end of the parse anyway
// and this becomes a handy way to clip off the initial records.
(function() {
  var setup = require("./setup.js");
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
  setup(trace, number, "limited-lines");
})();
