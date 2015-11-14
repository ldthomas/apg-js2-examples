// This application will read an initialization file with anonymous keys, disjointed sections
// and disjointed keys.
// It will collect the key values in each section found and then display the found data
// alphabetizing the section names and the key names within each section.
// Same as the [`basic.js`](./basic.html) example, except that there is some bad data, data that 
// does not follow the defining [SABNF grammar](./ini-file.html#section-3).
// This demonstrates how "error productions" can be used to ignore and/or report bad data.
// See, for example, `BadSectionLine`, `BadValueLine`, `BadBlankLine`.
(function() {
  var fs = require("fs");
  var demo = require("./setup.js");
  try {
    var inputStr = fs.readFileSync("./ini-file/bad.txt", "utf8");
    demo(inputStr, null, null);
  } catch (e) {
    console.log();
    console.log("input error");
    console.dir(e, {
      showHidden : true,
      depth : null,
      colors : true
    });
  }
})();
