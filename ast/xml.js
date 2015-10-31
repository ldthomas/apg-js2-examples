(function(){
	"use strict";
	/*
	 * This is a demonstration of the generating an AST and translating the input string with it.
	 */
	var nodeUtil = require("util");
	var inspectOptions = {
			showHidden : true,
			depth : null,
			colors : true
		};
	try {
		// get the required parser components
		var grammar = new (require("./phone-number.js"))();
		var apglib = require("apg-lib");
		var parser = new apglib.parser();
		
		// optional, but used here
		parser.ast = new apglib.ast();
		var id = apglib.ids;
		
		// define the nodes to retain on the AST
		parser.ast.callbacks["phone-number"] = true;
		parser.ast.callbacks["area-code"] = true;
		parser.ast.callbacks["office"] = true;
		parser.ast.callbacks["subscriber"] = true;
		
		// get the input string (hard-coded for this example)
		var inputString = "(555)234-5678";
		
		// convert string to character codes
		var inputCharacterCodes = apglib.utils.stringToChars(inputString);
		
		// set the parser's "start rule"
		var startRule = "phone-number";
		// or
		// var startRule = 0;
		// would also work (can use name or index - see the grammar file phone-number.js)
		
		// parse the phone number, generating the AST
		var result = parser.parse(grammar, startRule, inputCharacterCodes);
		
		// display parser results
		console.log();
		console.log("the parser's results");
		console.dir(result, inspectOptions);
		if (result.success === false) {
			throw new Error("input string: '" + inputString+
					"' : parse failed");
		}
		
		// generate the AST in XML format
		var xml = parser.ast.displayXml();

		// display XML
		console.log();
		console.log("AST in XML format");
		console.log(xml);

	} catch (e) {
		var msg = "\nEXCEPTION THROWN: \n";
		if (e instanceof Error) {
			msg += e.name + ": " + e.message;
		} else if (typeof (e) === "string") {
			msg += e;
		} else {
			msg += nodeUtil.inspect(e, inspectOptions);
		}
		process.exitCode = 1;
		console.log(msg);
	}
	
})();
