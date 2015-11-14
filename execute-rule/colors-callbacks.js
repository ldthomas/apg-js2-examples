// The callback functions for the `colors-app` application.
// For the most part, these functions simply write the matched phrases to the console.
"use strict;"
var apglib = require("apg-lib");
var id = apglib.ids;
// The start rule. Initialize the data object.
exports.startCallback = function(result, chars, phraseIndex, data) {
  switch (result.state) {
  case id.ACTIVE:
    console.log("startCallback: start up: ACTIVE");
    data.length = 0;
    break;
  case id.EMPTY:
    console.log("startCallback: done: EMPTY");
    break;
  case id.MATCH:
    console.log("startCallback: done: MATCH");
    break;
  case id.NOMATCH:
    console.log("startCallback: done: NOMATCH");
    break;
  }
  if(result.state !== id.ACTIVE){
    console.log("startCallback: done: data found");
    data.forEach(function(dat){
      console.log("startCallback: " + dat);
    });
  }
}
// The *color* callback for the monitoring-only demonstration.
exports.monitorCallback = function(result, chars, phraseIndex, data) {
  switch (result.state) {
  case id.ACTIVE:
    console.log("colorCallback: monitor only: just note the state of the call");
    console.log("colorCallback: monitor only: ACTIVE");
    break;
  case id.EMPTY:
    console.log("colorCallback: monitor only: EMPTY");
    break;
  case id.MATCH:
    console.log("colorCallback: monitor only: MATCH");
    data.push(apglib.utils.charsToString(chars, phraseIndex, result.phraseLength));
    break;
  case id.NOMATCH:
    console.log("colorCallback: monitor only: NOMATCH");
    break;
  }
}
// The *color* callback for the parsing modification demonstration.
exports.modifyCallback = function(result, chars, phraseIndex, data) {
  switch (result.state) {
  case id.ACTIVE:
    console.log("colorCallback: modify the result: fail no matter what the input is")
    // By returning the `NOMATCH` state, indicate that no phrase was matched.
    // Note that by returning any non-`ACTIVE` state, this `RNM` operator behaves
    // exactly like a `UDT`. That is it matches any phrase the user likes,
    // ignoring the phrases defined by the SABNF grammar.
    // In fact, `UDT`s were originally developed to clean up the clumsiness of 
    // doing it this way.
    result.state = id.NOMATCH;
    result.phraseLength = 0;
    break;
  case id.EMPTY:
    console.log("colorCallback: modify: EMPTY: should never see this")
    break;
  case id.MATCH:
    console.log("colorCallback: modify: MATCH: should never see this")
    break;
  case id.NOMATCH:
    console.log("colorCallback: modify: NOMATCH: should never see this")
    break;
  }
}
// The *color* callback for calling a `UDT` from a rule name.
exports.callUdtCallback = function(result, chars, phraseIndex, data) {
  switch (result.state) {
  case id.ACTIVE:
    while(true){
      // Calls the `UDT` with index 0 (the first one defined in the grammar - 
      // see [`colors.js`](./colors.html))
      result.evaluateUdt(0, phraseIndex, result);
      if(result.state === id.MATCH){
        break;
      }
      // Calls the `UDT` with index 1.
      result.evaluateUdt(1, phraseIndex, result);
      if(result.state === id.MATCH){
        break;
      }
      // Calls the `UDT` with index 2.
      result.evaluateUdt(2, phraseIndex, result);
      if(result.state === id.MATCH){
        break;
      }
      // Calls the `UDT` with index 3.
      result.evaluateUdt(3, phraseIndex, result);
      if(result.state === id.MATCH){
        break;
      }
      break;
    }
    if(result.state === id.MATCH){
      console.log("colorCallback: call evaluateUdt() MATCH")
      data.push(apglib.utils.charsToString(chars, phraseIndex, result.phraseLength));
    }else{
      console.log("colorCallback: call evaluateUdt() NOMATCH")
    }
    break;
  case id.EMPTY:
    console.log("colorCallback: evalutateUdt(): EMPTY: should never see this")
    break;
  case id.MATCH:
    console.log("colorCallback: evalutateUdt(): MATCH: should never see this")
    break;
  case id.NOMATCH:
    console.log("colorCallback: evalutateUdt(): NOMATCH: should never see this")
    break;
  }
}
// The `UDT` callback functions:
exports.u_redCallback = function(result, chars, phraseIndex, data) {
  result.state = id.NOMATCH;
  result.phraseLength = 0;
  if (phraseIndex + 3 <= chars.length) {
    if ((chars[phraseIndex] === 114) && (chars[phraseIndex + 1] === 101)
        && (chars[phraseIndex + 2] === 100)) {
      result.state = id.MATCH;
      result.phraseLength = 3;
    }
  }
}
exports.u_whiteCallback = function(result, chars, phraseIndex, data) {
  result.state = id.NOMATCH;
  result.phraseLength = 0;
  if (phraseIndex + 5 <= chars.length) {
    if ((chars[phraseIndex] === 119)
        && (chars[phraseIndex + 1] === 104)
        && (chars[phraseIndex + 2] === 105)
        && (chars[phraseIndex + 3] === 116)
        && (chars[phraseIndex + 4] === 101)) {
      result.state = id.MATCH;
      result.phraseLength = 5;
    }
  }
}
exports.u_blueCallback = function(result, chars, phraseIndex, data) {
  result.state = id.NOMATCH;
  result.phraseLength = 0;
  if (phraseIndex + 4 <= chars.length) {
    if ((chars[phraseIndex] === 98)
        && (chars[phraseIndex + 1] === 108)
        && (chars[phraseIndex + 2] === 117)
        && (chars[phraseIndex + 3] === 101)) {
      result.state = id.MATCH;
      result.phraseLength = 4;
    }
  }
}
exports.u_yellowCallback = function(result, chars, phraseIndex, data) {
  result.state = id.NOMATCH;
  result.phraseLength = 0;
  if (phraseIndex + 6 <= chars.length) {
    if ((chars[phraseIndex] === 121)
        && (chars[phraseIndex + 1] === 101)
        && (chars[phraseIndex + 2] === 108)
        && (chars[phraseIndex + 3] === 108)
        && (chars[phraseIndex + 4] === 111)
        && (chars[phraseIndex + 5] === 119)) {
      result.state = id.MATCH;
      result.phraseLength = 6;
    }
  }
}
