// This is the JavaScript driving the HTML demonstration.
/* the input and output elements */
var ELEMENT = {
  input : null,
  output : null
}

/* a button click sets the type of transformation to be made */
var type = "ascii";

/* on page load, get the input and output elements and remember them */
var onload = function() {
  ELEMENT.input = document.getElementById("input");
  ELEMENT.output = document.getElementById("output");
}

/* helper function to convert an array of character codes to HTML entities */
var charsToHtml = function(chars) {
  var html = "";
  for (var i = 0; i < chars.length; i += 1) {
    var char = chars[i];
    switch (char) {
    case 9:
      /* the "apg-ctrl-char" class requires apg-lib.css */
      html += '<span class="apg-ctrl-char">TAB</span>';
      break;
    case 10:
      html += '<span class="apg-ctrl-char">LF</span><br>';
      break;
    case 13:
      html += '<span class="apg-ctrl-char">CR</span>';
      break;
    default:
      var x = char.toString(16);
      html += '&#x'+char.toString(16)+';';
      break;
    }
  }
  return html;
}

/* the input for the ASCII test */
var ascii = function() {
  type = "ascii";
  var str = "";
  str += "This is an example of simple ASCII text.\n";
  str += "Some lines have tabs \t in \t them.\n";
  str += "But even simple ASCII has some frustrations in textareas.\n";
  str += "What if we want to work with text with CRLF (\\r\\n) line endings?\n";
  str += "Some browsers don't allow them.\n";
  str += "They will convert CRLF to LF when text is pasted into a textarea.\n";
  str += "The ESCAPED format is a simple solution to this situation.\n";
  str += "ESCAPED format is just like JavaScript string escaping,\n";
  str += "except that it uses grave accent (``) as the escape character.\n";
  str += "Why? Because if we used the backslash (\\) like JavaScript,\n";
  str += "then when creating ESCAPED format strings to paste into a textarea,\n";
  str += "all escape characters would require double backslashes (\\\\).\n";
  str += "This can be confusing, error prone and quite annoying.\n";
  str += "Hence the grave accent, chosen because it doesn't require a shift key.\n";
  str += "\n";
  str += "Here are a couple of lines with CRLF line endings.`x0D\n";
  str += "The end.`x0D\n";
  ELEMENT.input.value = str;
}

/* the input for the binary values test */
var binary = function() {
  type = "binary";
  var str = "";
  str += "This is how you might enter binary characters into a textarea.\n";
  str += "Binary characters are the 8-bit, one-byte character codes.\n";
  str += "These are also sometimes referred to as \"Latin 1\" or \"ISO 8859-1\",\n";
  str += "although some conditions on value ranges may apply to these designations.\n";
  str += "Below are binary characters in the range 0xA0-FF.\n\n";
  str += "`xA0 `xA1 `xA2 `xA3 `xA4 `xA1 `xA5 `xA6 `xA7 `xA8 `xA9 `xAA `xAB `xAC `xAD `xAE `xAF\n";
  str += "`xB0 `xB1 `xB2 `xB3 `xB4 `xB1 `xB5 `xB6 `xB7 `xB8 `xB9 `xBA `xBB `xBC `xBD `xBE `xBF\n";
  str += "`xC0 `xC1 `xC2 `xC3 `xC4 `xC1 `xC5 `xC6 `xC7 `xC8 `xC9 `xCA `xCB `xCC `xCD `xCE `xCF\n";
  str += "`xD0 `xD1 `xD2 `xD3 `xD4 `xD1 `xD5 `xD6 `xD7 `xD8 `xD9 `xDA `xDB `xDC `xDD `xDE `xDF\n";
  str += "`xE0 `xE1 `xE2 `xE3 `xE4 `xE1 `xE5 `xE6 `xE7 `xE8 `xE9 `xEA `xEB `xEC `xED `xEE `xEF\n";
  str += "`xF0 `xF1 `xF2 `xF3 `xF4 `xF1 `xF5 `xF6 `xF7 `xF8 `xF9 `xFA `xFB `xFC `xFD `xFE `xFF\n";
  ELEMENT.input.value = str;
}

