module.exports = function(){
	"use strict";
  debugger;
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
		parser.ast = new apglib.ast();
		
		// optional, but used here
		var id = apglib.ids;
		
		// define the AST translating callback functions
		var phoneNumber = function (state, chars, phraseIndex, phraseLength, data) {
			var ret = id.SEM_OK;
			if (state == id.SEM_PRE) {
				// insure that the user has supplied an array for the phone number parts
				if(Array.isArray(data) === false){
					throw new Error("parser's user data must be an array");
				}
				// make sure the array is empty
				data.length = 0;
			} else if (state == id.SEM_POST) {
			}
			return ret;
		}
		var areaCode = function (state, chars, phraseIndex, phraseLength, data) {
			var ret = id.SEM_OK;
			if (state == id.SEM_PRE) {
				data["area-code"] = apglib.utils.charsToString(chars, phraseIndex, phraseLength);
			} else if (state == id.SEM_POST) {
			}
			return ret;
		}
		var office = function (state, chars, phraseIndex, phraseLength, data) {
			var ret = id.SEM_OK;
			if (state == id.SEM_PRE) {
				data["office"] = apglib.utils.charsToString(chars, phraseIndex, phraseLength);
			} else if (state == id.SEM_POST) {
			}
			return ret;
		}
		var subscriber = function (state, chars, phraseIndex, phraseLength, data) {
			var ret = id.SEM_OK;
			if (state == id.SEM_PRE) {
				data["subscriber"] = apglib.utils.charsToString(chars, phraseIndex, phraseLength);
			} else if (state == id.SEM_POST) {
			}
			return ret;
		}
		// define the nodes to retain on the AST
		parser.ast.callbacks["phone-number"] = phoneNumber;
		parser.ast.callbacks["area-code"] = areaCode;
		parser.ast.callbacks["office"] = office;
		parser.ast.callbacks["subscriber"] = subscriber;
		
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
			throw new Error("input string: '" + inputString
					+ "' : parse failed")
		}
		
		return parser.ast;
	} catch (e) {
		var msg = "\nEXCEPTION THROWN: ";
		+"\n";
		if (e instanceof Error) {
			msg += e.name + ": " + e.message;
		} else if (typeof (e) === "string") {
			msg += e;
		} else {
			msg += nodeUtil.inspect(e, inspectOptions);
		}
		process.exitCode = 1;
		console.log(msg);
		throw e;
	}
};
