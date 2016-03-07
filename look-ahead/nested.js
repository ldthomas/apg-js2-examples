// Generated by JavaScript APG, Version 2.0 [`apg-js2`](https://github.com/ldthomas/apg-js2)
module.exports = function(){
"use strict";
  //```
  // SUMMARY
  //      rules = 10
  //       udts = 0
  //    opcodes = 42
  //        ABNF original opcodes
  //        ALT = 1
  //        CAT = 8
  //        REP = 6
  //        RNM = 13
  //        TLS = 9
  //        TBS = 1
  //        TRG = 2
  //        SABNF superset opcodes
  //        UDT = 0
  //        AND = 1
  //        NOT = 1
  //        BKA = 0
  //        BKN = 0
  //        BKR = 0
  //        ABG = 0
  //        AEN = 0
  // characters = [9 - 126]
  //```
  /* CALLBACK LIST PROTOTYPE (true, false or function reference) */
  this.callbacks = [];
  this.callbacks['anbn'] = false;
  this.callbacks['anbncn'] = false;
  this.callbacks['any'] = false;
  this.callbacks['begin'] = false;
  this.callbacks['bncn'] = false;
  this.callbacks['comment'] = false;
  this.callbacks['consumeas'] = false;
  this.callbacks['end'] = false;
  this.callbacks['otherbncn'] = false;
  this.callbacks['prefix'] = false;

  /* OBJECT IDENTIFIER (for internal parser use) */
  this.grammarObject = 'grammarObject';

  /* RULES */
  this.rules = [];
  this.rules[0] = {name: 'comment', lower: 'comment', index: 0, isBkr: false};
  this.rules[1] = {name: 'begin', lower: 'begin', index: 1, isBkr: false};
  this.rules[2] = {name: 'end', lower: 'end', index: 2, isBkr: false};
  this.rules[3] = {name: 'any', lower: 'any', index: 3, isBkr: false};
  this.rules[4] = {name: 'AnBnCn', lower: 'anbncn', index: 4, isBkr: false};
  this.rules[5] = {name: 'Prefix', lower: 'prefix', index: 5, isBkr: false};
  this.rules[6] = {name: 'ConsumeAs', lower: 'consumeas', index: 6, isBkr: false};
  this.rules[7] = {name: 'AnBn', lower: 'anbn', index: 7, isBkr: false};
  this.rules[8] = {name: 'BnCn', lower: 'bncn', index: 8, isBkr: false};
  this.rules[9] = {name: 'OtherBnCn', lower: 'otherbncn', index: 9, isBkr: false};

  /* UDTS */
  this.udts = [];

  /* OPCODES */
  /* comment */
  this.rules[0].opcodes = [];
  this.rules[0].opcodes[0] = {type: 2, children: [1,2,7]};// CAT
  this.rules[0].opcodes[1] = {type: 4, index: 1};// RNM(begin)
  this.rules[0].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
  this.rules[0].opcodes[3] = {type: 2, children: [4,6]};// CAT
  this.rules[0].opcodes[4] = {type: 13};// NOT
  this.rules[0].opcodes[5] = {type: 4, index: 4};// RNM(AnBnCn)
  this.rules[0].opcodes[6] = {type: 4, index: 3};// RNM(any)
  this.rules[0].opcodes[7] = {type: 4, index: 2};// RNM(end)

  /* begin */
  this.rules[1].opcodes = [];
  this.rules[1].opcodes[0] = {type: 4, index: 7};// RNM(AnBn)

  /* end */
  this.rules[2].opcodes = [];
  this.rules[2].opcodes[0] = {type: 2, children: [1,3]};// CAT
  this.rules[2].opcodes[1] = {type: 3, min: 0, max: Infinity};// REP
  this.rules[2].opcodes[2] = {type: 7, string: [97]};// TLS
  this.rules[2].opcodes[3] = {type: 4, index: 9};// RNM(OtherBnCn)

  /* any */
  this.rules[3].opcodes = [];
  this.rules[3].opcodes[0] = {type: 1, children: [1,2,3]};// ALT
  this.rules[3].opcodes[1] = {type: 5, min: 32, max: 126};// TRG
  this.rules[3].opcodes[2] = {type: 5, min: 9, max: 10};// TRG
  this.rules[3].opcodes[3] = {type: 6, string: [13]};// TBS

  /* AnBnCn */
  this.rules[4].opcodes = [];
  this.rules[4].opcodes[0] = {type: 2, children: [1,3,4]};// CAT
  this.rules[4].opcodes[1] = {type: 12};// AND
  this.rules[4].opcodes[2] = {type: 4, index: 5};// RNM(Prefix)
  this.rules[4].opcodes[3] = {type: 4, index: 6};// RNM(ConsumeAs)
  this.rules[4].opcodes[4] = {type: 4, index: 8};// RNM(BnCn)

  /* Prefix */
  this.rules[5].opcodes = [];
  this.rules[5].opcodes[0] = {type: 2, children: [1,2]};// CAT
  this.rules[5].opcodes[1] = {type: 4, index: 7};// RNM(AnBn)
  this.rules[5].opcodes[2] = {type: 7, string: [99]};// TLS

  /* ConsumeAs */
  this.rules[6].opcodes = [];
  this.rules[6].opcodes[0] = {type: 3, min: 0, max: Infinity};// REP
  this.rules[6].opcodes[1] = {type: 7, string: [97]};// TLS

  /* AnBn */
  this.rules[7].opcodes = [];
  this.rules[7].opcodes[0] = {type: 2, children: [1,2,4]};// CAT
  this.rules[7].opcodes[1] = {type: 7, string: [97]};// TLS
  this.rules[7].opcodes[2] = {type: 3, min: 0, max: 1};// REP
  this.rules[7].opcodes[3] = {type: 4, index: 7};// RNM(AnBn)
  this.rules[7].opcodes[4] = {type: 7, string: [98]};// TLS

  /* BnCn */
  this.rules[8].opcodes = [];
  this.rules[8].opcodes[0] = {type: 2, children: [1,2,4]};// CAT
  this.rules[8].opcodes[1] = {type: 7, string: [98]};// TLS
  this.rules[8].opcodes[2] = {type: 3, min: 0, max: 1};// REP
  this.rules[8].opcodes[3] = {type: 4, index: 8};// RNM(BnCn)
  this.rules[8].opcodes[4] = {type: 7, string: [99]};// TLS

  /* OtherBnCn */
  this.rules[9].opcodes = [];
  this.rules[9].opcodes[0] = {type: 2, children: [1,2,4]};// CAT
  this.rules[9].opcodes[1] = {type: 7, string: [98]};// TLS
  this.rules[9].opcodes[2] = {type: 3, min: 0, max: 1};// REP
  this.rules[9].opcodes[3] = {type: 4, index: 9};// RNM(OtherBnCn)
  this.rules[9].opcodes[4] = {type: 7, string: [99]};// TLS

  // The `toString()` function will display the original grammar file(s) that produced these opcodes.
  this.toString = function(){
    var str = "";
    str += ";\n";
    str += "; make-shift example to verify suppression of AST\n";
    str += "; within nested syntactic predicates\n";
    str += "; the \"!anbncn\" term expands to \"!(&prefix consumeas bncn)\"\n";
    str += ";\n";
    str += "; should accept strings like:\n";
    str += "; \"aabb aaaaa aaabbbccc\n";
    str += ";\n";
    str += "comment = begin *(!anbncn any) end\n";
    str += "begin = anbn\n";
    str += "end = *\"a\" OtherBnCn\n";
    str += "any = %d32-126 / %d9-10 / %d13\n";
    str += "AnBnCn    = &Prefix ConsumeAs BnCn\n";
    str += "Prefix    = AnBn \"c\"\n";
    str += "ConsumeAs = *\"a\"\n";
    str += "AnBn      = \"a\" [AnBn] \"b\"\n";
    str += "BnCn      = \"b\" [BnCn] \"c\"\n";
    str += "OtherBnCn      = \"b\" [OtherBnCn] \"c\"\n";
    return str;
  }
}