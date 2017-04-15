// This is a very minimal example of using **apg-api** in a web page.
/* the input and output elements */
var ELEMENT = {
  obj : null,
  grammar : null,
  input : null,
  output : null
}
/* on page load, get the input and output elements and remember them */
var onload = function() {
  ELEMENT.grammar = document.getElementById("grammar");
  ELEMENT.input = document.getElementById("input");
  ELEMENT.output = document.getElementById("output");
  var float = "";
  float += 'float    = [sign] decimal [exponent]\n';
  float += 'sign     = "+" / "-"\n';
  float += 'decimal  = integer [dot [fraction]]\n';
  float += '           / dot fraction\n';
  float += 'integer  = 1*%d48-57\n';
  float += 'dot      = "."\n';
  float += 'fraction = 1*%d48-57\n'; 
  float += 'exponent = "e" [esign] exp\n';
  float += 'esign    = "+" / "-"\n';
  float += 'exp      = 1*%d48-57\n';
  ELEMENT.grammar.value = float;
  ELEMENT.input.value = "123.0";
}

/* the generate button action */
var generate = function() {
  var api = new ApgApi(ELEMENT.grammar.value);
  api.generate();
  if (api.errors.length) {
    ELEMENT.output.innerHTML = "<span class='apg-nomatch'>grammar has errors</span>"
    return;
  }
  var html = "<pre>\n";
  html += api.toSource();
  html += "</pre>\n"
  ELEMENT.output.innerHTML = html;
  ELEMENT.obj = api.toObject();
}

/* the parse button action */
var parse = function() {
  var parser = new apglib.parser();
  var result = parser.parse(ELEMENT.obj, 0, ELEMENT.input.value);
  var html = apglib.utils.parserResultToHtml(result, "web page apg-api example");
  ELEMENT.output.innerHTML = html;
}
