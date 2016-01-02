// Generated by JavaScript APG, Version 2.0 [`apg-js2`](https://github.com/ldthomas/apg-js2)
module.exports = function(){
"use strict";
  //```
  // SUMMARY
  //      rules = 2
  //       udts = 0
  //    opcodes = 8
  //        ALT = 1
  //        CAT = 1
  //        RNM = 1
  //        UDT = 0
  //        BKR = 3
  //        REP = 0
  //        AND = 0
  //        NOT = 0
  //        BKA = 0
  //        BKN = 0
  //        TLS = 2
  //        TBS = 0
  //        TRG = 0
  // characters = [120 - 121]
  //```
  /* CALLBACK LIST PROTOTYPE (true, false or function reference) */
  this.callbacks = [];
  this.callbacks['a'] = false;
  this.callbacks['s'] = false;

  /* OBJECT IDENTIFIER (for internal parser use) */
  this.grammarObject = 'grammarObject';

  /* RULES */
  this.rules = [];
  this.rules[0] = {name: 'S', lower: 's', index: 0, isBkr: false, hasBkr: true};
  this.rules[1] = {name: 'A', lower: 'a', index: 1, isBkr: true, hasBkr: false};

  /* UDTS */
  this.udts = [];

  /* OPCODES */
  /* S */
  this.rules[0].opcodes = [];
  this.rules[0].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
  this.rules[0].opcodes[1] = {type: 4, index: 1};// RNM(A)
  this.rules[0].opcodes[2] = {type: 11, index: 1, lower: 'a', insensitive: true};// BKR(\%iA)
  this.rules[0].opcodes[3] = {type: 11, index: 1, lower: 'a', insensitive: true};// BKR(\%iA)
  this.rules[0].opcodes[4] = {type: 11, index: 1, lower: 'a', insensitive: false};// BKR(\%sA)

  /* A */
  this.rules[1].opcodes = [];
  this.rules[1].opcodes[0] = {type: 1, children: [1,2]};// ALT
  this.rules[1].opcodes[1] = {type: 9, string: [120]};// TLS
  this.rules[1].opcodes[2] = {type: 9, string: [121]};// TLS

  // The `toString()` function will display the original grammar file(s) that produced these opcodes.
  this.toString = function(){
    var str = "";
    str += "S = A \\A \\%iA \\%sA\n";
    str += "A = \"x\" / \"y\"\n";
    return str;
  }
}
