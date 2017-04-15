// One of the reasons for developing `apg-exp` was that, to me at least, the ABNF syntax
// is much more accessible than that for `regex`. To the uninitiated, `regex` grammars can be quite dense.
// This example compares the JavaScript `RegExp` and `apg-exp` engines for matching floating point numbers.
//
// `regex` has a long and varied history - many versions, many authors.
// A clear explaination of it's syntax is not always readily available and will vary from one
// language or platform to another.
// On the other hand, ABNF is spelled out very explicitly in [RFC 5234]() for all to see and use equally.
// (But to be fair, I've also made my own, super set additions in SABNF and those will not be standards.)
(function() {
  /* convert apg-exp result to a normal form */
  var normalForm = function(result) {
    var sign, integer, fraction, esign, exponent;
    /* defaults */
    sign = "";
    integer = "0";
    fraction = "0";
    esign = "+";
    exponent = 0;
    if (result.rules['sign'] && result.rules['sign'][0].phrase === "-") {
      sign = "-";
    }
    if (result.rules['integer']) {
      integer = result.rules['integer'][0].phrase;
    }
    if (result.rules['fraction']) {
      fraction = result.rules['fraction'][0].phrase;
    }
    if (result.rules['exponent']) {
      if (result.rules['esign'] && result.rules['esign'][0].phrase === '-') {
        esign = "-";
      }
      exponent = parseInt(result.rules['exp'][0].phrase, 10);
    }
    exponent = (exponent === 0) ? "" : ("e" + esign + exponent);
    return sign + integer + "." + fraction + exponent;
  }
  try {
    var apgexp = require("apg-exp");
    var apglib = require("apg-lib");
    var writeHtml = require("../writeHtml.js");
    var grammar, exp, flags, result, str, html, page, htmlName;
    grammar = new (require("./grammars/float.js"))();
    // A search of the Internet for a good `regex` floating point number grammar finds a lot of incomplete solutions.
    // Many, maybe even most, of them have numerous restrictions.
    // This one by [Srinivas Gummadi](http://regexlib.com/Search.aspx?k=float&AspxAutoDetectCookieSupport=1)
    // works pretty well.
    // It misses the `.123` example, a fraction without leading integer, but still it is better than most.
    //
    // First let's have a look at the two grammars. If you are a `regex` expert I'm sure you will have
    // no trouble seeing a floating point number expressed here.
    // If you are like me, maybe not so much.
    regex = /[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?/g;
    flags = "g";
    exp = new apgexp(grammar, flags);
    exp.exclude([ "decimal", "dot" ]);
    console.log();
    console.log("RegExp grammar:");
    console.log("/[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?/g");
    // Maybe it's my familiarity with ABNF, 
    // but it seems to me, you should be able to immediately see
    // phrases named "sign", "decimal" and "esign" and there should be no misunderstanding what they
    // are meant to represent.
    console.log();
    console.log("SABNF grammar:");
    console.log(exp.sourceToText());
    str = "";
    str += '|||123|||123.|||.123|||-123|||-1.23e-00|||123.e2|||+.123E+1|||-123.123456789e-10|||';
    console.log();
    console.log("input string:");
    console.log(str);
    html = "";
    html += "<h3>grammar source</h3>\n";
    html += exp.sourceToHtml();
    html += "<h3>floating point numbers</h3>\n";
    /* match with regex */
    console.log();
    console.log("RegExp result:");
    while (true) {
      result = regex.exec(str);
      if (result == null) {
        break;
      }
      console.log();
      console.log("result[0]: " + result[0]);
      console.log("result[1]: " + result[1]);
    }
    /* match with apg-exp */
    console.log();
    console.log("apg-exp result:");
    while (true) {
      result = exp.exec(str);
      if (result == null) {
        break;
      }
      html += "<p>" + result.toHtml() + "</p>";
      console.log(result.toText());
    }
    // As a bonus, its not too hard to convert all of these numbers to a normal form.
    html += "<h3>normal form</h3>\n";
    html += "<pre>\n";
    console.log("put in normal form:");
    while (true) {
      result = exp.exec(str);
      if (result == null) {
        break;
      }
      var txt = normalForm(result);
      html += txt + "\n";
      console.log(normalForm(result));
    }
    // In fact, the normal form function also makes a great replacement function.
    var txt = exp.replace(str, normalForm);
    console.log();
    console.log("replacements:");
    console.log(txt);

    html += "<br>replacements:<br>\n";
    html += txt + "\n";
    html += "</pre>\n";
    page = apglib.utils.htmlToPage(html);
    htmlName = "float";
    writeHtml(page, htmlName);
  } catch (e) {
    console.log("EXCEPTION: " + e.message);
  }
})();
