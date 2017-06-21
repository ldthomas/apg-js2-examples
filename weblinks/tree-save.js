// This module is a helper function which can be used to save trace data
// in a format for inclusion in `tree.html` through a &lt;script> tag.
// Include this with your custom parser functions to output a trace tree for separate viewing in `tree.html`.
// 
// This module uses the node.js file system 'fs'.
// 
//arguments:
// - trace: your parser's trace object
// - mode: the display mode for the input string
//   - 'unicode' (default)
//   - 'ascii'
//   - 'decimal'
//   - 'hexidecimal'
// - pathname: the output path name
//````
module.exports = function (trace, mode, pathname) {
  function getMode(mode) {
    mode = mode.slice(3).toLowerCase();
    switch (mode) {
      case "asc":
        mode = "ascii";
        break;
      case "dec":
        mode = "decimal";
        break;
      case "hex":
        mode = "hexidecimal";
        break;
      default:
      case "uni":
        mode = "unicode";
        break;
    }
    return mode;
  }
  var ret = null;
  try {
  var tree = trace.toTree(true);
  mode = getMode(mode);
  var out = "var parseTree = '" + tree + "';\n";
  out +=    "var displayMode = '" + mode + "';\n";
  var fs = require("fs");
  fs.writeFileSync(pathname, out);
  } catch (e) {
    ret = e.message;
  }
  return ret;
};
