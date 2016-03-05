// This is a simple utility function used by many of the examples to write HTML output to a file that can be viewed in a browser.
// <ul>
// <li>
// *html* - a string with the HTML text to write
// </li>
// <li>
// *name* - the file name written will be "./html/<b>name</b>.html". The "./html/" directory will be created if necessary.
// The ".html" extension will be added.
// </li>
// </ul>
module.exports = function(html, name){
  var fs = require("fs");
  var dir = "./html";
  var htmlName = dir + "/" + name + ".html";
  try {
    fs.mkdirSync(dir);
  } catch (e) {
    if (e.code !== "EEXIST") {
      throw new Error("fs.mkdir failed: " + e.message);
    }
  }
  fs.writeFileSync(htmlName, html);
  console.log("file written to: " + htmlName);
}