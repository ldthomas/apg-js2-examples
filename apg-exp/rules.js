// This module demonstrates how to deal with the phrases matched to the SABNF syntax rule names.
// Rule names are similar to named groupings in `regex` expressions. They associate a name with a phrase.
// `apg-exp` provides a little more information about the rule phrases than does the JavaScript `RegExp` object.
// Firstly, the JavaScript `RegExp` object does not provide for naming the grouped phrases, although other flavors
// of `regex` engines do. Secondly, the JavaScript `RegExp` object only gives the last match to the group and doesn't
// provide the character index where it was found. `apg-exp` retains all phrases matched by any rule name and provides
// character index where it was found.
//
// The `result` object retains an array of all of the phrases found for each rule name.
// It is an array of phrase objects, each object having the phrase and index in the form
// {phrase: string, index : number}.
// By default, all rule names in the grammar are retained in the result object
// but, as will be demonstrated here, uninteresting rules or phrases can be ignored.
//
// The [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) 
// description of the `RegExp` object also indicates that it retains "last match" information.
// Although most of that information seems to be missing in the `node.js` implementation, all of it,
// including the aliases, are defined and retained by the `apg-exp` object.
// This will also be demonstrated here.
//
// We will pick a grammar and string that will have several named-rules, some with zero, one and more matching phrases.
// This is a simplified [`ini file`](https://en.wikipedia.org/wiki/INI_file) format.
// It simply consists of a single, optional section name line and one required key/pair line.
// Because of the many line end characters, we will use HTML display of the results.
// The line end characters leave many confusing gaps in the console output.
(function() {
  try {
    var apgexp = require("apg-exp");
    var apglib = require("apg-lib");
    var grammar, exp, flags, result, str, html, page, htmlName;
    var writeHtml = require("../writeHtml.js");
    grammar = new (require("./grammars/ini.js"))();
    flags = "";
    exp = new apgexp(grammar, flags);
    console.log();
    console.log("SABNF grammar:");
    console.log(exp.sourceToText());
    str = "";
    str += "; comment\n";
    str += "input = 1000\n";
    result = exp.exec(str);
    // A few things to note about the output.
    // <ul>
    // <li>
    // The first rule name in the grammar, called the `start rule` (`ini` in this case,) is always the same as `result[0]`.
    // `result[0]` is simply an alias to match the familiar JavaScript `RegExp` result.
    // Often, the matched phrase is all that you want and `result[0]` is a convenient handle to it.
    // </li>
    // <li>
    // Not all rules match a phrase. In this case, there is no section name.
    // </li>
    // <li>
    // Finally, some rules are matched to multiple phrases. In fact, the `alpha` and `digit` phrases are matched
    // so often that they are a nuisance. We will demonstrate shortly how to get rid of the clutter.
    // </li>
    // </ul>
    page = result.toHtmlPage();
    htmlName = "ini-first-result";
    writeHtml(page, htmlName);
    // Let's say we want to see everything except the `alpha`, `digit` and `owsp` phrases.
    // We can exclude those with a call to the `exp.exclude()` function.
    exp.exclude([ "alpha", "digit", "owsp" ]);
    result = exp.exec(str);
    page = result.toHtmlPage();
    htmlName = "ini-exclude-result";
    writeHtml(page, htmlName);
    // Or we can do it the other way around with the `exp.include()` function.
    // Say that we only want to see the `section-name`, `key` and `value`.
    exp.include([ "section-name", "key", "value" ]);
    result = exp.exec(str);
    page = result.toHtmlPage();
    htmlName = "ini-include-result";
    writeHtml(page, htmlName);
    // Now that we've show the display of the rules (see [display.js]() for more on display functions)
    // let's take a look at how to handle them programmatically.
    // Here is a general loop that will give specific access to all of the included rule phrases.
    str = "";
    str += "; comment\n";
    str += "input = 1000\n";
    exp = new apgexp(grammar, flags);
    exp.exclude([ "alpha", "digit" ]);
    result = exp.exec(str);
    html = "";
    html += exp.sourceToHtml();
    html += '<h3>input string</h3>\n';
    html += apglib.utils.stringToAsciiHtml(str);
    html += '<h3>result</h3>\n';
    html += '<pre>\n';
    // Enumerate all of the named rules.
    for ( var name in result.rules) {
      if(result.rules[name]){
        // The named rule is defined. Therefore, it is an array of phrase objects.
        // Each phrase and index is specifically identified and displayed in this loop.
        for (var i = 0; i < result.rules[name].length; i += 1) {
          var phrase = result.rules[name][i].phrase;
          var index = result.rules[name][i].index;
          html += "result.rules[" + name + "][" + i + "].phrase(" + index + ") = '";
          html += apglib.utils.stringToAsciiHtml(phrase);
          html += "'\n";
        }
      }else{
        // Otherwise, no phrase was matched for this rule
        html += "result.rules[" + name + "] = undefined\n";
      }
    }
    html += '</pre>\n';
    html = apglib.utils.htmlToPage(html);
    htmlName = "ini-enumeration";
    writeHtml(html, htmlName);
    // Briefly, we will also show here the `last match` information retained in the `apg-exp` object.
    html = exp.toHtml();
    html = apglib.utils.htmlToPage(html);
    htmlName = "ini-last-match";
    writeHtml(html, htmlName);
    // Programmatically, we can access the `last match` data similarly. A partial display is given here.
    html = '<h3>last match</h3>\n';
    html += "exp.leftContext: ";
    html += apglib.utils.stringToAsciiHtml(exp.leftContext);
    // Enumerate the last match to each rule
    html += '<pre>\n';
    for( var name in exp.rules){
      html += "exp.rules[" + name + "]: " + exp.rules[name];
      html += "\n";
      var lastMatchPhraseName = "${" + name + "}"; 
      html += "exp["+lastMatchPhraseName+"]: " + exp[lastMatchPhraseName];
      html += "\n";
    }
    html += '</pre>\n';
    html = apglib.utils.htmlToPage(html);
    htmlName = "ini-last-match-program";
    writeHtml(html, htmlName);
  } catch (e) {
    console.log("EXCEPTION: " + e.message);
  }
})();
