// This example is a stripped down version of the main **apg** driver function.
//
// Note on teminology.
//
// APG is a parser generator.
// However, it really only generates a "grammar object" (see below) from the defining SABNF grammar.
// The generated parser is incomplete at this stage.
// Remaining, it is the job of the user to develop the generated parser from the grammar object and the APG Library (**apg-lib**).
// 
// The following terminology my help clear up the confusion between the idea of a "generated parser" versus a "generated grammar object".

// - The generating parser: APG is an APG parser (yes, there is a circular dependence between **apg** and **apg-lib**). We'll call it the generating parser.
// - The target parser: APG's goal is to generate a parser. We'll call it the target parser.
// - The target grammar: this is the (ASCII) SABNF grammar defining the target parser.
// - The target grammar object: APG parses the SABNF grammar and generates the JavaScript source for a target grammar object.
// - The final target parser: The user then develops the final target parser using the generated target grammar
// object and the APG parsing library, **apg-lib**.
(function() {
  "use strict";
  function logErrors(api, header){
    console.log("\n");
    console.log(header + ":");
    console.log(api.errorsToAscii());
    console.log("\nORIGINAL GRAMMAR:");
    console.log(api.linesToAscii());
  }
  try {
    debugger;
    var thisFileName = __filename + ": ";
    var fs = require("fs");
    var write = require("../writeHtml.js");
    var api = require("apg-api");
    var apglib = require("apg-lib");

    /* the SABNF grammar */
    var float = "";
    float += 'float    = [sign] decimal [exponent]\n';
    float += 'sign     = "+" / "-"\n';
    float += 'decimal  = integer [dot [fraction]]\n';
    float += '           / dot fraction\n';
    float += 'integer  = 1*%d48-57\n';
    float += 'dot      = "."\n';
    float += 'fraction = 1*%d48-57\n'; 
    float += 'exponent = "e" [esign] exp\n';
    float += 'esign    = "+" / "-"\n';
    float += 'exp      = 1*%d48-57\n';

    /* test generation in individual steps */
    api = new api(float);
    api.scan();
    if (api.errors.length) {
      logErrors(api, "GRAMMAR CHARACTER ERRORS");
      throw new Error(thisFileName + "invalid input grammar");
    }
    
    /* parse the grammar - the syntax phase */
    api.parse();
    if (api.errors.length) {
      logErrors(api, "GRAMMAR SYNTAX ERRORS");
      throw new Error(thisFileName + "grammar has syntax errors");
    }
    
    /* translate the AST - the semantic phase */
    api.translate();
    if (api.errors.length) {
      logErrors(api, "GRAMMAR SEMANTIC ERRORS");
      throw new Error(thisFileName + "grammar has semantic errors");
    }
    
    /* attribute generation */
    api.attributes();
    if (api.errors.length) {
      logErrors(api, "GRAMMAR ATTRIBUTE ERRORS");
      throw new Error(thisFileName + "grammar has semantic errors");
    }

    /* make a parser from the grammar object */
    var grammarObj = api.toObject();
    var parser = new apglib.parser();
    var result = parser.parse(grammarObj, 0, "123.0");
    var html = apglib.utils.parserResultToHtml(result, "separate parser");
    html = apglib.utils.htmlToPage(html);
    write(html, "separate-parser");
    
  } catch (e) {
    var msg = "EXCEPTION THROWN: ";
    if (e instanceof Error) {
      msg += e.name + ": " + e.message;
    }else {
      msg += "\n";
      msg += require("util").inspect(e, {
        showHidden : true,
        depth : null,
        colors : true
      });
    }
    console.log(msg);
  }
})();
