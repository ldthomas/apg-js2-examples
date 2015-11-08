module.exports = function(){
"use strict";

    // SUMMARY
    //      rules = 3
    //       udts = 4
    //    opcodes = 15
    //        ALT = 1
    //        CAT = 3
    //        RNM = 2
    //        UDT = 4
    //        REP = 1
    //        AND = 0
    //        NOT = 0
    //        TLS = 4
    //        TBS = 0
    //        TRG = 0
    // characters = [44 - 119] + user defined

    // CALLBACK LIST PROTOTYPE (true, false or function reference)
    this.callbacks = [];
    this.callbacks['color'] = false;
    this.callbacks['dummy'] = false;
    this.callbacks['start'] = false;
    this.callbacks['u_blue'] = false;
    this.callbacks['u_red'] = false;
    this.callbacks['u_white'] = false;
    this.callbacks['u_yellow'] = false;

    // OBJECT IDENTIFIER (for internal parser use)
    this.grammarObject = 'grammarObject';

    // RULES
    this.rules = [];
    this.rules[0] = {name: 'start', lower: 'start', index: 0};
    this.rules[1] = {name: 'color', lower: 'color', index: 1};
    this.rules[2] = {name: 'dummy', lower: 'dummy', index: 2};

    // UDTS
    this.udts = [];
    this.udts[0] = {name: 'u_red', lower: 'u_red', empty: false, index: 0};
    this.udts[1] = {name: 'u_white', lower: 'u_white', empty: false, index: 1};
    this.udts[2] = {name: 'u_blue', lower: 'u_blue', empty: false, index: 2};
    this.udts[3] = {name: 'u_yellow', lower: 'u_yellow', empty: false, index: 3};

    // OPCODES
    // start
    this.rules[0].opcodes = [];
    this.rules[0].opcodes[0] = {type: 2, children: [1,2]};// CAT
    this.rules[0].opcodes[1] = {type: 4, index: 1};// RNM(color)
    this.rules[0].opcodes[2] = {type: 3, min: 0, max: Infinity};// REP
    this.rules[0].opcodes[3] = {type: 2, children: [4,5]};// CAT
    this.rules[0].opcodes[4] = {type: 9, string: [44]};// TLS
    this.rules[0].opcodes[5] = {type: 4, index: 1};// RNM(color)

    // color
    this.rules[1].opcodes = [];
    this.rules[1].opcodes[0] = {type: 1, children: [1,2,3]};// ALT
    this.rules[1].opcodes[1] = {type: 9, string: [114,101,100]};// TLS
    this.rules[1].opcodes[2] = {type: 9, string: [119,104,105,116,101]};// TLS
    this.rules[1].opcodes[3] = {type: 9, string: [98,108,117,101]};// TLS

    // dummy
    this.rules[2].opcodes = [];
    this.rules[2].opcodes[0] = {type: 2, children: [1,2,3,4]};// CAT
    this.rules[2].opcodes[1] = {type: 5, empty: false, index: 0};// UDT(u_red)
    this.rules[2].opcodes[2] = {type: 5, empty: false, index: 1};// UDT(u_white)
    this.rules[2].opcodes[3] = {type: 5, empty: false, index: 2};// UDT(u_blue)
    this.rules[2].opcodes[4] = {type: 5, empty: false, index: 3};// UDT(u_yellow)
}

// INPUT GRAMMAR FILE(s)
//
// start = color *("," color)
// color = "red" / "white" / "blue"
// dummy = u_red u_white u_blue u_yellow
