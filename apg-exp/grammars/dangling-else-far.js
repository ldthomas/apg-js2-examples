// Generated by JavaScript APG, Version 2.0 [`apg-js2`](https://github.com/ldthomas/apg-js2)
module.exports = function(){
"use strict";
  //```
  // SUMMARY
  //      rules = 12
  //       udts = 0
  //    opcodes = 43
  //        ABNF original opcodes
  //        ALT = 2
  //        CAT = 9
  //        REP = 5
  //        RNM = 17
  //        TLS = 6
  //        TBS = 1
  //        TRG = 3
  //        SABNF superset opcodes
  //        UDT = 0
  //        AND = 0
  //        NOT = 0
  //        BKA = 0
  //        BKN = 0
  //        BKR = 0
  //        ABG = 0
  //        AEN = 0
  // characters = [32 - 116]
  //```
  /* CALLBACK LIST PROTOTYPE (true, false or function reference) */
  this.callbacks = [];
  this.callbacks['else'] = false;
  this.callbacks['else-word'] = false;
  this.callbacks['expr'] = false;
  this.callbacks['if'] = false;
  this.callbacks['if-stmt'] = false;
  this.callbacks['if-word'] = false;
  this.callbacks['other-else'] = false;
  this.callbacks['other-stmt'] = false;
  this.callbacks['sep'] = false;
  this.callbacks['stmt'] = false;
  this.callbacks['then'] = false;
  this.callbacks['then-word'] = false;

  /* OBJECT IDENTIFIER (for internal parser use) */
  this.grammarObject = 'grammarObject';

  /* RULES */
  this.rules = [];
  this.rules[0] = {name: 'stmt', lower: 'stmt', index: 0, isBkr: false};
  this.rules[1] = {name: 'if-stmt', lower: 'if-stmt', index: 1, isBkr: false};
  this.rules[2] = {name: 'if', lower: 'if', index: 2, isBkr: false};
  this.rules[3] = {name: 'then', lower: 'then', index: 3, isBkr: false};
  this.rules[4] = {name: 'else', lower: 'else', index: 4, isBkr: false};
  this.rules[5] = {name: 'expr', lower: 'expr', index: 5, isBkr: false};
  this.rules[6] = {name: 'other-stmt', lower: 'other-stmt', index: 6, isBkr: false};
  this.rules[7] = {name: 'other-else', lower: 'other-else', index: 7, isBkr: false};
  this.rules[8] = {name: 'if-word', lower: 'if-word', index: 8, isBkr: false};
  this.rules[9] = {name: 'then-word', lower: 'then-word', index: 9, isBkr: false};
  this.rules[10] = {name: 'else-word', lower: 'else-word', index: 10, isBkr: false};
  this.rules[11] = {name: 'sep', lower: 'sep', index: 11, isBkr: false};

  /* UDTS */
  this.udts = [];

  /* OPCODES */
  /* stmt */
  this.rules[0].opcodes = [];
  this.rules[0].opcodes[0] = {type: 1, children: [1,2]};// ALT
  this.rules[0].opcodes[1] = {type: 4, index: 1};// RNM(if-stmt)
  this.rules[0].opcodes[2] = {type: 4, index: 6};// RNM(other-stmt)

  /* if-stmt */
  this.rules[1].opcodes = [];
  this.rules[1].opcodes[0] = {type: 2, children: [1,5,7]};// CAT
  this.rules[1].opcodes[1] = {type: 2, children: [2,3,4]};// CAT
  this.rules[1].opcodes[2] = {type: 4, index: 2};// RNM(if)
  this.rules[1].opcodes[3] = {type: 4, index: 5};// RNM(expr)
  this.rules[1].opcodes[4] = {type: 4, index: 3};// RNM(then)
  this.rules[1].opcodes[5] = {type: 3, min: 0, max: 1};// REP
  this.rules[1].opcodes[6] = {type: 4, index: 1};// RNM(if-stmt)
  this.rules[1].opcodes[7] = {type: 1, children: [8,11]};// ALT
  this.rules[1].opcodes[8] = {type: 2, children: [9,10]};// CAT
  this.rules[1].opcodes[9] = {type: 4, index: 4};// RNM(else)
  this.rules[1].opcodes[10] = {type: 4, index: 0};// RNM(stmt)
  this.rules[1].opcodes[11] = {type: 4, index: 7};// RNM(other-else)

  /* if */
  this.rules[2].opcodes = [];
  this.rules[2].opcodes[0] = {type: 2, children: [1,2]};// CAT
  this.rules[2].opcodes[1] = {type: 4, index: 8};// RNM(if-word)
  this.rules[2].opcodes[2] = {type: 4, index: 11};// RNM(sep)

  /* then */
  this.rules[3].opcodes = [];
  this.rules[3].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
  this.rules[3].opcodes[1] = {type: 4, index: 11};// RNM(sep)
  this.rules[3].opcodes[2] = {type: 4, index: 9};// RNM(then-word)
  this.rules[3].opcodes[3] = {type: 4, index: 11};// RNM(sep)

  /* else */
  this.rules[4].opcodes = [];
  this.rules[4].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
  this.rules[4].opcodes[1] = {type: 4, index: 11};// RNM(sep)
  this.rules[4].opcodes[2] = {type: 4, index: 10};// RNM(else-word)
  this.rules[4].opcodes[3] = {type: 4, index: 11};// RNM(sep)

  /* expr */
  this.rules[5].opcodes = [];
  this.rules[5].opcodes[0] = {type: 2, children: [1,2]};// CAT
  this.rules[5].opcodes[1] = {type: 7, string: [101]};// TLS
  this.rules[5].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
  this.rules[5].opcodes[3] = {type: 5, min: 48, max: 57};// TRG

  /* other-stmt */
  this.rules[6].opcodes = [];
  this.rules[6].opcodes[0] = {type: 2, children: [1,2]};// CAT
  this.rules[6].opcodes[1] = {type: 7, string: [115]};// TLS
  this.rules[6].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
  this.rules[6].opcodes[3] = {type: 5, min: 48, max: 57};// TRG

  /* other-else */
  this.rules[7].opcodes = [];
  this.rules[7].opcodes[0] = {type: 2, children: [1,2]};// CAT
  this.rules[7].opcodes[1] = {type: 7, string: [115]};// TLS
  this.rules[7].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
  this.rules[7].opcodes[3] = {type: 5, min: 48, max: 57};// TRG

  /* if-word */
  this.rules[8].opcodes = [];
  this.rules[8].opcodes[0] = {type: 7, string: [105,102]};// TLS

  /* then-word */
  this.rules[9].opcodes = [];
  this.rules[9].opcodes[0] = {type: 7, string: [116,104,101,110]};// TLS

  /* else-word */
  this.rules[10].opcodes = [];
  this.rules[10].opcodes[0] = {type: 7, string: [101,108,115,101]};// TLS

  /* sep */
  this.rules[11].opcodes = [];
  this.rules[11].opcodes[0] = {type: 3, min: 1, max: Infinity};// REP
  this.rules[11].opcodes[1] = {type: 6, string: [32]};// TBS

  // The `toString()` function will display the original grammar file(s) that produced these opcodes.
  this.toString = function(){
    var str = "";
    str += "stmt       = if-stmt / other-stmt\n";
    str += "if-stmt    = (if expr then) [if-stmt] (else stmt / other-else)\n";
    str += "if         = if-word sep\n";
    str += "then       = sep then-word sep\n";
    str += "else       = sep else-word sep\n";
    str += "expr       = \"E\" *%d48-57\n";
    str += "other-stmt = \"S\" *%d48-57\n";
    str += "other-else = \"S\" *%d48-57\n";
    str += "if-word    = \"if\"\n";
    str += "then-word  = \"then\"\n";
    str += "else-word  = \"else\"\n";
    str += "sep        = 1*%d32\n";
    return str;
  }
}
