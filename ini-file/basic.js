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
	try{
		var inputStr = fs.readFileSync("./ini-file/basic.txt", "utf8");
		demo(inputStr, null, null);
	}catch(e){
		console.log();
		console.log("input error");
		console.dir(e, {showHidden : true,depth : null,colors : true});
	}
})();
