module.exports = function(grammar, callbacks, input){
	"use strict";
	var nodeUtil = require("util");
	var inspectOptions = {
			showHidden : true,
			depth : null,
			colors : true
		};
	try {
		// get the required parser components
		var apglib = require("apg-lib");
		var parser = new apglib.parser();
		
		// optional, but used here
		parser.ast = new apglib.ast();
		var id = apglib.ids;
		
		// define the nodes to retain on the AST
		parser.ast.callbacks = callbacks
		
		// convert string to character codes
		var inputCharacterCodes = apglib.utils.stringToChars(input);
		
		// set the parser's "start rule"
		var startRule = 0;
		
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
};