/* the input for the Cherokee test */
var cherokee = function() {
  type = "cherokee";
  var str = "";
  str += "VGhpcyBleGFtcGxlIGRpc3BsYXlzIHRoZSBDaGVyb2tlZSBhbHBoYWJldC4KSXQgaGFzIGJlZW4g\n";
  str += "ZW5jb2RlZCBhcyBVVEYtOC4KRmluYWxseSwgYmFzZTY0IGVuY29kaW5nIGhhcyBiZWVuIHVzZWQg\n";
  str += "dG8KdG8gbWFrZSBpdCBjb21wYXRpYmxlIHdpdGggYSB0ZXh0YXJlYS4KCuGOoMKg4Y6hwqDhjqLC\n";
  str += "oOGOo8Kg4Y6kwqDhjqXCoOGOpsKg4Y6nwqDhjqjCoOGOqcKg4Y6qwqDhjqvCoOGOrMKg4Y6twqDh\n";
  str += "jq7CoOGOrwrhjrDCoOGOscKg4Y6ywqDhjrPCoOGOtMKg4Y61wqDhjrbCoOGOt8Kg4Y64wqDhjrnC\n";
  str += "oOGOusKg4Y67wqDhjrzCoOGOvcKg4Y6+wqDhjr8K4Y+AwqDhj4HCoOGPgsKg4Y+DwqDhj4TCoOGP\n";
  str += "hcKg4Y+GwqDhj4fCoOGPiMKg4Y+JwqDhj4rCoOGPi8Kg4Y+MwqDhj43CoOGPjsKg4Y+PCuGPkMKg\n";
  str += "4Y+RwqDhj5LCoOGPk8Kg4Y+UwqDhj5XCoOGPlsKg4Y+XwqDhj5jCoOGPmcKg4Y+awqDhj5vCoOGP\n";
  str += "nMKg4Y+dwqDhj57CoOGPnwrhj6DCoOGPocKg4Y+iwqDhj6PCoOGPpMKg4Y+lwqDhj6bCoOGPp8Kg\n";
  str += "4Y+owqDhj6nCoOGPqsKg4Y+rwqDhj6zCoOGPrcKg4Y+uwqDhj68K4Y+wwqDhj7HCoOGPssKg4Y+z\n";
  str += "wqDhj7Q=\n";
  ELEMENT.input.value = str;
}

/* the input for the Playing Cards test */
var cards = function() {
  type = "cards";
  var str = "";
  str += "This ESCAPED example will display a deck of playing cards.\n";
  str += "\n";
  str += "`u{1f0a1}`xa0`u{1f0a2}`xa0`u{1f0a3}`xa0`u{1f0a4}`xa0`u{1f0a5}`xa0`u{1f0a6}`xa0`u{1f0a7}`xa0";
  str += "`u{1f0a8}`xa0`u{1f0a9}`xa0`u{1f0aa}`xa0`u{1f0ab}`xa0`u{1f0ac}`xa0`u{1f0ad}`xa0`u{1f0ae}`xa0\n";
  str += "\n";
  str += "`u{1f0b1}`xa0`u{1f0b2}`xa0`u{1f0b3}`xa0`u{1f0b4}`xa0`u{1f0b5}`xa0`u{1f0b6}`xa0`u{1f0b7}`xa0";
  str += "`u{1f0b8}`xa0`u{1f0b9}`xa0`u{1f0ba}`xa0`u{1f0bb}`xa0`u{1f0bc}`xa0`u{1f0bd}`xa0`u{1f0be}`xa0\n";
  str += "\n";
  str += "`u{1f0c1}`xa0`u{1f0c2}`xa0`u{1f0c3}`xa0`u{1f0c4}`xa0`u{1f0c5}`xa0`u{1f0c6}`xa0`u{1f0c7}`xa0";
  str += "`u{1f0c8}`xa0`u{1f0c9}`xa0`u{1f0ca}`xa0`u{1f0cb}`xa0`u{1f0cc}`xa0`u{1f0cd}`xa0`u{1f0ce}`xa0\n";
  str += "\n";
  str += "`u{1f0d1}`xa0`u{1f0d2}`xa0`u{1f0d3}`xa0`u{1f0d4}`xa0`u{1f0d5}`xa0`u{1f0d6}`xa0`u{1f0d7}`xa0";
  str += "`u{1f0d8}`xa0`u{1f0d9}`xa0`u{1f0da}`xa0`u{1f0db}`xa0`u{1f0dc}`xa0`u{1f0dd}`xa0`u{1f0de}`xa0\n";
  ELEMENT.input.value = str;
}

