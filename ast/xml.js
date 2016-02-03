// Parse the input string and get the `AST` object.
var setup = require("./setup.js");
var ast = setup();
// Convert the `AST` to `XML` format and display it on the console.
var xml = ast.toXml();
console.log();
console.log("test: display AST in XML");
console.log(xml);
