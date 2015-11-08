var setup = require("./setup.js");
var ast = setup();
var xml = ast.displayXml();
console.log();
console.log("test: display AST in XML");
console.log(xml);
