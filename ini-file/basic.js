// This application will read an initialization file with anonymous keys, disjointed sections
// and disjointed keys.
// It will collect the key values in each section found and then display the found data
// alphabetizing the section names and the key names within each section.
(function() {
  var fs = require("fs");
  var demo = require("./setup.js");
  try {
    var inputStr = fs.readFileSync("./ini-file/basic.txt", "utf8");
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
