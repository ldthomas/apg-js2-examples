// This is example demonstrates running the APG parser library in a browser application.
// It is the same as the [`apg-examples/ini-file` example](../setup.html)
// but it runs in an HTML web page rather than a `node.js` desktop app.
// In fact, it uses the same [grammar](../ini-file.html)
// [parser](../parser-callbacks.html) and [translator](../ast-callbacks.html)) callback function files
//
// To run the example, view<br>
//`apg-examples/ini-file/browser/browser.html`<br>in any browser.
// If you modify this file or [`page.js`](./page.html) you must also regenerate `bundle.js` with browserify.
// ```
// npm install -g browserify
// cd apg-examples/ini-file/browser
// browserify setup.js > bundle.js
// ```
(function() {
  var $ = require("jquery");
  var page = require("./page.js");
  $(document).ready(function() {
    var input = "";
    input += ";anonymous, unnamed section\n";
    input += "numbers = 1, 2, 3\n";
    input += 'names = "Sam", "Jim"\n';
    input += "mixed = 'single', \"double\", 100, alpha\n";
    input += 'names = "Mary", "Jane"\n';
    input += "numbers = 100, 101\n";
    input += "\n";
    input += "; first part of section B\n";
    input += "[_codes] ; first part of section 1\n";
    input += "numbers = 1,2, 3\n";
    input += 'names = "news", "live"\n';
    input += "\n";
    input += "; first part of section A\n";
    input += "[MONEY] ; first part of section 2\n";
    input += "dollars = 100, 200, 400\n";
    input += "cents = 21\n";
    input += "\n";
    input += "; continuation of section B\n";
    input += "[_codes] ; second part of section 1\n";
    input += 'names = "links"\n';
    input += "numbers = 11, 12, 13\n";
    input += "more_numbers = 99, 11, 22\n";
    input += "\n";
    input += "; continuation of section A\n";
    input += "[MONEY] ; second part of section 2\n";
    input += "dollars = 1001, 1002\n";
    input += "cents = 99\n";
    // Initialize the input string in the web page textbox.
    $("#input-string").val(input);
    // Set the event handler for the "parse" button to [`page.js`](./page.html).
    $("#parser").click(page)
  });
})();
