module.exports = function(input, trace, stats){
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
	var sortNames = function(obj){
		var count = 0;
		var names = [];
		for(var name in obj){
			count += 1;
			names.push(name);
		}
		return names.sort();
	}
	try {
		// verify input
		if(typeof(input) !== "string"){
			throw new Error(thisFileName + "invalid input string");
		}
		if(trace === null ||
				typeof(trace) !== "object" ||
				trace.traceObject !== "traceObject"){
			trace = null;
		}
		if(stats === null ||
				typeof(stats) !== "object" ||
				stats.statsObject !== "statsObject"){
			stats = null;
		}

		// get the required parser components
		var apglib = require("apg-lib");
		var parser = new apglib.parser();
		var grammar = new (require("./ini-file.js"))();
		var parserCallbacks = new (require("./parser-callbacks.js"))();
		var astCallbacks = new (require("./ast-callbacks.js"))();
		parser.ast = new apglib.ast();
		parser.callbacks = parserCallbacks.callbacks;
		parser.ast.callbacks = astCallbacks.callbacks;
		parser.trace = trace;
		parser.stats = stats;
		
		// some optional parts that will be used in this demo
		var id = apglib.ids;
		
		// finally, parse the phone number (assume first rule is start rule)
		var inputCharacterCodes = apglib.utils.stringToChars(input);
		var syntaxData = {};
		var result = parser.parse(grammar, 0, inputCharacterCodes, syntaxData);
		
		// display parser results
		console.log();
		console.log("the parser's results");
		console.dir(result, inspectOptions);
		if(result.success !== true){
			throw new Error(thisFileName + "parse failed");
		}
		if(syntaxData.errors.length > 0){
			console.log();
			console.log("syntax errors found:");
			syntaxData.errors.forEach(function(error){
				console.log(error);
			});
		}
		
		var html, pageName;
		if(parser.stats !== null){
			var dir = "html";
			try{
				fs.mkdirSync(dir);
			}catch(e){
				if(e.code !== "EEXIST"){
					throw new Error("fs.mkdir failed: "+e.message);
				}
			}
			// display the rule name stats, ordered by hit count
			html = parser.stats.displayHtml("hits", "rules ordered by hit count");
			
			// view statistics results in a browser at page "html/stats.html"
			pageName = dir +"/ini-file-stats.html";
			result = apglib.utils.htmlToPage(html, pageName);
			if(result.hasErrors === true){
				throw result;
			}
			console.log();
			console.log('view "'+pageName+'" in any browser to display parsing statistics');
		}

		if(parser.trace !== null){
			var dir = "html";
			try{
				fs.mkdirSync(dir);
			}catch(e){
				if(e.code !== "EEXIST"){
					throw new Error("fs.mkdir failed: "+e.message);
				}
			}
			pageName = dir + "/ini-file-trace.html";
			html = parser.trace.displayHtml("IniFile Trace", "ascii");
			result = apglib.utils.htmlToPage(html, pageName);
			if(result.hasErrors === true){
				throw result;
			}
			console.log();
			console.log('view "'+pageName+'" in any browser to display parser\'s trace');
		}
		var data = {};
		parser.ast.translate(data);
		console.log();
		console.log("alphabetized AST translation data:")
		console.log();
		var sectionNames = sortNames(data);
		sectionNames.forEach(function(sectionName){
			if(sectionName !== '0'){
				console.log();
				console.log('[' + sectionName + ']');
			}
			var keys = sortNames(data[sectionName]);
			keys.forEach(function(keyName){
				console.log(keyName +': ' + data[sectionName][keyName]);
			});
		});
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
	}
}
