// Generated by JavaScript APG, Version 2.0 [`apg-js2`](https://github.com/ldthomas/apg-js2)
module.exports = function(){
"use strict";
  //```
  // SUMMARY
  //      rules = 1
  //       udts = 0
  //    opcodes = 6
  //        ALT = 0
  //        CAT = 1
  //        RNM = 0
  //        UDT = 0
  //        BKR = 0
  //        REP = 0
  //        AND = 1
  //        NOT = 0
  //        BKA = 1
  //        BKN = 0
  //        TLS = 1
  //        TBS = 0
  //        TRG = 0
  // characters = [97 - 99]
  //```
  /* CALLBACK LIST PROTOTYPE (true, false or function reference) */
  this.callbacks = [];
  this.callbacks['rule'] = false;

  /* OBJECT IDENTIFIER (for internal parser use) */
  this.grammarObject = 'grammarObject';

  /* RULES */
  this.rules = [];
  this.rules[0] = {name: 'rule', lower: 'rule', index: 0, isBkr: false};

  /* UDTS */
  this.udts = [];

  /* OPCODES */
  /* rule */
  this.rules[0].opcodes = [];
  this.rules[0].opcodes[0] = {type: 2, children: [1,3,4]};// CAT
  this.rules[0].opcodes[1] = {type: 15};// BKA
  this.rules[0].opcodes[2] = {type: 17};// ABG(%^)
  this.rules[0].opcodes[3] = {type: 7, string: [97,98,99]};// TLS
  this.rules[0].opcodes[4] = {type: 12};// AND
  this.rules[0].opcodes[5] = {type: 18};// AEN(%$)

  // The `toString()` function will display the original grammar file(s) that produced these opcodes.
  this.toString = function(){
    var str = "";
    str += "rule = &&%^ \"abc\" &%$\n";
    return str;
  }
}
