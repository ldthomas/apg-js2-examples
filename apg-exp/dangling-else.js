// This is a further demonstration of translating the AST in the replacement function.
// See the [ast]() example here for a discussion of the AST as it is available to `apg-exp`.
// This is a slightly more interesting translation.
// It translates the famous "dangling else" ambiguity problem into its different interpretations.
// You can find it in the *Dragon Book*, Aho, Lam, Sethi & Ullman, pg. 211.
(function() {
  var apglib = require("apg-lib");
  var id = apglib.ids;
  /* the AST callback translation functions */
  var astStmt = function(state, chars, phraseIndex, phraseLength, data) {
    var ret = id.SEM_OK;
    if (state == id.SEM_PRE) {
      if (data.stmtDepth > 0) {
        /* open brackets */
        data.output += "{";
      }
      data.stmtDepth += 1;
    } else if (state == id.SEM_POST) {
      data.stmtDepth -= 1;
      if (data.stmtDepth > 0) {
        /* close brackets */
        data.output += "}";
      }
    }
    return ret;
  }
  var astStmtFar = function(state, chars, phraseIndex, phraseLength, data) {
    var ret = id.SEM_OK;
    if (state == id.SEM_PRE) {
      if (data.stmtDepth > 0) {
        data.output += "{";
      }
    } else if (state == id.SEM_POST) {
      if (data.stmtDepth > 0) {
        data.output += "}";
      }
    }
    return ret;
  }
  var astIfStmt = function(state, chars, phraseIndex, phraseLength, data) {
    var ret = id.SEM_OK;
    if (state == id.SEM_PRE) {
      if (data.stmtDepth > 0) {
        data.output += "{";
      }
      data.stmtDepth += 1;
    } else if (state == id.SEM_POST) {
      data.stmtDepth -= 1;
      if (data.stmtDepth > 0) {
        data.output += "}";
      }
    }
    return ret;
  }
  var astIf = function(state, chars, phraseIndex, phraseLength, data) {
    var ret = id.SEM_OK;
    if (state == id.SEM_PRE) {
      data.output += "if "
    } else if (state == id.SEM_POST) {
    }
    return ret;
  }
  var astThen = function(state, chars, phraseIndex, phraseLength, data) {
    var ret = id.SEM_OK;
    if (state == id.SEM_PRE) {
      data.output += " then "
    } else if (state == id.SEM_POST) {
    }
    return ret;
  }
  var astElse = function(state, chars, phraseIndex, phraseLength, data) {
    var ret = id.SEM_OK;
    if (state == id.SEM_PRE) {
      data.output += " else "
    } else if (state == id.SEM_POST) {
    }
    return ret;
  }
  var astExpr = function(state, chars, phraseIndex, phraseLength, data) {
    var ret = id.SEM_OK;
    if (state == id.SEM_PRE) {
      data.output += apglib.utils.charsToString(chars, phraseIndex, phraseLength);
    } else if (state == id.SEM_POST) {
    }
    return ret;
  }
  var astOther = function(state, chars, phraseIndex, phraseLength, data) {
    var ret = id.SEM_OK;
    if (state == id.SEM_PRE) {
      data.output += apglib.utils.charsToString(chars, phraseIndex, phraseLength);
    } else if (state == id.SEM_POST) {
    }
    return ret;
  }
  var astOtherStmt = function(state, chars, phraseIndex, phraseLength, data) {
    var ret = id.SEM_OK;
    if (state == id.SEM_PRE) {
      data.output += apglib.utils.charsToString(chars, phraseIndex, phraseLength);
    } else if (state == id.SEM_POST) {
    }
    return ret;
  }
  var astOtherElse = function(state, chars, phraseIndex, phraseLength, data) {
    var ret = id.SEM_OK;
    if (state == id.SEM_PRE) {
      data.output += "{";
      data.output += apglib.utils.charsToString(chars, phraseIndex, phraseLength);
      data.output += "}";
    } else if (state == id.SEM_POST) {
    }
    return ret;
  }
  var replacementFunction = function(result, exp) {
    data = {
      stmtDepth : 0,
      output : ""
    }
    exp.ast.translate(data);
    return data.output;
  };
  try {
    var apgexp = require("apg-exp");
    var near = new (require("./grammars/dangling-else-near.js"))();
    var far = new (require("./grammars/dangling-else-far.js"))();
    var exp, str, txt;
    str = "if E1 then if E2 then S1 else S2";
    // This grammar and example demonstrates the "nearest-match" interpretation of the dangling else problem.
    // That is, the "else" clause is associated with the nearest "then" clause.
    exp = new apgexp(near);
    exp.exclude([ "if", "then", "else", "sep" ]);
    exp.ast.callbacks["stmt"] = astStmt;
    exp.ast.callbacks["if-word"] = astIf;
    exp.ast.callbacks["then-word"] = astThen;
    exp.ast.callbacks["else-word"] = astElse;
    exp.ast.callbacks["expr"] = astExpr;
    exp.ast.callbacks["other"] = astOther;
    txt = exp.replace(str, replacementFunction);
    console.log();
    console.log("dangling else translations" + "(See Aho, Lam, Sethi & Ullman, pg. 211)");
    console.log();
    console.log("nearest grammar: ");
    console.log(exp.source);
    console.log("  string: " + str);
    console.log(" nearest: the 'else' clause is associated with the nearest 'then' clause");
    console.log(" nearest: " + txt);
    // This grammar and example demonstrates the "furthest-match" interpretation of the dangling else problem.
    // That is, the "else" clause is associated with the furthest "then" clause.
    exp = new apgexp(far);
    exp.exclude([ "if", "then", "else", "sep" ]);
    exp.ast.callbacks["stmt"] = astStmtFar;
    exp.ast.callbacks["if-stmt"] = astIfStmt;
    exp.ast.callbacks["if-word"] = astIf;
    exp.ast.callbacks["then-word"] = astThen;
    exp.ast.callbacks["else-word"] = astElse;
    exp.ast.callbacks["expr"] = astExpr;
    exp.ast.callbacks["other-stmt"] = astOtherStmt;
    exp.ast.callbacks["other-else"] = astOtherElse;
    txt = exp.replace(str, replacementFunction);
    console.log();
    console.log("furthest grammar: ");
    console.log(exp.source);
    console.log("  string: " + str);
    console.log("furthest: the 'else' clause is associated with the furthest 'then' clause");
    console.log("furthest: " + txt);
  } catch (e) {
    console.log("EXCEPTION: " + e.message);
  }
})();
