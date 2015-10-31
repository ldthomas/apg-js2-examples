module.exports = function(){
"use strict";

    // SUMMARY
    //      rules = 6
    //       udts = 1
    //    opcodes = 16
    //        ALT = 0
    //        CAT = 2
    //        RNM = 6
    //        UDT = 1
    //        REP = 1
    //        AND = 0
    //        NOT = 0
    //        TLS = 3
    //        TBS = 0
    //        TRG = 3
    // characters = [40 - 57] + user defined

    // CALLBACK LIST PROTOTYPE (true, false or function reference)
    this.callbacks = [];
    this.callbacks['area-code'] = false;
    this.callbacks['digit'] = false;
    this.callbacks['gt-2'] = false;
    this.callbacks['not-9'] = false;
    this.callbacks['phone-number'] = false;
    this.callbacks['subscriber'] = false;
    this.callbacks['u_office'] = false;

    // OBJECT IDENTIFIER (for internal parser use)
    this.grammarObject = 'grammarObject';

    // RULES
    this.rules = [];
    this.rules[0] = {name: 'phone-number', lower: 'phone-number', index: 0};
    this.rules[1] = {name: 'area-code', lower: 'area-code', index: 1};
    this.rules[2] = {name: 'subscriber', lower: 'subscriber', index: 2};
    this.rules[3] = {name: 'gt-2', lower: 'gt-2', index: 3};
    this.rules[4] = {name: 'not-9', lower: 'not-9', index: 4};
    this.rules[5] = {name: 'digit', lower: 'digit', index: 5};

    // UDTS
    this.udts = [];
    this.udts[0] = {name: 'u_office', lower: 'u_office', empty: false, index: 0};

    // OPCODES
    // phone-number
    this.rules[0].opcodes = [];
    this.rules[0].opcodes[0] = {type: 2, children: [1,2,3,4,5,6]};// CAT
    this.rules[0].opcodes[1] = {type: 9, string: [40]};// TLS
    this.rules[0].opcodes[2] = {type: 4, index: 1};// RNM(area-code)
    this.rules[0].opcodes[3] = {type: 9, string: [41]};// TLS
    this.rules[0].opcodes[4] = {type: 5, empty: false, index: 0};// UDT(u_office)
    this.rules[0].opcodes[5] = {type: 9, string: [45]};// TLS
    this.rules[0].opcodes[6] = {type: 4, index: 2};// RNM(subscriber)

    // area-code
    this.rules[1].opcodes = [];
    this.rules[1].opcodes[0] = {type: 2, children: [1,2,3]};// CAT
    this.rules[1].opcodes[1] = {type: 4, index: 3};// RNM(gt-2)
    this.rules[1].opcodes[2] = {type: 4, index: 4};// RNM(not-9)
    this.rules[1].opcodes[3] = {type: 4, index: 5};// RNM(digit)

    // subscriber
    this.rules[2].opcodes = [];
    this.rules[2].opcodes[0] = {type: 3, min: 4, max: 4};// REP
    this.rules[2].opcodes[1] = {type: 4, index: 5};// RNM(digit)

    // gt-2
    this.rules[3].opcodes = [];
    this.rules[3].opcodes[0] = {type: 8, min: 50, max: 57};// TRG

    // not-9
    this.rules[4].opcodes = [];
    this.rules[4].opcodes[0] = {type: 8, min: 48, max: 56};// TRG

    // digit
    this.rules[5].opcodes = [];
    this.rules[5].opcodes[0] = {type: 8, min: 48, max: 57};// TRG
}

// INPUT GRAMMAR FILE(s)
//
// ;
// ; Ref: Wikipedia, North American Numbering Plan
// ;
// phone-number = "(" area-code ")" u_office "-" subscriber
// area-code = gt-2 not-9 digit
// subscriber = 4digit
// gt-2 = %d50-57
// not-9 = %d48-56
// digit = %d48-57
