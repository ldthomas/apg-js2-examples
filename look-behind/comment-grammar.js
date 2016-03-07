// Generated by JavaScript APG, Version 2.0 [`apg-js2`](https://github.com/ldthomas/apg-js2)
module.exports = function(){
"use strict";
  //```
  // SUMMARY
  //      rules = 8
  //       udts = 0
  //    opcodes = 36
  //        ABNF original opcodes
  //        ALT = 2
  //        CAT = 7
  //        REP = 3
  //        RNM = 13
  //        TLS = 4
  //        TBS = 1
  //        TRG = 2
  //        SABNF superset opcodes
  //        UDT = 0
  //        AND = 0
  //        NOT = 1
  //        BKA = 2
  //        BKN = 1
  //        BKR = 0
  //        ABG = 0
  //        AEN = 0
  // characters = [9 - 126]
  //```
  /* CALLBACK LIST PROTOTYPE (true, false or function reference) */
  this.callbacks = [];
  this.callbacks['any'] = false;
  this.callbacks['begin'] = false;
  this.callbacks['end'] = false;
  this.callbacks['left-to-right'] = false;
  this.callbacks['ltr-comment'] = false;
  this.callbacks['right-to-left'] = false;
  this.callbacks['rtl-comment'] = false;
  this.callbacks['rule'] = false;

  /* OBJECT IDENTIFIER (for internal parser use) */
  this.grammarObject = 'grammarObject';

  /* RULES */
  this.rules = [];
  this.rules[0] = {name: 'rule', lower: 'rule', index: 0, isBkr: false};
  this.rules[1] = {name: 'left-to-right', lower: 'left-to-right', index: 1, isBkr: false};
  this.rules[2] = {name: 'right-to-left', lower: 'right-to-left', index: 2, isBkr: false};
  this.rules[3] = {name: 'ltr-comment', lower: 'ltr-comment', index: 3, isBkr: false};
  this.rules[4] = {name: 'rtl-comment', lower: 'rtl-comment', index: 4, isBkr: false};
  this.rules[5] = {name: 'begin', lower: 'begin', index: 5, isBkr: false};
  this.rules[6] = {name: 'end', lower: 'end', index: 6, isBkr: false};
  this.rules[7] = {name: 'any', lower: 'any', index: 7, isBkr: false};

  /* UDTS */
  this.udts = [];

  /* OPCODES */
  /* rule */
  this.rules[0].opcodes = [];
  this.rules[0].opcodes[0] = {type: 2, children: [1,3]};// CAT
  this.rules[0].opcodes[1] = {type: 3, min: 14, max: 14};// REP
  this.rules[0].opcodes[2] = {type: 4, index: 7};// RNM(any)
  this.rules[0].opcodes[3] = {type: 1, children: [4,5]};// ALT
  this.rules[0].opcodes[4] = {type: 4, index: 1};// RNM(left-to-right)
  this.rules[0].opcodes[5] = {type: 4, index: 2};// RNM(right-to-left)

  /* left-to-right */
  this.rules[1].opcodes = [];
  this.rules[1].opcodes[0] = {type: 2, children: [1,3]};// CAT
  this.rules[1].opcodes[1] = {type: 15};// BKA
  this.rules[1].opcodes[2] = {type: 4, index: 3};// RNM(ltr-comment)
  this.rules[1].opcodes[3] = {type: 7, string: [36]};// TLS

  /* right-to-left */
  this.rules[2].opcodes = [];
  this.rules[2].opcodes[0] = {type: 2, children: [1,3]};// CAT
  this.rules[2].opcodes[1] = {type: 15};// BKA
  this.rules[2].opcodes[2] = {type: 4, index: 4};// RNM(rtl-comment)
  this.rules[2].opcodes[3] = {type: 7, string: [36]};// TLS

  /* ltr-comment */
  this.rules[3].opcodes = [];
  this.rules[3].opcodes[0] = {type: 2, children: [1,2,7]};// CAT
  this.rules[3].opcodes[1] = {type: 4, index: 5};// RNM(begin)
  this.rules[3].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
  this.rules[3].opcodes[3] = {type: 2, children: [4,6]};// CAT
  this.rules[3].opcodes[4] = {type: 13};// NOT
  this.rules[3].opcodes[5] = {type: 4, index: 6};// RNM(end)
  this.rules[3].opcodes[6] = {type: 4, index: 7};// RNM(any)
  this.rules[3].opcodes[7] = {type: 4, index: 6};// RNM(end)

  /* rtl-comment */
  this.rules[4].opcodes = [];
  this.rules[4].opcodes[0] = {type: 2, children: [1,2,7]};// CAT
  this.rules[4].opcodes[1] = {type: 4, index: 5};// RNM(begin)
  this.rules[4].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
  this.rules[4].opcodes[3] = {type: 2, children: [4,5]};// CAT
  this.rules[4].opcodes[4] = {type: 4, index: 7};// RNM(any)
  this.rules[4].opcodes[5] = {type: 16};// BKN
  this.rules[4].opcodes[6] = {type: 4, index: 5};// RNM(begin)
  this.rules[4].opcodes[7] = {type: 4, index: 6};// RNM(end)

  /* begin */
  this.rules[5].opcodes = [];
  this.rules[5].opcodes[0] = {type: 7, string: [47,42]};// TLS

  /* end */
  this.rules[6].opcodes = [];
  this.rules[6].opcodes[0] = {type: 7, string: [42,47]};// TLS

  /* any */
  this.rules[7].opcodes = [];
  this.rules[7].opcodes[0] = {type: 1, children: [1,2,3]};// ALT
  this.rules[7].opcodes[1] = {type: 5, min: 32, max: 126};// TRG
  this.rules[7].opcodes[2] = {type: 5, min: 9, max: 10};// TRG
  this.rules[7].opcodes[3] = {type: 6, string: [13]};// TBS

  // The `toString()` function will display the original grammar file(s) that produced these opcodes.
  this.toString = function(){
    var str = "";
    str += "rule = 14any (left-to-right / right-to-left)\n";
    str += "left-to-right = &&ltr-comment \"$\"\n";
    str += "right-to-left = &&rtl-comment \"$\"\n";
    str += "ltr-comment = begin *(!end any) end\n";
    str += "rtl-comment = begin *(any !!begin) end\n";
    str += "begin = \"/*\"\n";
    str += "end = \"*/\"\n";
    str += "any = %d32-126 / %d9-10 / %d13\n";
    return str;
  }
}