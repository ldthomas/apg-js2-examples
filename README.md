## JavaScript APG Examples
#### Description:  
This repository contains a number of detailed examples demonstrating how to use:
* [apg](https://github.com/ldthomas/apg-js2), the parser generator
* **apg.html** the new, web page, GUI version of the parser generator
* [apg-lib](https://github.com/ldthomas/apg-js2-lib), the supporting library of core parsing functions
* [apg-exp](https://github.com/ldthomas/apg-js2-exp), the RegExp-like pattern-matching engine.    

#### Installation:  
```
git clone https://github.com/ldthomas/apg-js2-examples.git examples
cd examples 
npm install --save
```
**APG Examples:**  
In the package.json are the scripts:
```
"apg-help": "apg -h",
"apg-version": "apg -v",
"apg-strict": "apg --in=./apg/lf-only.bnf --strict",
"apg-errors": "apg -i ./apg/bad-elements.bnf",
"apg-rules": "apg --in=./apg/multiple-rules.bnf",
"apg-attributes": "apg --in=./apg/attr-errors.bnf",
"apg-multi": "apg -i ./apg/first.bnf,./apg/second.bnf -o multi.js",
"apg-multiple": "apg -i ./apg/first.bnf --in=./apg/second.bnf --out=multiple.js"
```  
You can run any of these APG tests with npm. For example,<br>
* `npm run apg-version` should return something like<br>
`JavaScript APG 3.0.0, Copyright (C) 2017 Lowell D. Thomas, all rights reserved`
* etc.

**apg.html Examples:**    
In the directory, `examples/apg-html` is a sub-directory for each example.
For each example there is a `README.html` file with instructions and information about the example.
Copy and paste the `grammar.bnf` file into the `Generate` panel to generate a parser for that grammar.
Then copy and paste one of the `*.txt` files into the `Input` panel to test the generated parser.

**apg-lib examples:**  
There are many examples here to demonstrate the most important features of `apg-lib`.
For example, the `ast` directory has examples of creating and using the Abstract Syntax Tree (AST).
The `trace` directory has examples of using the trace facility, APG's version of a debugger.
To run the examples, change to the directory for the desired example and execute any file with `node.js`.
e. g.
```
cd ast
node xml.js
```
Note that the `simple` test has a sub-directory `simple/browser` with an example of how to use `apg-lib` in a web application.

**apg-exp examples:**  
The `apg-exp` directory has many examples of using the new pattern-matching engine.
To run the examples, change to the directory for the desired example and execute any file with `node.js`.
e. g.
```
cd apg-exp
node flags.js
```
The grammars used in all of these examples are in `grammars` sub-directory. 
Many of these examples will generate HTML output files and create an `html` directory where they will be placed.

Note, also, that the `email` sub-directory has an example of using `apg-exp` in a web application.

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
*Copyright &copy; 2017 Lowell D. Thomas, all rights reserved*  

**License:**  
Released under the BSD-3-Clause license.
      
