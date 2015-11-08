module.exports = function(trace, phoneNumber, name){
	"use strict";
	/*
	 * This is a demonstration of the bare minimum needed to set up a parser
	 * and parse a given input string.
	 */
	var thisFileName = "setup.js: ";
	var nodeUtil = require("util");
	var fs = require("fs");
	var inspectOptions = {
			showHidden : true,
			depth : null,
			colors : true
		};
	var charsToHtml = function(chars){
		var html = "";
		chars.forEach(function(char){
			if(char === 10){
				html += "<br>";
			}else{
				html += "&#" + char + ";";
			}
		});
		return html;
	}
	try {
		// get the required parser components
		var apglib = require("apg-lib");
		var parser = new apglib.parser();
		var grammar = new (require("./fancy-number.js"))();
		
		// some optional parts that will be used in this demo
		var id = apglib.ids;
		
		// hand-written UDT callback function - required
		parser.callbacks["u_office"] = function(result, chars, phraseIndex,data) {
			var matchFound = false;
			while (true) {
				if (chars + phraseIndex + 3 <= chars.length) {
					// not three digits left in the string
					break;
				}
				var dig1 = chars[phraseIndex];
				var dig2 = chars[phraseIndex + 1];
				var dig3 = chars[phraseIndex + 2];
				if (dig1 < 50 || dig1 > 57) {
					// first digit must be in range 2-9
					break;
				}
				if (dig2 < 48 || dig2 > 57 || dig3 < 48 || dig3 > 57) {
					// second & third digits must be in range 0-9
					break;
				}
				if (dig2 === 49 && dig3 === 49) {
					// if the second digit is "1" then the third digit cannot also
					// be "1"
					throw new Error("UDT u_office: digits 2 and 3 cannot both be 1");
					break;
				}

				// success
				matchFound = true;
				break;
			}
			if (matchFound === true) {
				result.state = id.MATCH;
				result.phraseLength = 3;
			} else {
				result.state = id.NOMATCH;
				result.phraseLength = 0;
			}
		}
		
		// verify input
		var inputCharacterCodes;
		if(typeof(trace) === "object" && trace.traceObject === "traceObject"){
			parser.trace = trace;
		}else{
			throw new Error(thisFileName + "valid trace object required");
		}
		if(typeof(phoneNumber) === "string"){
			inputCharacterCodes = apglib.utils.stringToChars(phoneNumber);
		}else if(Array.isArray(phoneNumber) && typeof(phoneNumber[0] === "number")){
			inputCharacterCodes = phoneNumber;
		}else{
			throw new Error(thisFileName + "input phoneNumber must be string or array of integers");
		}
		if(typeof(name) !== "string"){
			name = "default";
		}
		
		// finally, parse the phone number (assume first rule is start rule)
		var result = parser.parse(grammar, 0, inputCharacterCodes);
		
		// display parser results
		console.log();
		console.log("the parser's results");
		console.dir(result, inspectOptions);

		// generate trace pages in all three formats
		var input = "<p>input string:<br>\n";
		input += charsToHtml(inputCharacterCodes);
		input += "\n</p>\n";
		var html;
		var pageName;
		var dir = "html";
		try{
			fs.mkdirSync(dir);
		}catch(e){
			if(e.code !== "EEXIST"){
				throw new Error("fs.mkdir failed: "+e.message);
			}
		}
		pageName = dir + "/trace-" + name + "-ascii.html";
		html = input + parser.trace.displayHtml(name, "ascii");
		result = apglib.utils.htmlToPage(html, pageName);
		if(result.hasErrors === true){
			throw new Error(result.errors[0]);
		}
		console.log();
		console.log('view "'+pageName+'" in any browser to display parser\'s trace');

		pageName = dir + "/trace-" + name + "-hex.html";
		html = input + parser.trace.displayHtml(name, "hex");
		result = apglib.utils.htmlToPage(html, pageName);
		if(result.hasErrors === true){
			throw new Error(result.errors[0]);
		}
		console.log();
		console.log('view "'+pageName+'" in any browser to display parser\'s trace');

		pageName = dir + "/trace-" + name + "-dec.html";
		html = input + parser.trace.displayHtml(name, "dec");
		result = apglib.utils.htmlToPage(html, pageName);
		if(result.hasErrors === true){
			throw new Error(result.errors[0]);
		}
		console.log();
		console.log('view "'+pageName+'" in any browser to display parser\'s trace');
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
