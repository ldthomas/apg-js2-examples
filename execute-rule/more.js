// Generated by JavaScript APG, Version 2.0 [`apg-js2`](https://github.com/ldthomas/apg-js2)
module.exports = function(){
"use strict";
  //```
  // SUMMARY
  //      rules = 2
  //       udts = 1
  //    opcodes = 4
  //        ABNF original opcodes
  //        ALT = 0
  //        CAT = 1
  //        REP = 0
  //        RNM = 0
  //        TLS = 2
  //        TBS = 0
  //        TRG = 0
  //        SABNF superset opcodes
  //        UDT = 1
  //        AND = 0
  //        NOT = 0
  //        BKA = 0
  //        BKN = 0
  //        BKR = 0
  //        ABG = 0
  //        AEN = 0
  // characters = [32 - 116] + user defined
  //```
  /* CALLBACK LIST PROTOTYPE (true, false or function reference) */
  this.callbacks = [];
  this.callbacks['more'] = false;
  this.callbacks['start'] = false;
  this.callbacks['u_more'] = false;

  /* OBJECT IDENTIFIER (for internal parser use) */
  this.grammarObject = 'grammarObject';

  /* RULES */
  this.rules = [];
  this.rules[0] = {name: 'start', lower: 'start', index: 0, isBkr: false};
  this.rules[1] = {name: 'more', lower: 'more', index: 1, isBkr: false};

  /* UDTS */
  this.udts = [];
  this.udts[0] = {name: 'u_more', lower: 'u_more', index: 0, empty: false, isBkr: false};

  /* OPCODES */
  /* start */
  this.rules[0].opcodes = [];
  this.rules[0].opcodes[0] = {type: 2, children: [1,2]};// CAT
  this.rules[0].opcodes[1] = {type: 7, string: [115,116,97,114,116]};// TLS
  this.rules[0].opcodes[2] = {type: 11, empty: false, index: 0};// UDT(u_more)

  /* more */
  this.rules[1].opcodes = [];
  this.rules[1].opcodes[0] = {type: 7, string: [32,109,111,114,101]};// TLS

  // The `toString()` function will display the original grammar file(s) that produced these opcodes.
  this.toString = function(){
    var str = "";
    str += "start = \"start\" u_more\n";
    str += "more = \" more\"\n";
    return str;
  }
}
