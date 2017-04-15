// Unlike most `regex` engines, `apg-exp` has no multiline mode.
// `apg-exp` makes no assumptions about what is or isn't a line boundary.
// Nonetheless, it is very easy to create line-boundary anchors, once you have decided
// what constitutes the set of line-ending characters or character combinations.
//Line boundary anchors can be created with the look around operators.
// A line must be preceded by a line-end or the beginning of the string
// and followed by a line-end or the end of string.
//You can see how these anchors are created in the grammar below.
//
// This example will demonstrate finding defined strings but only if they constitute an entire line.
// Using the global `g` flag and user-defined line ends, we can easily mimic the multiline mode
// supported by most `regex` engines.
//
// This example will consider the carriage return (CR) and new line (LF) characters as line ends
// as well as the combination CRLF.
(function() {
  try {
    var apgexp = require("apg-exp");
    var apglib = require("apg-lib");
    var writeHtml = require("../writeHtml.js");
    var grammar, exp, flags, result, str, html, page, htmlName;
    grammar = "";
    grammar += 'phrase-to-find = abl "The " animal " in the hat." ael\n';
    grammar += 'animal         = "cat" / "dog" / "bird" / "mouse"\n';
    grammar += 'line-end       = %d13.10 / %d10 / %d13\n';
    grammar += 'abl            = (&&line-end / %^) ; anchor begin of line\n';
    grammar += 'ael            = (&line-end / %$)  ; anchor end of line\n';
    flags = "g";
    exp = new apgexp(grammar, flags);
    console.log();
    console.log("SABNF grammar:");
    console.log(exp.sourceToText());
    str = "";
    str += 'The cat in the hat.\n';
    str += 'The dog in the hat.\r\n';
    str += 'The bird in the hat.\r';
    str += 'The dog is not in the hat.\n';
    str += 'The cat in the hat is black.\n';
    str += 'The mouse in the hat.';
    console.log();
    console.log("input string:");
    console.log(str);
    html = "";
    html += "<h3>grammar source</h3>\n";
    html += exp.sourceToHtml();
    html += "<h3>found lines</h3>\n";
    while (true) {
      result = exp.exec(str);
      if (result == null) {
        break;
      }
      html += "<p>" + result.toHtml() + "</p>";
      console.log(result.toText());
    }
    page = apglib.utils.htmlToPage(html);
    htmlName = "multiline-mode";
    writeHtml(page, htmlName);
  } catch (e) {
    console.log("EXCEPTION: " + e.message);
  }
})();
