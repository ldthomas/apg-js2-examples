module.exports = function(doStats, doTrace){
	"use strict";
	/*
	 * This is a demonstration of the bare minimum needed to set up a parser
	 * and parse a given input string.
	 */
	var nodeUtil = require("util");
	var fs = require("fs");
	var inspectOptions = {
			showHidden : true,
			depth : null,
			colors : true
		};
	doStats = doStats === true ? true : false;
	doTrace = doTrace === true ? true : false;
	var apglib = require("apg-lib");
	try {
		// get the required parser components
		var grammar = new (require("./phone-number.js"))();
		var parser = new apglib.parser();
		
		// some optional parts that will be used in this demo
		var utils = apglib.utils;
		var id = apglib.ids;
		
		// only if statistics are wanted
		if(doStats){
			parser.stats = new apglib.stats();
		}
		
		// only if trace is wanted (see DemoTrace for more detailed tracing options)
		if(doTrace){
			parser.trace = new apglib.trace();
		}
		
		// define the parser callback functions
		var phoneNumber = function(result, chars, phraseIndex, data){
			// this would be the general case if all four states were important to the application
			switch (result.state) {
			case id.ACTIVE:
				// insure that the user has supplied an array for the phone number parts
				if(Array.isArray(data) === false){
					throw new Error("parser's user data must be an array");
				}
				// make sure the array is empty
				data.length = 0;
				break;
			case id.EMPTY:
				// not used
				break;
			case id.MATCH:
				// not used
				break;
			case id.NOMATCH:
				// not used
				break;
			}
		}
		var areaCode = function(result, chars, phraseIndex, data){
			if(result.state === id.MATCH) {
				// capture the area code
				data["area-code"] = utils.charsToString(chars, phraseIndex, result.phraseLength);
			}
		}
		var office = function(result, chars, phraseIndex, data){
			if(result.state === id.MATCH) {
				// capture the 3-digit central office or exchange number
				data["office"] = utils.charsToString(chars, phraseIndex, result.phraseLength);
			}
		}
		var subscriber = function(result, chars, phraseIndex, data){
			if(result.state === id.MATCH) {
				// capture the 4-digit subscriber number
				data["subscriber"] = utils.charsToString(chars, phraseIndex, result.phraseLength);
			}
		}
		
		// set the parser callback functions
		parser.callbacks["phone-number"] = phoneNumber;
		parser.callbacks["area-code"] = areaCode;
		parser.callbacks["office"] = office;
		parser.callbacks["subscriber"] = subscriber;
		
		// get the input string (hard-coded for this example)
		var inputString = "(555)234-5678";
		
		// convert string to character codes
		var inputCharacterCodes = utils.stringToChars(inputString);
		
		// set the parser's "start rule"
		var startRule = "phone-number";
		// or
		// var startRule = 0;
		// would also work (can use name or index - see the grammar file phone-number.js)
		
		// define the array to receive the phone number parts
		// (the parser's callback functions will complete this array)
		var phoneParts = [];
		
		// finally, parse the phone number
		var result = parser.parse(grammar, startRule, inputCharacterCodes, phoneParts);
		
		// display parser results
		console.log();
		console.log("the parser's results");
		console.dir(result, inspectOptions);
		if (result.success === false) {
			throw new Error("input string: '" + inputString
					+ "' : parse failed")
		}

		// display parsed phone number parts
		console.log();
		console.log("phone number: '" + inputString);
		console.log("   area-code: " + phoneParts["area-code"]);
		console.log("      office: " + phoneParts["office"]);
		console.log("  subscriber: " + phoneParts["subscriber"]);
		
		if(doStats){
			var html = "";
			// display the opcode stats only
			html += parser.stats.displayHtml("ops", "ops-only stats");
			
			// display the rule name stats, ordered by rule name index
			// (rule names with no hits are not listed)
			html += parser.stats.displayHtml("index", "rules ordered by index");

			// display the rule name stats, ordered by hit count
			html += parser.stats.displayHtml("alpha", "rules ordered alphabetically");

			// display the rule name stats, ordered by hit count
			html += parser.stats.displayHtml("hits", "rules ordered by hit count");
			
			// view statistics results in a browser at page "html/stats.html"
			var dir = "html";
			try{
				fs.mkdirSync(dir);
			}catch(e){
				if(e.code !== "EEXIST"){
					throw new Error("fs.mkdir failed: "+e.message);
				}
			}
			result = utils.htmlToPage(html, dir + "/simple-stats.html");
			if(result.hasErrors === true){
				throw new Error(result.errors[0]);
			}
			console.log();
			console.log('view "html/simple-stats.html" in any browser to display parsing statistics');
		}
		
		if(doTrace){
			var html = parser.trace.displayHtml("good phone number, default trace");
			var dir = "html";
			try{
				fs.mkdirSync(dir);
			}catch(e){
				if(e.code !== "EEXIST"){
					throw new Error("fs.mkdir failed: "+e.message);
				}
			}
			result = utils.htmlToPage(html, dir + "/simple-trace.html");
			if(result.hasErrors === true){
				throw new Error(result.errors[0]);
			}
			console.log();
			console.log('view "html/simple-trace.html" in any browser to display parser\'s trace');
		}

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
}
