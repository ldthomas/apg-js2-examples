##Examples of Use:
####JavaScript APG, Version 2.0 and its Parsing Library

**Description:**  
This project contains a number of examples of using both <a href="https://github.com/ldthomas/apg-js2">apg</a>, the parser generator,
and <a href="https://github.com/ldthomas/apg-js2-lib">apg-lib</a>, the supporting library of core parsing functions.   

**Installation:**  
*Requires node.js and npm*.
```
git clone https://github.com/ldthomas/apg-js2-examples.git examples
cd examples 
npm install
```
**The Examples:**  
In the package.json file is the script object:
```
"scripts": {
    "test": "node ./ast/xml.js",
    "apg-help": "apg -h",
    "apg-version": "apg -v",
    "apg-crlf": "apg --in=./apg/files/mixedLineEnds.bnf --CRLF && hexdump -C ./apg/files/mixedLineEnds.bnf && hexdump -C ./apg/files/mixedLineEnds.bnf.crlf",
    "apg-strict": "apg --in=./apg/files/lfOnly.bnf --strict && echo 'see ./html/grammar.html for grammar errors'",
    "apg-errors": "apg --in=./apg/files/bad-elements.bnf && echo 'see ./html/grammar.html for grammar errors'",
    "apg-rules": "apg --in=./apg/files/multiple-rules.bnf && echo 'see ./html/grammar.html for grammar errors'",
    "apg-closed": "apg --in=./apg/files/not-closed.bnf && echo 'see ./html/grammar.html for grammar errors'",
    "simple-minimal": "node ./simple/minimal.js",
    "simple-stats": "node ./simple/stats.js",
    "simple-trace": "node ./simple/trace.js",
    "udt-minimal": "node ./udt/minimal.js",
    "udt-stats": "node ./udt/stats.js",
    "udt-trace": "node ./udt/trace.js",
    "ast-xml": "node ./ast/xml.js",
    "ast-translate": "node ./ast/translate.js",
    "trace-default": "node ./trace/default.js",
    "trace-all-operators": "node ./trace/all-operators.js",
    "trace-limited-lines": "node ./trace/limited-lines.js",
    "trace-select-operators": "node ./trace/select-operators.js",
    "trace-select-rules": "node ./trace/select-rules.js",
    "sp-and": "node ./syntactic-predicates/and.js",
    "sp-not": "node ./syntactic-predicates/not.js",
    "sp-compound": "node ./syntactic-predicates/compound.js",
    "ini-file-basic": "node ./ini-file/basic.js",
    "ini-file-bad-input": "node ./ini-file/bad-input.js",
    "ini-file-trace": "node ./ini-file/trace.js",
    "er-more": "node ./execute-rule/more-app.js",
    "er-colors": "node ./execute-rule/colors-app.js"
},
```  

You can run any of these tests with<br>
`npm run test-name`<br>
for example, to run the apg test of the version number<br>
`npm run apg-version`<br>
and it should return <br>
`JavaScript APG 2.0, Copyright (C) 2105 Lowell D. Thomas, all rights reserved`

Except for `apg-help` and `apg-version` the examples output will mostly be in the `html` directory.
View `index.html` in a browser. The various links there will show you the apg output. 

To examine how the apg library examples work, see the related file. For example, the file `./ast/xml.js` will show you
how to set up a parser that will generate an XML version of the AST.

The tests `apg-*` are examples of using the parser generator. All others are examples of building applications from
generated parsers.
All examples, except `ini-file`, are very simplistic, designed just for illustration of the apg library's main features.
The `ini-file` example is more substantial and structured more like a "real-world" application might look.<br>
- `ast-*`: examples of generating and using the AST
- `er-*`: examples of using the `executeRule()` and `executeUdt()` callback functions.
- `ini-file-*`: an example of a realistic parser of the <a href="https://en.wikipedia.org/wiki/INI_file">INI file format</a>.
There is also a version of this example that runs in a browser web page. See below(\*).
- `simple-*`: just the basics. Refer back to this for the details of getting a new application parser up and running.
- `sp-*`: examples with the syntactic-predicate operators `AND(&)` and `NOT(!)`
- `trace-*`: tracing the parse tree is the primary debugging tool. But tracing can also generate a lot of output
and there are a number of ways to control the amount of output and still keep the trace records that will lead you to the error.
Most of those techniques are illustrated here.
- `udt-*`: an example using a User-Defined Terminal (UDT) - writing your own phrase recognition operator. 

Most of these examples will generate output files in the `html` directory.

(\*) In the directory `apg-examples/ini-file/browser` is an example of running the `ini-file` example in a web page.
View `apg-examples/ini-file/browser/browser.html` to see the example. To modify the example it is necessary to
regenerate the file `bundle.js`.
```
npm install -g browserify
cd apg-examples/ini-file/browser
browserify setup.js > bundle.js
``` 

**Documentation:**  
The documentation is in the code in [`docco`](https://jashkenas.github.io/docco/) format.
To generate the documentation, from the package directory:
```
npm install -g docco
./docco-gen
```
View `docs/index.html` in any web browser to get started.
Or view it on the [APG website](http://coasttocoastresearch.com/docjs2/apg-examples/index.html)

**Copyright:**  
*Copyright &copy; 2015 Lowell D. Thomas, all rights reserved*  

**License:**  
Released under the BSD-3-Clause license.
      
