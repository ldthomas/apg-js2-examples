"use strict;"
var apglib = require("apg-lib");
var id = apglib.ids;

// rule name, RNM, callbacks
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
exports.modifyCallback = function(result, chars, phraseIndex, data) {
  switch (result.state) {
  case id.ACTIVE:
    console.log("colorCallback: modify the result: fail no matter what the input is")
    result.state = id.NOMATCH;
    result.phraseLength = 0;
    break;
  case id.EMPTY:
    console.log("colorCallback: monitor only: EMPTY: should never see this")
    break;
  case id.MATCH:
    console.log("colorCallback: monitor only: MATCH: should never see this")
    break;
  case id.NOMATCH:
    console.log("colorCallback: monitor only: NOMATCH: should never see this")
    break;
  }
}
exports.callUdtCallback = function(result, chars, phraseIndex, data) {
  switch (result.state) {
  case id.ACTIVE:
    while(true){
      result.evalUdt(0, phraseIndex, result);
      if(result.state === id.MATCH){
        break;
      }
      result.evalUdt(1, phraseIndex, result);
      if(result.state === id.MATCH){
        break;
      }
      result.evalUdt(2, phraseIndex, result);
      if(result.state === id.MATCH){
        break;
      }
      result.evalUdt(3, phraseIndex, result);
      if(result.state === id.MATCH){
        break;
      }
      break;
    }
    if(result.state === id.MATCH){
      console.log("colorCallback: call evalUdt() MATCH")
      data.push(apglib.utils.charsToString(chars, phraseIndex, result.phraseLength));
    }else{
      console.log("colorCallback: call evalUdt() NOMATCH")
    }
    break;
  case id.EMPTY:
    console.log("colorCallback: monitor only: EMPTY: should never see this")
    break;
  case id.MATCH:
    console.log("colorCallback: monitor only: MATCH: should never see this")
    break;
  case id.NOMATCH:
    console.log("colorCallback: monitor only: NOMATCH: should never see this")
    break;
  }
}
// UDT callbacks
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