/* the input for the BASE64 test */
var base64 = function() {
  type = "base64";
  var str = "";
  str += "Let's say we want to input that same deck of cards and\n";
  str += "convert it to a standard text form that we can send \n";
  str += "on to a carrier that only handles ASCII characters.\n";
  str += "We'll do that by converting it to UTF-8 and then base64 encoding it.\n";
  str += "\n";
  str += "Here we will just strip off these first few lines\n";
  str += "and display the final base64 result.\n";
  str += "\n";
  str += "`u{1f0a1}`xa0`u{1f0a2}`xa0`u{1f0a3}`xa0`u{1f0a4}`xa0`u{1f0a5}`xa0`u{1f0a6}`xa0`u{1f0a7}`xa0";
  str += "`u{1f0a8}`xa0`u{1f0a9}`xa0`u{1f0aa}`xa0`u{1f0ab}`xa0`u{1f0ac}`xa0`u{1f0ad}`xa0`u{1f0ae}`xa0\n";
  str += "\n";
  str += "`u{1f0b1}`xa0`u{1f0b2}`xa0`u{1f0b3}`xa0`u{1f0b4}`xa0`u{1f0b5}`xa0`u{1f0b6}`xa0`u{1f0b7}`xa0";
  str += "`u{1f0b8}`xa0`u{1f0b9}`xa0`u{1f0ba}`xa0`u{1f0bb}`xa0`u{1f0bc}`xa0`u{1f0bd}`xa0`u{1f0be}`xa0\n";
  str += "\n";
  str += "`u{1f0c1}`xa0`u{1f0c2}`xa0`u{1f0c3}`xa0`u{1f0c4}`xa0`u{1f0c5}`xa0`u{1f0c6}`xa0`u{1f0c7}`xa0";
  str += "`u{1f0c8}`xa0`u{1f0c9}`xa0`u{1f0ca}`xa0`u{1f0cb}`xa0`u{1f0cc}`xa0`u{1f0cd}`xa0`u{1f0ce}`xa0\n";
  str += "\n";
  str += "`u{1f0d1}`xa0`u{1f0d2}`xa0`u{1f0d3}`xa0`u{1f0d4}`xa0`u{1f0d5}`xa0`u{1f0d6}`xa0`u{1f0d7}`xa0";
  str += "`u{1f0d8}`xa0`u{1f0d9}`xa0`u{1f0da}`xa0`u{1f0db}`xa0`u{1f0dc}`xa0`u{1f0dd}`xa0`u{1f0de}`xa0\n";
  ELEMENT.input.value = str;
}

/* perform the requested data encoding transformation */
var trans = function() {
  var html = "";
  try{
    if(type === "ascii"){
      var buf = apgConv.Buffer.from(ELEMENT.input.value);
      
      /* decode ESCAPED format */
      var chars = apgConv.decode("ESCAPED", buf)
      html = "<h1>ASCII</h1>\n";
      html += charsToHtml(chars);
    }
    if(type === "binary"){
      var buf = apgConv.Buffer.from(ELEMENT.input.value);
      
      /* decode ESCAPED format */
      var chars = apgConv.decode("ESCAPED", buf)
      html = "<h1>BINARY</h1>\n";
      html += '<pre>';
      html += charsToHtml(chars);
      html += '</pre>';
    }
    if(type === "cherokee"){
      var buf = apgConv.Buffer.from(ELEMENT.input.value);
      
      /* decode UTF8 that has been base64 encoded */
      var chars = apgConv.decode("BASE64:UTF8", buf)
      html = "<h1>CHEROKEE</h1>\n";
      html += charsToHtml(chars);
    }
    if(type === "cards"){
      var buf = apgConv.Buffer.from(ELEMENT.input.value);
      
      /* decode ESCAPED format */
      var chars = apgConv.decode("ESCAPED", buf)
      html = "<h1>CARDS</h1>\n";
      html += charsToHtml(chars);
    }
    if(type === "base64"){
      var lines = ELEMENT.input.value.split('\n');
      var text = "";
      for(var i = 0; i < 8; i += 1){
        text += lines[i] + "<br>";
      }
      text += "<br>";
      var str = "";
      for(var i = 8; i < lines.length; i += 1){
        str += lines[i];
      }
      var buf = apgConv.Buffer.from(str);
      
      /* convert from ESCAPED format to UTF8, then base64 encode*/
      buf = apgConv.convert("ESCAPED", buf, "UTF8:BASE64");
      html = "<h1>BASE64</h1>\n";
      html += text;
      html += '<pre>';
      
      /* transform the base64 byte stream Buffer to a string with line breaks*/
      html += apgConv.transformers.base64.toString(buf);
      html += '</pre>';
    }
  }catch(e){
    html += '<span class="apg-nomatch">apgConv EXCEPTION: ';
    html += e.message;
    html += '</span>'
  }
  
  /* display the output on the web page*/
  ELEMENT.output.innerHTML = html;
}
