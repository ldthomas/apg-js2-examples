module.exports = function(){
"use strict";

    // SUMMARY
    //      rules = 10
    //       udts = 0
    //    opcodes = 42
    //        ALT = 1
    //        CAT = 8
    //        RNM = 13
    //        UDT = 0
    //        REP = 6
    //        AND = 1
    //        NOT = 1
    //        TLS = 9
    //        TBS = 1
    //        TRG = 2
    // characters = [9 - 126]

    // CALLBACK LIST PROTOTYPE (true, false or function reference)
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

    // OBJECT IDENTIFIER (for internal parser use)
    this.grammarObject = 'grammarObject';

    // RULES
    this.rules = [];
    this.rules[0] = {name: 'comment', lower: 'comment', index: 0};
    this.rules[1] = {name: 'begin', lower: 'begin', index: 1};
    this.rules[2] = {name: 'end', lower: 'end', index: 2};
    this.rules[3] = {name: 'any', lower: 'any', index: 3};
    this.rules[4] = {name: 'AnBnCn', lower: 'anbncn', index: 4};
    this.rules[5] = {name: 'Prefix', lower: 'prefix', index: 5};
    this.rules[6] = {name: 'ConsumeAs', lower: 'consumeas', index: 6};
    this.rules[7] = {name: 'AnBn', lower: 'anbn', index: 7};
    this.rules[8] = {name: 'BnCn', lower: 'bncn', index: 8};
    this.rules[9] = {name: 'OtherBnCn', lower: 'otherbncn', index: 9};

    // UDTS
    this.udts = [];

    // OPCODES
    // comment
    this.rules[0].opcodes = [];
    this.rules[0].opcodes[0] = {type: 2, children: [1,2,7]};// CAT
    this.rules[0].opcodes[1] = {type: 4, index: 1};// RNM(begin)
    this.rules[0].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[0].opcodes[3] = {type: 2, children: [4,6]};// CAT
    this.rules[0].opcodes[4] = {type: 7};// NOT
    this.rules[0].opcodes[5] = {type: 4, index: 4};// RNM(AnBnCn)
    this.rules[0].opcodes[6] = {type: 4, index: 3};// RNM(any)
    this.rules[0].opcodes[7] = {type: 4, index: 2};// RNM(end)

    // begin
    this.rules[1].opcodes = [];
    this.rules[1].opcodes[0] = {type: 4, index: 7};// RNM(AnBn)

    // end
    this.rules[2].opcodes = [];
    this.rules[2].opcodes[0] = {type: 2, children: [1,3]};// CAT
    this.rules[2].opcodes[1] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[2].opcodes[2] = {type: 9, string: [97]};// TLS
    this.rules[2].opcodes[3] = {type: 4, index: 9};// RNM(OtherBnCn)

    // any
    this.rules[3].opcodes = [];
    this.rules[3].opcodes[0] = {type: 1, children: [1,2,3]};// ALT
    this.rules[3].opcodes[1] = {type: 8, min: 32, max: 126};// TRG
    this.rules[3].opcodes[2] = {type: 8, min: 9, max: 10};// TRG
    this.rules[3].opcodes[3] = {type: 10, string: [13]};// TBS

    // AnBnCn
    this.rules[4].opcodes = [];
    this.rules[4].opcodes[0] = {type: 2, children: [1,3,4]};// CAT
    this.rules[4].opcodes[1] = {type: 6};// AND
    this.rules[4].opcodes[2] = {type: 4, index: 5};// RNM(Prefix)
    this.rules[4].opcodes[3] = {type: 4, index: 6};// RNM(ConsumeAs)
    this.rules[4].opcodes[4] = {type: 4, index: 8};// RNM(BnCn)

    // Prefix
    this.rules[5].opcodes = [];
    this.rules[5].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[5].opcodes[1] = {type: 4, index: 7};// RNM(AnBn)
    this.rules[5].opcodes[2] = {type: 9, string: [99]};// TLS

    // ConsumeAs
    this.rules[6].opcodes = [];
    this.rules[6].opcodes[0] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[6].opcodes[1] = {type: 9, string: [97]};// TLS

    // AnBn
    this.rules[7].opcodes = [];
    this.rules[7].opcodes[0] = {type: 2, children: [1,2,4]};// CAT
    this.rules[7].opcodes[1] = {type: 9, string: [97]};// TLS
    this.rules[7].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[7].opcodes[3] = {type: 4, index: 7};// RNM(AnBn)
    this.rules[7].opcodes[4] = {type: 9, string: [98]};// TLS

    // BnCn
    this.rules[8].opcodes = [];
    this.rules[8].opcodes[0] = {type: 2, children: [1,2,4]};// CAT
    this.rules[8].opcodes[1] = {type: 9, string: [98]};// TLS
    this.rules[8].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[8].opcodes[3] = {type: 4, index: 8};// RNM(BnCn)
    this.rules[8].opcodes[4] = {type: 9, string: [99]};// TLS

    // OtherBnCn
    this.rules[9].opcodes = [];
    this.rules[9].opcodes[0] = {type: 2, children: [1,2,4]};// CAT
    this.rules[9].opcodes[1] = {type: 9, string: [98]};// TLS
    this.rules[9].opcodes[2] = {type: 3, min: 0, max: 1};// REP
    this.rules[9].opcodes[3] = {type: 4, index: 9};// RNM(OtherBnCn)
    this.rules[9].opcodes[4] = {type: 9, string: [99]};// TLS
}

// INPUT GRAMMAR FILE(s)
//
// ;
// ; make-shift example to verify suppression of AST
// ; within nested syntactic predicates
// ; the "!anbncn" term expands to "!(&prefix consumeas bncn)"
// ;
// ; should accept strings like:
// ; "aabb aaaaa aaabbbccc
// ;
// comment = begin *(!anbncn any) end
// begin = anbn
// end = *"a" OtherBnCn
// any = %d32-126 / %d9-10 / %d13
// AnBnCn    = &Prefix ConsumeAs BnCn
// Prefix    = AnBn "c"
// ConsumeAs = *"a"
// AnBn      = "a" [AnBn] "b"
// BnCn      = "b" [BnCn] "c"
// OtherBnCn      = "b" [OtherBnCn] "c"
