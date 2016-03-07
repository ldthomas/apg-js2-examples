##JavaScript APG Examples
###Examples for:
- **apg - the parser generator**
- **apg-lib - demonstrations of the parser's features and sample parsing problems solved**
- **apg-exp - demonstrations of the new regex-like pattern-matching engine**

**Description:**  
This repository contains a number of examples of using <a href="https://github.com/ldthomas/apg-js2">apg</a>, the parser generator,
<a href="https://github.com/ldthomas/apg-js2-lib">apg-lib</a>, the supporting library of core parsing functions
and <a href="https://github.com/ldthomas/apg-js2-exp">apg-exp</a>, the new regex-like, pattern-matching engine.    

**Installation:**  
*Requires node.js and npm*.
```
git clone https://github.com/ldthomas/apg-js2-examples.git examples
cd examples 
npm install
```
**APG Examples:**  
In the package.json file is the script object:
```
"scripts": {
    "apg-help": "apg -h",
    "apg-version": "apg -v",
    "apg-crlf": "apg --in=./apg/files/mixedLineEnds.bnf --CRLF && hexdump -C ./apg/files/mixedLineEnds.bnf && hexdump -C ./apg/files/mixedLineEnds.bnf.crlf",
    "apg-strict": "apg --in=./apg/files/lfOnly.bnf --strict && echo 'see ./html/grammar.html for grammar errors'",
    "apg-errors": "apg --in=./apg/files/bad-elements.bnf && echo 'see ./html/grammar.html for grammar errors'",
    "apg-rules": "apg --in=./apg/files/multiple-rules.bnf && echo 'see ./html/grammar.html for grammar errors'",
    "apg-closed": "apg --in=./apg/files/not-closed.bnf && echo 'see ./html/grammar.html for grammar errors'"
},
```  
You can run any of these APG tests with npm. For example,<br>
`npm run apg-version`<br>
should return <br>
`JavaScript APG 2.0, Copyright (C) 2106 Lowell D. Thomas, all rights reserved`

**apg-lib examples:**  
There are many examples to demonstrate the most important features of `apg-lib`.
For example, the `ast` directory has examples of creating and using the Abstract Syntax Tree (AST).
The `trace` directory has examples of using the trace facility, APG's version of a debugger.
To run the examples, change to the directory for the desired example and execute any file with `node.js`.
e. g.
```
cd ast
node xml.js
```
Note that in the `ini-file` example is a demonstration of how to use [browserify](http://browserify.org/)
to put the example in a web page. To view the example, view `ini-file/browser/browser.html` in any web browser.
To make changes, simply re-browserify the files and refresh the browser page.
```
npm install -g browserify
cd ini-file/browser
/* modify page.js or setup.js or browser.html */
browserify setup.js > bundle.js
```

**apg-exp examples:**  
The `apg-exp` directory has many examples of using the new pattern-matching engine.
To run the examples, change to the directory for the desired example and execute any file with `node.js`.
e. g.
```
cd apg-exp
node flags.js
```
Many of these examples will generate HTML output files in the `html` directory.

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
*Copyright &copy; 2016 Lowell D. Thomas, all rights reserved*  

**License:**  
Released under the BSD-3-Clause license.
      
