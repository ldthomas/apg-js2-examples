**Annotated Table of Contents**<br>
*JavaScript APG Version 2.0, Examples*

Each folder contains a complete example.
They are listed here roughly in order of simplest to most complex.

0. The GitHub & npm README page.
<ul>
<li>[README.md](./README.html)</li>
</ul>

0. `simple` - a basic demonstration of how to set up a parser. Nothing fancy, just the basics.<ul>
<li>[`simple/setup.js`](./simple/setup.html) - set up a basic parser for a simple phone number grammar.</li>
<li>[`simple/minimal.js`](./simple/minimal.html) - just parse a phone number and print its parts</li>
<li>[`simple/stats.js`](./simple/stats.html) - same, but generate and display the parsing statistics</li>
<li>[`simple/trace.js`](./simple/trace.html) - same, but generate and display the parser trace</li>
</ul>
0. `udt` - a `UDT` demonstration. Basically the same as the "simple" example, but with a `UDT` in the grammar.<ul>
<li>[`udt/setup.js`](./udt/setup.html) - set up the basic parser.</li>
<li>[`udt/minimal.js`](./udt/minimal.html) - just parse a phone number and print its parts</li>
<li>[`udt/stats.js`](./udt/stats.html) - same, but generate and display the parsing statistics</li>
<li>[`udt/trace.js`](./udt/trace.html) - same, but generate and display the parser trace</li>
</ul>
0. `ast` - demonstrate translating and displaying the Abstract Syntax Tree.
<ul>
<li>[`ast/setup.js`](./ast/setup.html) - setting up a basic parser for a simple phone number grammar.</li>
<li>[`ast/translate.js`](./ast/translate.html) - translating the `AST`</li>
<li>[`ast/xml.js`](./ast/xml.html) - converting the `AST` to `XML` format</li>
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
0. `syntactic-predicates` - a demonstration of grammars with syntactic predicates the `AST`
behavior with them.<ul>
<li>[`syntactic-predicates/setup.js`](./syntactic-predicates/setup.html) - generalized set up of the parser
 for all of the demonstrations.</li>
<li>[`syntactic-predicates/and.js`](./syntactic-predicates/and.html) - the classic non-context free grammar.
Demonstrates the `AND(&)` operator.</li>
<li>[`syntactic-predicates/not.js`](./syntactic-predicates/not.html) - the C-style comment. Demonstrates the `NOT(!)` operator.</li>
<li>[`syntactic-predicates/compound.js`](./syntactic-predicates/compound.html) - 
a make-shift grammar to demonstrate nesting of syntactic predicate operators.</li>
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
0. `ini-file/browser` - The same as above except that it demonstrates running it in a web page rather
than as a desktop app. 
<ul>
<li>[`ini-file/browser/setup.js`](./ini-file/browser/setup.html) - when the page loads, initialize the textbox and set
the event handler for the "parse" button.</li>
<li>[`ini-file/browser/page.js`](./ini-file/browser/page.html) - executed when the "parse" button is clicked.</li>
</ul>
0. `execute-rule` - demonstrate the use of the parser's functions `executeRule()` and `executeUdt()`
from user-written callback functions.
<ul>
<li>[`execute-rule/colors-app.js`](./execute-rule/colors-app.html) - the "colors" application  demonstrating a rule name callback function executing a `UDT` with a call to the parser's function `executeUdt()`.</li>
<li>[`execute-rule/colors-callbacks.js`](./execute-rule/colors-callbacks.html) - the "colors" application
callback functions.</li>
<li>[`execute-rule/more-setup.js`](./execute-rule/more-setup.html) - setting up a parser for a
 simple grammar with a UDT (more.bnf).</li>
<li>[`execute-rule/more-app.js`](./execute-rule/more-app.html) - the "more" application demonstrating callback functions
which call a rule name operator from a user-written UDT.</li>
</ul>
