// Just for completeness, this module demonstrates the `test()` function.
// It simply returns `true` if the phrase is found or `false` otherwise.
// It ignores the `u` and `d` flags but honors the `g` and `y` flags.
(function() {
  try {
    var apgexp = require("apg-exp");
    var grammar = "";
    var exp, flags, result, str, count;
    // Demonstrate with some simple tests.
    grammar += 'rule = "abc"\n';
    exp = new apgexp(grammar, flags);
    console.log();
    console.log("grammar: " + exp.source);
    str = 'abc';
    result = exp.test(str);
    console.log("  flags: '" + exp.flags + "'");
    console.log("  input: " + str);
    console.log("   test: " + result);
    str = '---abc---';
    result = exp.test(str);
    console.log();
    console.log("  flags: '" + exp.flags + "'");
    console.log("  input: " + str);
    console.log("   test: " + result);
    str = '---a-bc---';
    result = exp.test(str);
    console.log();
    console.log("  flags: '" + exp.flags + "'");
    console.log("  input: " + str);
    console.log("   test: " + result);
    // Demonstrate with the `u` and `d` flags.
    flags = "ud";
    str = 'xyzabc>>>';
    exp = new apgexp(grammar, flags);
    result = exp.test(str);
    console.log();
    console.log("       : test() ignores the u and d flags");
    console.log("  flags: '" + exp.flags + "'");
    console.log("  input: " + str);
    console.log("   test: " + result);
    str = '---a-bc---';
    result = exp.test(str);
    console.log();
    console.log("  flags: '" + exp.flags + "'");
    console.log("  input: " + str);
    console.log("   test: " + result);
    // Demonstrate with the `g` flag.
    flags = "g";
    str = '---abc---abc---';
    exp = new apgexp(grammar, flags);
    count = 0;
    while(true){
      result = exp.test(str);
      if(result === false){
        break;
      }
      count +=1;
    }
    console.log();
    console.log("       : test() honors the g flag");
    console.log("  flags: '" + exp.flags + "'");
    console.log("  input: " + str);
    console.log("   test: " + (count > 0));
    console.log("# found: " + count);
    // Demonstrate with the `y` flag.
    flags = "y";
    str = '---abc---abc---';
    exp = new apgexp(grammar, flags);
    count = 0;
    while(true){
      result = exp.test(str);
      if(result === false){
        break;
      }
      count +=1;
    }
    console.log();
    console.log("       : test() honors the y flag");
    console.log("  flags: '" + exp.flags + "'");
    console.log("  input: " + str);
    console.log("   test: " + (count > 0));
    console.log("# found: " + count);
    str = 'abcabc';
    count = 0;
    while(true){
      result = exp.test(str);
      if(result === false){
        break;
      }
      count +=1;
    }
    console.log();
    console.log("  flags: '" + exp.flags + "'");
    console.log("  input: " + str);
    console.log("   test: " + (count > 0));
    console.log("# found: " + count);
  } catch (e) {
    console.log("EXCEPTION: " + e.message);
  }
})();
