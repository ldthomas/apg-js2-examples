// It is also  possible to look at only a specified sub-list of the non-rule name operators.
// There may be, for example, a literal string that is mysteriously not working the way it should.
// Here is how to selectively limit the view to some, but not all non-rule name operators.
(function() {
  var setup = require("./setup.js");
  var trace = new (require("apg-lib").trace)();
  var number;
  // By specifying a few operators in particular, this defaults all of the
  // others not specifically named to `false`.
  trace.filter.operators["tls"] = true;
  trace.filter.operators["tbs"] = true;
  trace.filter.operators["trg"] = true;
  // We are also limiting the rule names, but we will take a closer look at that
  // in the [next example](./select-rules.html).
  trace.filter.rules["phone-number"] = true;
  trace.filter.rules["prefix"] = true;
  trace.filter.rules["area"] = true;
  trace.filter.rules["u_office"] = true;
  trace.filter.rules["subscriber"] = true;
  // Notice that we are intentionally inserting an error into the phone number.
  // If you inadvertently miss it here, it will be obvious in the final `TRG`
  // operator in the trace.
  // See especially the page `html/trace-select-operators-dec.html`.
  number = ';select operators\n';
  number += ';TLS, TBS & TRG\n';
  number += ';find the error\n';
  number += '(555)888-999A\n';
  setup(trace, number, "select-operators");
})();
