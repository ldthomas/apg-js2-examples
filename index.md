[<span style="font-size: 150%;font-weight:bold;">&#8962;</span> home](http://coasttocoastresearch.com/)

## Annotated Table of Contents
### JavaScript APG Version, Examples

Each folder contains a complete example.

0. The GitHub & npm README page.
<ul>
<li>[README.md](./README.html)</li>
</ul>

0. `weblinks` - the weblinks folder has copies of all of the bundled applications for web page use.

0. `apg` - demonstrate use of the parser generator.
<ul>
<li>See the scripts in the file `package.json` for some example of running `apg`, the parser generator.</li>
</ul>

0. `apg.html` - demonstrate use of the web page GUI parser generator.
<ul>
<li>[`apg-html/README.md`](./apg-html/README.html) - general instructions on testing the apg.html application.</li>
</ul>

0. `apg-api` - using the APG API.
<ul>
<li>[`apg-api/generator.js`](./apg-api/generator.html) - generate a grammar object in a single step.</li>
<li>[`apg-api/separate.js`](./apg-api/separate.html) - generate a grammar object in a multiple steps.</li>
<li>[`apg-api/webpage/apg-api.js`](./apg-api/webpage/apg-api.html) - generate a grammar object in a web page application.</li>
</ul>

0. `apg-conv` - using the data encoding conversion application.
<ul>
<li>[`apg-conv/README.md`](./apg-conv/README.html) - instructions for running the examples.</li>
</ul>

0. `apg-conv-api` - examples of using the data encoding conversion API.
<ul>
<li>[`apg-conv-api/test-suite.js`](./apg-conv-api/test-suite.html) - a suite of tests.</li>
<li>[`apg-conv-api/webpage/web-conv.js`](./apg-conv-api/webpage/web-conv.html) - a suite of web-page applications.</li>
</ul>

0. `apg-exp` - demonstrates APG Expressions - the new APG regex-like, pattern-matching engine.
<ul>
<li>The `apg-exp/grammars` folder has all of the grammars used in the various demonstrations.</li>
<li>[`apg-exp/ast.js`](./apg-exp/ast.html) - demonstrates using the Abstract Syntax Tree of the matched pattern</li>
<li>[`apg-exp/csv.js`](./apg-exp/csv.html) - demonstrates dealing with Microsoft's Comma Separated Values format</li>
<li>[`apg-exp/dangling-else.js`](./apg-exp/dangling-else.html) - demonstrates translating the famous "dangling else" problem in the <code>replace()</code> function</li>
<li>[`apg-exp/display.js`](./apg-exp/display.html) - demonstrates the many display options available for the source and results</li>
<li>[`apg-exp/flags.js`](./apg-exp/flags.html) - demonstrates the flags or options available</li>
<li>[`apg-exp/float.js`](./apg-exp/float.html) - demonstrates a comparison to <code>regex</code> for floating point numbers</li>
<li>[`apg-exp/limits.js`](./apg-exp/limits.html) - demonstrates placing limits on a potentially run-away grammar</li>
<li>[`apg-exp/multiline-mode.js`](./apg-exp/multiline-mode.html) - demonstrates how to implement multiline mode</li>
<li>[`apg-exp/recursive.js`](./apg-exp/recursive.html) - demonstrates the use of recursion to match opening and closing parenthesis pairs</li>
<li>[`apg-exp/replace.js`](./apg-exp/replace.html) - demonstrates the <code>replace()</code> function</li>
<li>[`apg-exp/rules.js`](./apg-exp/rules.html) - demonstrates how to deal with the named rules in a grammar</li>
<li>[`apg-exp/split.js`](./apg-exp/split.html) - demonstrates the <code>split()</code> function</li>
<li>[`apg-exp/test.js`](./apg-exp/test.html) - demonstrates the <code>test()</code> function</li>
<li>[`apg-exp/trace.js`](./apg-exp/trace.html) - demonstrates viewing the trace of the pattern-matching parse tree</li>
<li>[`apg-exp/udt.js`](./apg-exp/udt.html) - demonstrates how to insert user-written, phrase-matching code</li>
<li>[`apg-exp/unicode.js`](./apg-exp/unicode.html) - demonstrates the Unicode mode and how to use it</li>
<li>[`apg-exp/word-boundaries.js`](./apg-exp/word-boundaries.html) - demonstrates defining and matching word boundaries</li>
<li>[`apg-exp/webpage/email.js`](./apg-exp/webpage/email.html) - using apg-exp in a web page application.</li>
</ul>
0. `ast` - demonstrate translating and displaying the Abstract Syntax Tree.
<ul>
<li>[`ast/setup.js`](./ast/setup.html) - setting up a basic parser for a simple phone number grammar.</li>
<li>[`ast/translate.js`](./ast/translate.html) - translating the `AST`</li>
<li>[`ast/xml.js`](./ast/xml.html) - converting the `AST` to `XML` format</li>
</ul>
0. `back-reference` - demonstrate use of the back reference operators.
<ul>
<li>[`back-reference/setup.js`](./back-reference/setup.html) - the general setup for all of the other examples</li>
<li>[`back-reference/branch-fail.js`](./back-reference/branch-fail.html) - demonstrates that matched rules in a failed branch are not retained for back reference</li>
<li>[`back-reference/html.js`](./back-reference/html.html) - demonstrates using recursion with parent mode back referencing to match the names in opening and closing HTML tags</li>
<li>[`back-reference/parent.js`](./back-reference/parent.html) - demonstrates back references in parent frame mode</li>
<li>[`back-reference/simple.js`](./back-reference/simple.html) - a simple demonstration of case-sensitive and case-insensitive back references</li>
<li>[`back-reference/universal.js`](./back-reference/universal.html) - demonstrates back references in universal mode</li>
</ul>
0. `execute-rule` - demonstrate the use of the parser's functions `executeRule()` and `executeUdt()`
from user-written callback functions.
<ul>
<li>[`execute-rule/colors-app.js`](./execute-rule/colors-app.html) - the "colors" application 
demonstrating a rule name callback function executing a `UDT` with a call to `evaluateUdt()`.</li>
<li>[`execute-rule/colors-callbacks.js`](./execute-rule/colors-callbacks.html) - the "colors" application
<li>[`execute-rule/more-app.js`](./execute-rule/more-app.html) - the "more" application  demonstrating a UDT callback function executing a rule with `evaluateRule()`.</li>
<li>[`execute-rule/more-setup.js`](./execute-rule/more-setup.html) - setting up a parser for a
 simple grammar with a UDT (more.bnf).</li>
<li>[`execute-rule/more-app.js`](./execute-rule/more-app.html) - the "more" application demonstrating callback functions
which call a rule name operator from a user-written UDT.</li>
</ul>
0. `ini-file` - a "real world" application. Demonstrates how an [INI file](https://en.wikipedia.org/wiki/INI_file)
might be defined, parsed and translated into usable information.<ul>
<li>[`ini-file/setup.js`](./ini-file/setup.html) - set up the parser for a the ini file grammar (ini-file.bnf).</li>
<li>[`ini-file/ast-callbacks.js`](./ini-file/ast-callbacks.html) - the `AST` translating callback functions</li>
<li>[`ini-file/parser-callbacks.js`](./ini-file/parser-callbacks.html) - the syntax callback functions</li>
<li>[`ini-file/basic.js`](./ini-file/basic.html) - parsing out the ini file parts</li>
<li>[`ini-file/bad-input.js`](./ini-file/bad-input.html) - how it performs with a badly-formed ini file</li>
<li>[`ini-file/trace.js`](./ini-file/trace.html) - generate a trace of the parser</li>
</ul>
0. `look-ahead` - a demonstration of grammars with look ahead operators (`&` and `!`) and the `AST`
behavior with them.<ul>
<li>[`look-ahead/setup.js`](./look-ahead/setup.html) - generalized set up of the parser
 for all of the demonstrations.</li>
<li>[`look-ahead/and.js`](./look-ahead/and.html) - the classic non-context free grammar.
Demonstrates the positive look-ahead `AND(&)` operator.</li>
<li>[`look-ahead/not.js`](./look-ahead/not.html) - the C-style comment. Demonstrates the negative look-ahead `NOT(!)` operator.</li>
<li>[`look-ahead/compound.js`](./look-ahead/compound.html) - 
a make-shift grammar to demonstrate nesting of positive and negative look-ahead operators.</li>
</ul>
0. `look-behind` - demonstrate use of the look-behind (`&&` and `!!`) operators.
<ul>
<li>[`look-behind/setup.js`](./look-behind/setup.html) - the basic setup for all of the examples</li>
<li>[`look-behind/boundaries.js`](./look-behind/boundaries.html) - demonstrates using look behind to define word boundaries</li>
<li>[`look-behind/comment.js`](./look-behind/comment.html) - demonstrates the problem of using rule/UDT names in look behind - they don't always work right-to-left. Here a special rule is written to match a C-style comment in the right-to-left direction.</li>
<li>[`look-behind/negative.js`](./look-behind/negative.html) - demonstrates the negative look behind operator</li>
<li>[`look-behind/positive.js`](./look-behind/positive.html) - demonstrates the positive look behind operator</li>
</ul>
0. `simple` - a basic demonstration of how to set up a parser. Nothing fancy, just the basics.<ul>
<li>[`simple/setup.js`](./simple/setup.html) - set up a basic parser for a simple phone number grammar.</li>
<li>[`simple/minimal.js`](./simple/minimal.html) - just parse a phone number and print its parts</li>
<li>[`simple/stats.js`](./simple/stats.html) - same, but generate and display the parsing statistics</li>
<li>[`simple/trace.js`](./simple/trace.html) - same, but generate and display the parser trace</li>
<li>[`simple/webpage/setup.js`](./simple/webpage/setup.html) - a web page application example</li>
</ul>
0. `substrings` - demonstrate the substring parsing option.
<ul>
<li>[`substrings/setup.js`](./substrings/setup.html) - setting up a basic parser for the sub-strings examples</li>
<li>[`substrings/simple.js`](./substrings/simple.html) - a simple demonstration of using the <code>parseSubstring()</code> function</li>
<li>[`substrings/lookaround.js`](./substrings/lookaround.html) - demonstrates that look ahead and look behind modes are allowed to look at the portions of the string ahead of and behind the defined sub-string being parsed</li>
</ul>
0. `trace` - a demonstration of how to manage the tracing facility.<ul>
<li>[`trace/setup.js`](./trace/setup.html) - generalized set up of the parser
 for all of the demonstrations.</li>
<li>[`trace/default.js`](./trace/default.html) - the tracing defaults - all named rules and `UDT`s</li>
<li>[`trace/all-operators.js`](./trace/all-operators.html) - the whole enchilada.
 All operators, all parse tree nodes displayed.</li>
<li>[`trace/limited-lines.js`](./trace/limited-lines.html) - limits the display lines to less
 than the total number of nodes traced</li>
<li>[`trace/select-operators.js`](./trace/select-operators.html) - only a select few of the operators are displayed</li>
<li>[`trace/select-rules.js`](./trace/select-rules.html) - only a select few of the rule name operators are displayed</li>
</ul>
0. `udt` - a `UDT` demonstration. Basically the same as the "simple" example, but with a `UDT` in the grammar.<ul>
<li>[`udt/setup.js`](./udt/setup.html) - set up the basic parser.</li>
<li>[`udt/minimal.js`](./udt/minimal.html) - just parse a phone number and print its parts</li>
<li>[`udt/stats.js`](./udt/stats.html) - same, but generate and display the parsing statistics</li>
<li>[`udt/trace.js`](./udt/trace.html) - same, but generate and display the parser trace</li>
</ul>
