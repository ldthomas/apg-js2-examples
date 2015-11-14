// Parse the input string and get the `AST` object.
var setup = require("./setup.js");
var ast = setup();
// Call the translator, passing in the user data object to collect phone number parts.
//Translates the `AST` with the callback functions defined in [`setup.js`](./setup.html)
var phoneParts = [];
ast.translate(phoneParts);
console.log();
console.log("test: translate AST");
console.log("phone number: ");
console.log("   area-code: " + phoneParts["area-code"]);
console.log("      office: " + phoneParts["office"]);
console.log("  subscriber: " + phoneParts["subscriber"]);
