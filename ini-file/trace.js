/*
 * This application will read an initialization file with disjointed sections and keys,
 * collect the key values in each section found and then display the found data
 * alphabetizing the section names and the key names within each section.
 * 
 * Errors in the input format will be reported but ignored as far as collecting the valid data.
 */
(function() {
	var fs = require("fs");
	var demo = require("./setup.js");
	var apglib = require("apg-lib");
	var trace = new apglib.trace();
	var stats = new apglib.stats();
	try{
		// set up trace (hint: copy & paste & edit from iniFile.js callbacks list)
	    trace.filter.rules['alpha'] = false;
	    trace.filter.rules['alphadigit'] = false;
	    trace.filter.rules['any'] = false;
	    trace.filter.rules['badblankline'] = true;
	    trace.filter.rules['badsectionline'] = true;
	    trace.filter.rules['badvalueline'] = true;
	    trace.filter.rules['blankline'] = true;
	    trace.filter.rules['comment'] = false;
	    trace.filter.rules['digit'] = false;
	    trace.filter.rules['dquotedstring'] = true;
	    trace.filter.rules['goodblankline'] = true;
	    trace.filter.rules['goodsectionline'] = true;
	    trace.filter.rules['goodvalueline'] = true;
	    trace.filter.rules['inifile'] = true;
	    trace.filter.rules['keyname'] = true;
	    trace.filter.rules['lineend'] = false;
	    trace.filter.rules['section'] = false;
	    trace.filter.rules['sectionline'] = true;
	    trace.filter.rules['sectionname'] = true;
	    trace.filter.rules['squotedstring'] = true;
	    trace.filter.rules['value'] = true;
	    trace.filter.rules['valuearray'] = true;
	    trace.filter.rules['valueline'] = true;
	    trace.filter.rules['wsp'] = false;
	    
		// get the input
		var inputStr = fs.readFileSync("./ini-file/bad.txt", "utf8");
		demo(inputStr, trace, stats);
	}catch(e){
		console.log();
		console.log("input error");
		console.dir(e, {showHidden : true,depth : null,colors : true});
	}
})();
