// Generated by JavaScript APG, Version 2.0 [`apg-js2`](https://github.com/ldthomas/apg-js2)
module.exports = function(){
"use strict";
  //```
  // SUMMARY
  //      rules = 6
  //       udts = 0
  //    opcodes = 16
  //        ABNF original opcodes
  //        ALT = 1
  //        CAT = 2
  //        REP = 3
  //        RNM = 7
  //        TLS = 1
  //        TBS = 0
  //        TRG = 1
  //        SABNF superset opcodes
  //        UDT = 0
  //        AND = 0
  //        NOT = 0
  //        BKA = 0
  //        BKN = 1
  //        BKR = 0
  //        ABG = 0
  //        AEN = 0
  // characters = [32 - 126]
  //```
  /* CALLBACK LIST PROTOTYPE (true, false or function reference) */
  this.callbacks = [];
  this.callbacks['begin-comment'] = false;
  this.callbacks['comment-text'] = false;
  this.callbacks['line'] = false;
  this.callbacks['other-text'] = false;
  this.callbacks['text'] = false;
  this.callbacks['vchar'] = false;

  /* OBJECT IDENTIFIER (for internal parser use) */
  this.grammarObject = 'grammarObject';

  /* RULES */
  this.rules = [];
  this.rules[0] = {name: 'line', lower: 'line', index: 0, isBkr: false};
  this.rules[1] = {name: 'begin-comment', lower: 'begin-comment', index: 1, isBkr: false};
  this.rules[2] = {name: 'text', lower: 'text', index: 2, isBkr: false};
  this.rules[3] = {name: 'comment-text', lower: 'comment-text', index: 3, isBkr: false};
  this.rules[4] = {name: 'other-text', lower: 'other-text', index: 4, isBkr: false};
  this.rules[5] = {name: 'vchar', lower: 'vchar', index: 5, isBkr: false};

  /* UDTS */
  this.udts = [];

  /* OPCODES */
  /* line */
  this.rules[0].opcodes = [];
  this.rules[0].opcodes[0] = {type: 2, children: [1,3]};// CAT
  this.rules[0].opcodes[1] = {type: 3, min: 0, max: 1};// REP
  this.rules[0].opcodes[2] = {type: 4, index: 1};// RNM(begin-comment)
  this.rules[0].opcodes[3] = {type: 4, index: 2};// RNM(text)

  /* begin-comment */
  this.rules[1].opcodes = [];
  this.rules[1].opcodes[0] = {type: 7, string: [47,47]};// TLS

  /* text */
  this.rules[2].opcodes = [];
  this.rules[2].opcodes[0] = {type: 1, children: [1,2]};// ALT
  this.rules[2].opcodes[1] = {type: 4, index: 4};// RNM(other-text)
  this.rules[2].opcodes[2] = {type: 4, index: 3};// RNM(comment-text)

  /* comment-text */
  this.rules[3].opcodes = [];
  this.rules[3].opcodes[0] = {type: 3, min: 1, max: Infinity};// REP
  this.rules[3].opcodes[1] = {type: 4, index: 5};// RNM(vchar)

  /* other-text */
  this.rules[4].opcodes = [];
  this.rules[4].opcodes[0] = {type: 2, children: [1,3]};// CAT
  this.rules[4].opcodes[1] = {type: 16};// BKN
  this.rules[4].opcodes[2] = {type: 4, index: 1};// RNM(begin-comment)
  this.rules[4].opcodes[3] = {type: 3, min: 1, max: Infinity};// REP
  this.rules[4].opcodes[4] = {type: 4, index: 5};// RNM(vchar)

  /* vchar */
  this.rules[5].opcodes = [];
  this.rules[5].opcodes[0] = {type: 5, min: 32, max: 126};// TRG

  // The `toString()` function will display the original grammar file(s) that produced these opcodes.
  this.toString = function(){
    var str = "";
    str += "line = [begin-comment] text\n";
    str += "begin-comment = \"//\"\n";
    str += "text = other-text / comment-text\n";
    str += "comment-text = 1*vchar\n";
    str += "other-text = !!begin-comment 1*vchar\n";
    str += "vchar = %d32-126\n";
    return str;
  }
}
