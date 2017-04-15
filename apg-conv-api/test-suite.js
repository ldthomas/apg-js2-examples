// This module provides a suite of function to demonstrate the use of `apg-conv-api`.
// There are four tests:
// - utf8
// - utf16
// - base64
// - escaped
//
// They can be executed in one of two ways.<br>
// Assume that `./` is the `apg-examples` project directory.
//````
// npm run apg-conv-api
// node ./apg-conv-api/test-suites.js
//````
//
// In either case, running it with no arguments will execute all four tests.<br>
// To execute a single test, use the test name as the first argument. For example, to run the base64 test<br>
//````
// npm run apg-conv-api base64
// node ./apg-conv.api/test-suites.js base64
//````
//
(function(){
  "use strict";
  var thisFileName = "suite.js: ";
  var assert = require("assert");
  var converter = require("apg-conv-api").converter;
  var transformers = require("apg-conv-api").transformers;
  
  /* display an array of integers in hex format */
  function displayArray(a){
    var str = "[";
    for(var i = 0; i < a.length; i += 1){
      if(i > 0){
        str += ", ";
      }
      str += "0x" + a[i].toString(16);
    }
    return str + "]";
  }
  
  /* compare two arrays */
  function arraysEqual(a,b){
    if(a.length == b.length){
      for(var i = 0; i < a.length; i += 1){
        if(a[i] != b[i]){
          return false;
        }
      }
      return true;
    }
    return false;
  }
// This function will test the encoding and decoding of the UTF8 format.<br>
// There are four tests, one to test each of the value ranges that require 1-, 2-, 3-, and 4-byte encodings.
  function utf8() {
    function verify(name, src, chars, str){
      console.log();
      console.log(name + " UTF8 test");
      console.log(name + " source: "+displayArray(src));
      console.log(name + "  chars: "+displayArray(chars));
      console.log(name + " string: "+str);
      
      /* test decode */
      var output = converter.decode("UTF8", src);
      assert(arraysEqual(chars, output), name + " :decode UTF8 failed");

      /* test encode */
      var dst = converter.encode("UTF8", chars);
      assert(arraysEqual(src, dst), name + " :encode UTF8 failed");
    }
    /* verify 1-byte conversions - ASCII */
    var byte1_str = "abc\tXYZ\r\n";
    var byte1_utf8 = Buffer.from([97, 98, 99, 9, 88, 89, 90, 13, 10]);
    var byte1_chars = [97, 98, 99, 9, 88, 89, 90, 13, 10];
    verify("ASCII(1-byte)", byte1_utf8, byte1_chars, byte1_str);

    /* verify 2-byte conversions - BINARY (Latin 1) */
    var byte2_str = "\xa7\xa9\xae\xb6\xfc";
    var byte2_utf8 = Buffer.from([0xc2, 0xa7, 0xc2, 0xa9, 0xc2, 0xae, 0xc2, 0xb6, 0xc3, 0xbc]);
    var byte2_chars = [0xa7, 0xa9, 0xae, 0xb6, 0xfc];
    verify("BINARY(2-byte)", byte2_utf8, byte2_chars, byte2_str);

    /* verify 3-byte conversions - Cherokee */
    var byte3_str = "\u13a3\u13ad\u13b2\u13cd\u13db";
    var byte3_utf8 = Buffer.from([0xE1, 0x8E, 0xA3, 0xE1, 0x8e, 0xAD, 0xE1, 0x8e, 0xB2, 0xE1, 0x8F, 0x8D, 0xE1, 0x8F, 0x9B]);
    var byte3_chars = [0x13a3, 0x13ad, 0x13b2, 0x13cd, 0x13db];
    verify("Cherokee(3-byte)", byte3_utf8, byte3_chars, byte3_str);

    /* verify 4-byte conversions - Playing Cards */
    var byte4_str = "\u{1F0A1}\u{1F0B1}\u{1F0C1}\u{1F0D1}";
    var byte4_utf8 = Buffer.from([0xF0, 0x9F, 0x82, 0xA1, 0xF0, 0x9F, 0x82, 0xB1, 0xF0, 0x9F, 0x83, 0x81, 0xF0, 0x9F, 0x83, 0x91]);
    var byte4_chars = [0x1F0A1, 0x1F0B1, 0x1F0C1, 0x1F0D1];
    verify("Playing Cards(4-byte)", byte4_utf8, byte4_chars, byte4_str);
  }
  // This function will test encoding and decoding of the UTF16 format.<br>
  // It tests each of the big-endian and little-endian encodings both with and without a Byte Order Mark (BOM).
  //
  // Finally, it demostrates a couple of failures.<br>
  // - an incorrect BOM specification.
  // - integer values that fall outside the UNICODE allowed range.
  //
  // The disallowed ranges are [0xD800-0xDFFF] and [0x110000-Infinity].
  function utf16() {
    var buf, bom, ch;
    var chars = [0x3b1,0x3b2,0xd7f0,0xd7fb,0x1f0a1,0x1f0a2];
    var utf16be = Buffer.from([0x03,0xb1,0x03,0xb2,0xd7,0xf0,0xd7,0xfb,0xd8,0x3c,0xdc,0xa1,0xd8,0x3c,0xdc,0xa2]);
    var utf16le = Buffer.from([0xb1,0x03,0xb2,0x03,0xf0,0xd7,0xfb,0xd7,0x3c,0xd8,0xa1,0xdc,0x3c,0xd8,0xa2,0xdc]);
    var bombe = Buffer.from([0xfe,0xff]);
    var bomle = Buffer.from([0xff,0xfe]);
    
    /* UTF16 (BE) */
    buf = converter.encode("UTF16", chars);
    assert(arraysEqual(buf, utf16be), "encode: UTF16 (BE) arrays not equal");
    
    /* UTF16BE */
    buf = converter.encode("UTF16BE", chars);
    assert(arraysEqual(buf, utf16be), "encode: UTF16BE arrays not equal");
    
    /* UTF16LE */
    buf = converter.encode("UTF16LE", chars);
    assert(arraysEqual(buf, utf16le), "encode: UTF16BE arrays not equal");
    
    /* decode UTF16 */
    ch = converter.decode("UTF16", utf16be);
    assert(arraysEqual(ch, chars), "decode: UTF16 arrays not equal");
    
    /* decode UTF16 w/BOM */
    ch = converter.decode("UTF16", Buffer.concat([bombe, utf16be]));
    assert(arraysEqual(ch, chars), "decode: UTF16 w/BOM arrays not equal");
    
    /* decode UTF16LE */
    ch = converter.decode("UTF16LE", utf16le);
    assert(arraysEqual(ch, chars), "decode: UTF16LE arrays not equal");
    
    /* decode UTF16LE w/BOM */
    ch = converter.decode("UTF16", Buffer.concat([bomle, utf16le]));
    assert(arraysEqual(ch, chars), "decode: UTF16LE w/BOM arrays not equal");
    
    /* decode UTF16LE wrong BOM */
    try{
      ch = converter.decode("UTF16LE", Buffer.concat([bombe, utf16be]));
    }catch(e){
      console.log("encode EXCEPTION: "+e.message);
    }
    
    /* bad UNICODE character range */
    try{
      ch = converter.encode("UTF16", [0xd800]);
    }catch(e){
      console.log("encode EXCEPTION: "+e.message);
    }
    try{
      ch = converter.encode("UTF16", [0x110000]);
    }catch(e){
      console.log("encode EXCEPTION: "+e.message);
    }
    var str = utf16le.toString("utf16le");
    console.log("apg-conv-api: test suite: utf16: OK: "+str);
  }
  // This base64 test will demonstrate using the low-level `transformers` functions directly.
  //
  // The first test is a simple test of all variations on the string length modulus.
  // That is, the length of the base64 encoding will always be of modulus 4.
  //
  // The second test samples all 256 of the single-byte values, and tests the encoding and decoding
  // against the result from an alternate encoder, `base64-js` which can be installed with `npm install base64-js`.
  function base64() {
    
    /* all byte length variations */
    var str = ['', 'f', 'fo', 'foo', 'foob', 'fooba', 'foobar'];
    var str64 = ['', 'Zg==', 'Zm8=', 'Zm9v', 'Zm9vYg==', 'Zm9vYmE=', 'Zm9vYmFy'];
    
    /* all binary bytes from 0x00-FF */
    var binary = Buffer.alloc(256);
    for(var i = 0; i < 256; i += 1){
      binary[i] = i;
    }
    
    /* generated from base64-js (npm install base64-js) */
    var binarystr = "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+/w==";
    
    /* test all byte length variations */
    var from, to;
    var encode = transformers.base64.encode;
    var decode = transformers.base64.decode;
    var toString = transformers.base64.toString;
    for(var i = 0; i < str.length; i += 1){
      from = encode(Buffer.from(str[i]));
      assert(from.toString("ascii") == str64[i]) 
    }
    for(var i = 0; i < str.length; i += 1){
      to = decode(Buffer.from(str64[i]));
      assert(to.toString("ascii") == str[i]) 
    }
    
    /* test all binary values */
    from = encode(binary);
    assert(from.toString("ascii") == binarystr, "encode all binary digits failed");
    to = decode(Buffer.from(binarystr));
    assert(arraysEqual(to, binary), "decode all binary digits failed")
    
    /* display the base64 of the binary digits with line breaks */
    console.log("base64 of the binary digits with line breaks:")
    console.log(toString(Buffer.from(binarystr)));
    
    console.log("apg-conv-api: test suite: base64: OK");
  }
  // This test demonstrates the `ESCAPED` format for a wide range of integer values.
  function escaped() {
    var chars = [0x00,0xff,0x100,0xd8ff,0xffff,0x10000,0xffffffff];
    var buf = converter.encode("ESCAPED", chars);
    var str = buf.toString("ascii");
    console.log("escaped: "+ str);
    console.log("apg-conv-api: test suite: escaped: OK");
  }
  // This is the driver.
  // It looks for a command line argument specifying a test name.
  // If the name is found, that test is executed.
  // If not found, an error is displayed along with a list of valid test names.
  // If no argument is specified, all tests are executed.
  /* match the test function with the name */
  var test = {};
  test.utf8 = utf8;
  test.utf16 = utf16;
  test.base64 = base64;
  test.escaped = escaped;
  debugger;
  try{
    var name = process.argv[2] 
    if(name){
      if(test[name]){
        /* execute only the specified test */
        test[name]();
      }else{
        /* bad test name */
        console.log(thisFileName + "no test named: "+ name);
        console.log("valid test names:");
        for(var n in test){
          console.log(n);
        }
      }
    }else{
      /* execute all tests */
      for(var name in test){
        test[name]();
      }
    }
  }catch(e){
    console.log("EXCEPTION: "+e.message);
  }
})();
