## JavaScript APG Examples

#### Description:  
This repository contains a number of detailed examples demonstrating how to use:
* [apg](https://github.com/ldthomas/apg-js2), the parser generator command-line application, built from the new **apg-api**.
* [apg-api](https://github.com/ldthomas/apg-js2-api), an API for the parser generator
* apg.html the new, web page, GUI version of the parser generator
* [apg-lib](https://github.com/ldthomas/apg-js2-lib), the supporting library of core parsing functions
* [apg-exp](https://github.com/ldthomas/apg-js2-exp), the RegExp-like pattern-matching engine.    
* [apg-conv](https://github.com/ldthomas/apg-conv), the data encoding conversion application, built from the new **apg-conv-api**.
* [apg-conv-api](https://github.com/ldthomas/apg-conv-api), an API for data encoding and conversion

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
"apg-conv-api": "node ./apg-conv-api/test-suite $1"
```  
You can run any of these APG tests with npm. For example,<br>
* `npm run apg-version` should return something like<br>
`JavaScript APG 3.0.0, Copyright (C) 2017 Lowell D. Thomas, all rights reserved`
* etc.

#### Documentation:  
Where applicable, web page usage examples along with command line node.js examples are given.
For more details about how to run them, see the documentation for the individual examples.
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
      
