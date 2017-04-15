/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(4)
var ieee754 = __webpack_require__(5)
var isArray = __webpack_require__(6)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// This module contains the actual encoding and decoding algorithms.
// Throws "RangeError" exceptions on characters or bytes out of range for the given encoding.
"use strict;"
var _this = this;

/* decoding error codes */
var NON_SHORTEST = 0xFFFFFFFC;
var TRAILING     = 0xFFFFFFFD;
var RANGE        = 0xFFFFFFFE;
var ILL_FORMED   = 0xFFFFFFFF;

/* mask[n] = 2**n - 1, ie. mask[n] = n bits on. e.g. mask[6] = %b111111 */
var mask = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023];

/* ascii[n] = 'HH', where 0xHH = n, eg. ascii[254] = 'FE' */
var ascii = [ 
  '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '0A', '0B', '0C', '0D', '0E', '0F', '10', '11', '12', '13', '14', '15', '16', '17',
  '18', '19', '1A', '1B', '1C', '1D', '1E', '1F', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '2A', '2B', '2C', '2D', '2E', '2F', '30',
  '31', '32', '33', '34', '35', '36', '37', '38', '39', '3A', '3B', '3C', '3D', '3E', '3F', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
  '4A', '4B', '4C', '4D', '4E', '4F', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '5A', '5B', '5C', '5D', '5E', '5F', '60', '61', '62',
  '63', '64', '65', '66', '67', '68', '69', '6A', '6B', '6C', '6D', '6E', '6F', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '7A', '7B',
  '7C', '7D', '7E', '7F', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '8A', '8B', '8C', '8D', '8E', '8F', '90', '91', '92', '93', '94',
  '95', '96', '97', '98', '99', '9A', '9B', '9C', '9D', '9E', '9F', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'AA', 'AB', 'AC', 'AD',
  'AE', 'AF', 'B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6',
  'C7', 'C8', 'C9', 'CA', 'CB', 'CC', 'CD', 'CE', 'CF', 'D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'DA', 'DB', 'DC', 'DD', 'DE', 'DF',
  'E0', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'EA', 'EB', 'EC', 'ED', 'EE', 'EF', 'F0', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8',
  'F9', 'FA', 'FB', 'FC', 'FD', 'FE', 'FF' ];

/* vector of base 64 characters */
var base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split("");

/* vector of base 64 character codes */
var base64codes = [];
base64chars.forEach(function(char){
  base64codes.push(char.charCodeAt(0));
});

// The UTF8 algorithms.
exports.utf8 = {
    encode : function(chars) {
      var bytes = [];
      chars.forEach(function(char){
        if(char >= 0 && char <= 0x7f){
          bytes.push(char);
        }else if(char <= 0x7ff){
          bytes.push(0xc0 + ((char >> 6) & mask[5]));
          bytes.push(0x80 + (char & mask[6]));
        }else if(char < 0xD800 || (char > 0xDFFF && char <= 0xffff)){
          bytes.push(0xe0 + ((char >> 12) & mask[4]));
          bytes.push(0x80 + ((char >> 6) & mask[6]));
          bytes.push(0x80 + (char & mask[6]));
        }else if(char >= 0x10000 && char <= 0x10ffff){
          var u = (char >> 16) & mask[5];
          bytes.push(0xf0 + (u >> 2));
          bytes.push(0x80 + ((u & mask[2]) << 4) + ((char >> 12) & mask[4]));
          bytes.push(0x80 + ((char >> 6) & mask[6]));
          bytes.push(0x80 + (char & mask[6]));
        }else{
          throw new RangeError("utf8.encode: character out of range: char: " + char);
        }
      });
      return Buffer.from(bytes);
    },
  decode : function(buf, bom) {
    /* bytes functions return error for non-shortest forms & values out of range */
    function bytes2(b1, b2){
      /*U+0080..U+07FF */
      /* 00000000 00000yyy yyxxxxxx | 110yyyyy 10xxxxxx */
      if((b2 & 0xC0) !== 0x80){
        return TRAILING;
      }
      var x = ((b1 & mask[5]) << 6) + (b2 & mask[6]);
      if(x < 0x80){
        return NON_SHORTEST;
      }
      return x;
    }
    function bytes3(b1, b2, b3){
      /*U+0800..U+FFFF */
      /* 00000000 zzzzyyyy yyxxxxxx | 1110zzzz 10yyyyyy 10xxxxxx */
      if(((b3 & 0xC0) !== 0x80) || ((b2 & 0xC0) !== 0x80)){
        return TRAILING;
      }
      var x = ((b1 & mask[4]) << 12) + ((b2 & mask[6]) << 6) + (b3 & mask[6]);
      if(x < 0X800){
        return NON_SHORTEST;
      }
      if((x >= 0xD800) && (x <= 0xDFFF)){
        return RANGE;
      }
      return x;
    }
    function bytes4(b1, b2, b3, b4){
      /*U+10000..U+10FFFF */
      /* 000uuuuu zzzzyyyy yyxxxxxx | 11110uuu 10uuzzzz 10yyyyyy 10xxxxxx */
      if(((b4 & 0xC0) !== 0x80) || ((b3 & 0xC0) !== 0x80) || ((b2 & 0xC0) !== 0x80)){
        return TRAILING;
      }
      var x = ((((b1 & mask[3]) << 2)
          + ((b2 >> 4) & mask[2])) << 16)
          + ((b2 & mask[4]) << 12)
          + ((b3 & mask[6]) << 6)
          + (b4 & mask[6]);
      if(x < 0x10000){
        return NON_SHORTEST;
      }
      if(x > 0x10FFFF){
        return RANGE;
      }
      return x;
    }
    var c, b1, i1, i2, i3, inc;
    var len = buf.length;
    var i = bom ? 3 : 0;
    var chars = [];
    while(i < len){
      b1 = buf[i];
      c = ILL_FORMED;
      while(true){
        if(b1 >=0 && b1 <=0x7f){
          /*U+0000..U+007F 00..7F*/
          c = b1;
          inc = 1;
          break;
        }
        i1 = i + 1;
        if((i1 < len) && (b1 >= 0xc2 && b1 <= 0xdf)){
          /*U+0080..U+07FF C2..DF 80..BF*/
          c = bytes2(b1, buf[i1]);
          inc = 2;
          break;
        }
        i2 = i + 2
        if((i2 < len) && (b1 >= 0xe0 && b1 <= 0xef)){
          /*U+0800..U+FFFF */
          c = bytes3(b1, buf[i1], buf[i2]);
          inc = 3;
          break;
        }
        i3 = i + 3
        if((i3 < len) && (b1 >= 0xf0 && b1 <= 0xf4)){
          /*U+10000..U+10FFFF */
          c = bytes4(b1, buf[i1], buf[i2], buf[i3]);
          inc = 4;
          break;
        }
        /* if we fall through to here, it is an ill-formed sequence*/
        break;
      }
      if(c > 0x10FFFF){
        var at = "byte["+i+"]";
        if(c === ILL_FORMED){
          throw new RangeError("utf8.decode: ill-formed UTF8 byte sequence found at: "+at);
        }
        if(c === TRAILING){
          throw new RangeError("utf8.decode: illegal trailing byte found at: "+at);
        }
        if(c === RANGE){
          throw new RangeError("utf8.decode: code point out of range found at: "+at);
        }
        if(c === NON_SHORTEST){
          throw new RangeError("utf8.decode: non-shortest form found at: "+at);
        }
        throw new RangeError("utf8.decode: unrecognized error found at: "+at);
      }
      chars.push(c);
      i += inc;
    }
    return chars;
  },
}

//The UTF16BE algorithms.
exports.utf16be = {
  encode : function(chars) {
    var bytes = [];
    var char, h, l;
    for(var i = 0; i < chars.length; i += 1){
      char = chars[i];
      if( ((char >= 0) && (char <= 0xD7FF)) || ((char >= 0xE000) && (char <= 0xFFFF)) ){
        bytes.push((char >> 8) & mask[8]);
        bytes.push(char & mask[8]);
      }else if(char >= 0x10000 && char <= 0x10FFFF){
        l = char - 0x10000;
        h = 0xD800 + (l >> 10);
        l = 0xDC00 + (l & mask[10]);
        bytes.push((h >> 8) & mask[8]);
        bytes.push(h & mask[8]);
        bytes.push((l >> 8) & mask[8]);
        bytes.push(l & mask[8]);
      }else{
        throw new RangeError("utf16be.encode: UTF16BE value out of range: char["+i+"]: "+char);
      }
    }
    return Buffer.from(bytes);
  },
  decode : function(buf, bom) {
    /* assumes caller has insured that buf is a Buffer of bytes */
    if(buf.length % 2 > 0){
      throw new RangeError("utf16be.decode: data length must be even multiple of 2: length: "+buf.length);
    }
    var chars = [];
    var len = buf.length;
    var i = bom ? 2 : 0;
    var j = 0;
    var c, inc, i1, i3, high, low;
    while(i < len){
      while(true){
        i1 = i + 1;
        if(i1 < len){
          high = (buf[i] << 8) + buf[i1];
          if((high < 0xD800) || (high > 0xDFFF)){
            c = high;
            inc = 2;
            break;
          }
          i3 = i + 3;
          if(i3 < len){
            low = (buf[i + 2] << 8) + buf[i3];
            if((high <= 0xDBFF) && (low >= 0xDC00) && (low <= 0xDFFF)){
              c = 0x10000 + ((high - 0xD800) << 10) + (low - 0xDC00);
              inc = 4;
              break;
            }
          }
        }
        /* if we fall through to here, it is an ill-formed sequence*/
        throw new RangeError("utf16be.decode: ill-formed UTF16BE byte sequence found: byte["+i+"]");
      }
      chars[j++] = c;
      i += inc;
    }
    return chars;
  },
}

//The UTF16LE algorithms.
exports.utf16le = {
  encode : function(chars) {
    var bytes = [];
    var char, h, l;
    for(var i = 0; i < chars.length; i += 1){
      char = chars[i];
      if( ((char >= 0) && (char <= 0xD7FF)) || ((char >= 0xE000) && (char <= 0xFFFF)) ){
        bytes.push(char & mask[8]);
        bytes.push((char >> 8) & mask[8]);
      }else if(char >= 0x10000 && char <= 0x10FFFF){
        l = char - 0x10000;
        h = 0xD800 + (l >> 10);
        l = 0xDC00 + (l & mask[10]);
        bytes.push(h & mask[8]);
        bytes.push((h >> 8) & mask[8]);
        bytes.push(l & mask[8]);
        bytes.push((l >> 8) & mask[8]);
      }else{
        throw new RangeError("utf16le.encode: UTF16LE value out of range: char["+i+"]: "+char);
      }
    }
    return Buffer.from(bytes);
  },
  decode : function(buf, bom) {
    /* assumes caller has insured that buf is a Buffer of bytes */
    if(buf.length % 2 > 0){
      throw new RangeError("utf16le.decode: data length must be even multiple of 2: length: "+buf.length);
    }
    var chars = [];
    var len = buf.length;
    var i = bom ? 2 : 0;
    var j = 0;
    var c, inc, i1, i3, high, low;
    while(i < len){
      while(true){
        i1 = i + 1;
        if(i1 < len){
          high = (buf[i1] << 8) + buf[i];
          if((high < 0xD800) || (high > 0xDFFF)){
            c = high;
            inc = 2;
            break;
          }
          i3 = i + 3;
          if(i3 < len){
            low = (buf[i3] << 8) + buf[i + 2];
            if((high <= 0xDBFF) && (low >= 0xDC00) && (low <= 0xDFFF)){
              c = 0x10000 + ((high - 0xD800) << 10) + (low - 0xDC00);
              inc = 4;
              break;
            }
          }
        }
        /* if we fall through to here, it is an ill-formed sequence*/
        throw new RangeError("utf16le.decode: ill-formed UTF16LE byte sequence found: byte["+i+"]");
      }
      chars[j++] = c;
      i += inc;
    }
    return chars;
  },
}

//The UTF32BE algorithms.
exports.utf32be = {
  encode : function(chars) {
    var buf = Buffer.alloc(chars.length * 4);
    var i = 0;
    chars.forEach(function(char){
      if(((char >= 0xD800) && (char <= 0xDFFF)) || (char > 0x10FFFF)){
        throw new RangeError("utf32be.encode: UTF32BE character code out of range: char["+i/4+"]: " + char);
      }
      buf[i++] = (char >> 24) & mask[8];
      buf[i++] = (char >> 16) & mask[8];
      buf[i++] = (char >> 8) & mask[8];
      buf[i++] = char & mask[8];
    });
    return buf;
  },
  decode : function(buf, bom) {
    /* caller to insure buf is a Buffer of bytes */
    if(buf.length % 4 > 0 ){
      throw new RangeError("utf32be.decode: UTF32BE byte length must be even multiple of 4: length: " + buf.length);
    }
    var chars = [];
    var i = bom ? 4 : 0;
    for(; i < buf.length; i += 4){
      var char = (buf[i]<<24) + (buf[i+1]<<16) + (buf[i+2]<<8) + buf[i+3];
      if(((char >= 0xD800) && (char <= 0xDFFF)) || (char > 0x10FFFF)){
        throw new RangeError("utf32be.decode: UTF32BE character code out of range: char["+i/4+"]: " + char);
      }
      chars.push(char);
    }
    return chars;
  }
}

//The UTF32LE algorithms.
exports.utf32le = {
  encode : function(chars) {
    var buf = Buffer.alloc(chars.length * 4);
    var i = 0;
    chars.forEach(function(char){
      if(((char >= 0xD800) && (char <= 0xDFFF)) || (char > 0x10FFFF)){
        throw new RangeError("utf32le.encode: UTF32LE character code out of range: char["+i/4+"]: " + char);
      }
      buf[i++] = char & mask[8];
      buf[i++] = (char >> 8) & mask[8];
      buf[i++] = (char >> 16) & mask[8];
      buf[i++] = (char >> 24) & mask[8];
    });
    return buf;
  },
  decode : function(buf, bom) {
    /* caller to insure buf is a Buffer of bytes */
    if(buf.length % 4 > 0 ){
      throw new RangeError("utf32be.decode: UTF32LE byte length must be even multiple of 4: length: " + buf.length);
    }
    var chars = [];
    var i = bom ? 4 : 0;
    for(; i < buf.length; i += 4){
      var char = (buf[i+3]<<24) + (buf[i+2]<<16) + (buf[i+1]<<8) + buf[i];
      if(((char >= 0xD800) && (char <= 0xDFFF)) || (char > 0x10FFFF)){
        throw new RangeError("utf32le.encode: UTF32LE character code out of range: char["+i/4+"]: " + char);
      }
      chars.push(char);
    }
    return chars;
  }
}

//The UINT7 algorithms. ASCII or 7-bit unsigned integers.
exports.uint7 = {
    encode : function(chars) {
      var buf = Buffer.alloc(chars.length);
      for(var i = 0; i < chars.length; i += 1){
        if(chars[i] > 0x7f){
          throw new RangeError("uint7.encode: UINT7 character code out of range: char["+i+"]: " + chars[i]);
        }
        buf[i] = chars[i];
      }
      return buf;
    },
    decode : function(buf) {
      var chars = [];
      for(var i = 0; i < buf.length; i += 1){
        if(buf[i] > 0x7f){
          throw new RangeError("uint7.decode: UINT7 character code out of range: byte["+i+"]: " + buf[i]);
        }
        chars[i] = buf[i];
      }
      return chars;
    }
  }

//The UINT8 algorithms. BINARY, Latin 1 or 8-bit unsigned integers.
exports.uint8 = {
  encode : function(chars) {
    var buf = Buffer.alloc(chars.length);
    for(var i = 0; i < chars.length; i += 1){
      if(chars[i] > 0xff){
        throw new RangeError("uint8.encode: UINT8 character code out of range: char["+i+"]: " + chars[i]);
      }
      buf[i] = chars[i];
    }
    return buf;
  },
  decode : function(buf) {
    var chars = [];
    for(var i = 0; i < buf.length; i += 1){
      chars[i] = buf[i];
    }
    return chars;
  }
}

//The UINT16BE algorithms. Big-endian 16-bit unsigned integers.
exports.uint16be = {
  encode : function(chars) {
    var buf = Buffer.alloc(chars.length * 2);
    var i = 0;
    chars.forEach(function(char){
      if(char > 0xffff){
        throw new RangeError("uint16be.encode: UINT16BE character code out of range: char["+(i/2)+"]: " + char);
      }
      buf[i++] = (char >> 8) & mask[8];
      buf[i++] = char & mask[8];
    });
    return buf;
  },
  decode : function(buf) {
    if(buf.length % 2 > 0 ){
      throw new RangeError("uint16be.decode: UINT16BE byte length must be even multiple of 2: length: " + buf.length);
    }
    var chars = [];
    for(var i = 0; i < buf.length; i += 2){
      chars.push((buf[i]<<8) + buf[i+1]);
    }
    return chars;
  }
}

//The UINT16LE algorithms. Little-endian 16-bit unsigned integers.
exports.uint16le = {
  encode : function(chars) {
    var buf = Buffer.alloc(chars.length * 2);
    var i = 0;
    chars.forEach(function(char){
      if(char > 0xffff){
        throw new RangeError("uint16le.encode: UINT16LE character code out of range: char["+(i/2)+"]: " + char);
      }
      buf[i++] = char & mask[8];
      buf[i++] = (char >> 8) & mask[8];
    });
    return buf;
  },
  decode : function(buf) {
    if(buf.length % 2 > 0 ){
      throw new RangeError("uint16le.decode: UINT16LE byte length must be even multiple of 2: length: " + buf.length);
    }
    var chars = [];
    for(var i = 0; i < buf.length; i += 2){
      chars.push((buf[i+1]<<8) + buf[i]);
    }
    return chars;
  }
}

//The UINT32BE algorithms. Big-endian 32-bit unsigned integers.
exports.uint32be = {
  encode : function(chars) {
    var buf = Buffer.alloc(chars.length * 4);
    var i = 0;
    chars.forEach(function(char){
      buf[i++] = (char >> 24) & mask[8];
      buf[i++] = (char >> 16) & mask[8];
      buf[i++] = (char >> 8) & mask[8];
      buf[i++] = char & mask[8];
    });
    return buf;
  },
  decode : function(buf) {
    if(buf.length % 4 > 0 ){
      throw new RangeError("uint32be.decode: UINT32BE byte length must be even multiple of 4: length: " + buf.length);
    }
    var chars = [];
    for(var i = 0; i < buf.length; i += 4){
      chars.push((buf[i]<<24) + (buf[i+1]<<16) + (buf[i+2]<<8) + buf[i+3]);
    }
    return chars;
  }
}

//The UINT32LE algorithms. Little-endian 32-bit unsigned integers.
exports.uint32le = {
  encode : function(chars) {
    var buf = Buffer.alloc(chars.length * 4);
    var i = 0;
    chars.forEach(function(char){
      buf[i++] = char & mask[8];
      buf[i++] = (char >> 8) & mask[8];
      buf[i++] = (char >> 16) & mask[8];
      buf[i++] = (char >> 24) & mask[8];
    });
    return buf;
  },
  decode : function(buf) {
    /* caller to insure buf is a Buffer of bytes */
    if(buf.length % 4 > 0 ){
      throw new RangeError("uint32le.decode: UINT32LE byte length must be even multiple of 4: length: " + buf.length);
    }
    var chars = [];
    for(var i = 0; i < buf.length; i += 4){
      chars.push((buf[i+3]<<24) + (buf[i+2]<<16) + (buf[i+1]<<8) + buf[i]);
    }
    return chars;
  }
}

// The STRING algorithms. Converts JavaScript strings to Array of 32-bit integers and vice versa. 
// Uses the node.js Buffer's native "utf16le" capabilites.
exports.string = {
  encode: function(chars){
    return _this.utf16le.encode(chars).toString("utf16le");
  },
  decode: function(str){
    return _this.utf16le.decode(Buffer.from(str, "utf16le"), 0);
  }
}

//The ESCAPED algorithms. 
// Note that ESCAPED format contains only ASCII characters.
// The characters are always in the form of a Buffer of bytes.
exports.escaped = {
// Encodes an Array of 32-bit integers into ESCAPED format.
  encode : function(chars) {
    var bytes = [];
    for (var i = 0; i < chars.length; i += 1) {
      var char = chars[i];
      if (char === 96) {
        bytes.push(char);
        bytes.push(char);
      } else if (char === 10) {
        bytes.push(char);
      } else if (char >= 32 && char <= 126) {
        bytes.push(char);
      } else{
        var str = "";
        if (char >= 0 && char <= 31) {
          str += "`x" + ascii[char];
        } else if (char >= 127 && char <= 255) {
          str += "`x" + ascii[char];
        } else if (char >= 0x100 && char <= 0xffff) {
          str += "`u" + ascii[(char >> 8) & mask[8]] + ascii[char & mask[8]];
        } else if (char >= 0x10000 && char <= 0xffffffff) {
          str += "`u{";
          var digit = (char >> 24) & mask[8];
          if (digit > 0) {
            str += ascii[digit];
          }
          str += ascii[(char >> 16) & mask[8]] + ascii[(char >> 8) & mask[8]] + ascii[char & mask[8]] + "}";
        } else {
          throw new Error("escape.encode(char): char > 0xffffffff not allowed");
        }
        var buf = Buffer.from(str);
        buf.forEach(function(b){
          bytes.push(b);
        });
      }
    }
    return Buffer.from(bytes);
  },
  // Decodes ESCAPED format from a Buffer of bytes to an Array of 32-bit integers.
  decode : function(buf) {
    function isHex(hex){
      if((hex >= 48 && hex <= 57) || (hex >= 65 && hex <= 70) || (hex >= 97 && hex <= 102)){
        return true;
      }
      return false;
    }
    function getx(i, len, buf){
      var ret = {char: null, nexti: i + 2, error: true};
      if(i + 1 < len ){
        if(isHex(buf[i]) && isHex(buf[i+1])){
          var str = String.fromCodePoint(buf[i], buf[i+1]);
          ret.char = parseInt(str, 16);
          if(!isNaN(ret.char)){
            ret.error = false;
          }
        }
      }
      return ret;
    }
    function getu(i, len, buf){
      var ret = {char: null, nexti: i + 4, error: true};
      if(i + 3 < len ){
        if(isHex(buf[i]) && isHex(buf[i+1]) && isHex(buf[i+2]) && isHex(buf[i+3])){
          var str = String.fromCodePoint(buf[i], buf[i+1], buf[i+2], buf[i+3]);
          ret.char = parseInt(str, 16);
          if(!isNaN(ret.char)){
            ret.error = false
          }
        }
      }
      return ret;
    }
    function getU(i, len, buf){
      var ret = {char: null, nexti: i + 4, error: true};
      var str = "";
      while(i < len && isHex(buf[i])){
        str += String.fromCodePoint(buf[i]);
        i += 1;
      }
      ret.char = parseInt(str, 16);
      if(buf[i] === 125 && !isNaN(ret.char)){
        ret.error = false
      }
      ret.nexti = i + 1;
      return ret;
    }
    var chars = [];
    var len = buf.length;
    var i1, ret, error;
    var i = 0;
    while(i < len){
      while(true){
        error = true;
        if(buf[i] !== 96){
          /* unescaped character */
          chars.push(buf[i]);
          i += 1;
          error = false;
          break;
        }
        i1 = i + 1;
        if(i1 >= len){
          break;
        }
        if(buf[i1] === 96){
          /* escaped grave accent */
          chars.push(96);
          i += 2;
          error = false;
          break;
        }
        if(buf[i1] === 120){
          ret = getx(i1+1, len, buf);
          if(ret.error){
            break;
          }
          /* escaped hex */
          chars.push(ret.char);
          i = ret.nexti;
          error = false;
          break;
        }
        if(buf[i1] === 117){
          if(buf[i1+1] === 123){
            ret = getU(i1 + 2, len, buf);
            if(ret.error){
              break;
            }
            /* escaped utf-32 */
            chars.push(ret.char);
            i = ret.nexti;
            error = false;
            break;
          }
          ret = getu(i1 + 1, len, buf);
          if(ret.error){
            break;
          }
          /* escaped utf-16 */
          chars.push(ret.char);
          i = ret.nexti;
          error = false;
          break;
        }
        break;
      }
      if(error){
        throw new Error("escaped.decode: ill-formed escape sequence at buf["+i+"]");
      }
    }
    return chars;
  }
}

// The line end conversion algorigthms.
var CR = 13;
var LF = 10;
exports.lineEnds = {
    crlf: function(chars){
      var lfchars = [];
      var i = 0;
      while(i < chars.length){
        switch(chars[i]){
        case CR:
          if((i + 1) < chars.length && chars[i + 1] === LF){
            i += 2;
          }else{
            i += 1
          }
          lfchars.push(CR);
          lfchars.push(LF);
          break;
        case LF:
          lfchars.push(CR);
          lfchars.push(LF);
          i += 1;
          break;
        default:
          lfchars.push(chars[i]);
          i += 1;
          break;
        }
      }
      if(lfchars.length > 0 && lfchars[lfchars.length - 1] !== LF){
        lfchars.push(CR);
        lfchars.push(LF);
      }
      return lfchars;
    },
    lf: function(chars){
      var lfchars = [];
      var i = 0;
      while(i < chars.length){
        switch(chars[i]){
        case CR:
          if((i + 1) < chars.length && chars[i + 1] === LF){
            i += 2;
          }else{
            i += 1
          }
          lfchars.push(LF);
          break;
        case LF:
          lfchars.push(LF);
          i += 1;
          break;
        default:
          lfchars.push(chars[i]);
          i += 1;
          break;
        }
      }
      if(lfchars.length > 0 && lfchars[lfchars.length - 1] !== LF){
        lfchars.push(LF);
      }
      return lfchars;
    }
}

// The base 64 algorithms.
exports.base64 = {
  encode : function(buf) {
    if(buf.length === 0){
      return Buffer.alloc(0);
    }
    var i, j, n;
    var tail = buf.length % 3;
    tail = (tail > 0) ? 3-tail : 0;
    var units = (buf.length + tail)/3;
    var base64 = Buffer.alloc(units * 4);
    if(tail > 0){
      units -= 1;
    }
    i = 0;
    j = 0;
    for(var u = 0; u < units; u += 1){
      n = buf[i++] << 16;
      n += buf[i++] << 8;
      n += buf[i++];
      base64[j++] = base64codes[(n >> 18) & mask[6]];
      base64[j++] = base64codes[(n >> 12) & mask[6]];
      base64[j++] = base64codes[(n >> 6) & mask[6]];
      base64[j++] = base64codes[n & mask[6]];
    }
    if (tail === 0) {
      return base64;
    }
    if (tail === 1) {
      n = buf[i++] << 16;
      n += buf[i] << 8;
      base64[j++] = base64codes[(n >> 18) & mask[6]];
      base64[j++] = base64codes[(n >> 12) & mask[6]];
      base64[j++] = base64codes[(n >> 6) & mask[6]];
      base64[j] = base64codes[64];
      return base64;
    }
    if (tail === 2) {
      n = buf[i] << 16;
      base64[j++] = base64codes[(n >> 18) & mask[6]];
      base64[j++] = base64codes[(n >> 12) & mask[6]];
      base64[j++] = base64codes[64];
      base64[j] = base64codes[64];
      return base64;
    }
  },
  decode: function(codes){
    /* remove white space and ctrl characters, validate & translate characters */
    function validate(buf){
      var chars = [];
      var tail = 0;
      for (var i = 0; i < buf.length; i += 1) {
        var char = buf[i];
        while(true){
          if (char === 32 || char === 9 || char === 10 || char === 13) {
            break;
          }
          if (char >= 65 && char <= 90) {
            chars.push(char - 65);
            break;
          }
          if (char >= 97 && char <= 122) {
            chars.push(char - 71);
            break;
          }
          if (char >= 48 && char <= 57) {
            chars.push(char + 4);
            break;
          }
          if (char === 43) {
            chars.push(62);
            break;
          }
          if (char === 47) {
            chars.push(63);
            break;
          }
          if (char === 61) {
            chars.push(64);
            tail += 1;
            break;
          }
          /* invalid character */
          throw new RangeError("base64.decode: invalid character buf[" + i + "]: " + char);
        }
      }
      /* validate length */
      if (chars.length % 4 > 0) {
        throw new RangeError("base64.decode: string length not integral multiple of 4: " + chars.length);
      }
      /* validate tail */
      switch(tail){
      case 0:
        break;
      case 1:
        if (chars[chars.length - 1] !== 64) {
          throw new RangeError("base64.decode: one tail character found: not last character");
        }
        break;
      case 2:
        if ((chars[chars.length - 1] !== 64) || (chars[chars.length - 2] !== 64)) {
          throw new RangeError("base64.decode: two tail characters found: not last characters");
        }
        break;
      default:
        throw new RangeError("base64.decode: more than two tail characters found: " + tail);
      }
      return {tail: tail, buf: Buffer.from(chars)}
    }
    
    if(codes.length === 0){
      return Buffer.alloc(0);
    }
    var val = validate(codes);
    var tail = val.tail;
    var base64 = val.buf;
    var i, j, n;
    var units = base64.length / 4;
    var buf = Buffer.alloc((units*3) - tail);
    if(tail > 0){
      units -= 1;
    }
    j = 0;
    i = 0;
    for(var u = 0; u < units; u += 1) {
      n = base64[i++] << 18;
      n += base64[i++] << 12;
      n += base64[i++] << 6;
      n += base64[i++];
      buf[j++] = (n >> 16) & mask[8];
      buf[j++] = (n >> 8) & mask[8];
      buf[j++] = n & mask[8];
    }
    if (tail === 1) {
      n = base64[i++] << 18;
      n += base64[i++] << 12;
      n += base64[i] << 6;
      buf[j++] = (n >> 16) & mask[8];
      buf[j] = (n >> 8) & mask[8];
    }
    if (tail === 2) {
      n = base64[i++] << 18;
      n += base64[i++] << 12;
      buf[j] = (n >> 16) & mask[8];
    }
    return buf;
    
  },
  // Converts a base 64 Buffer of bytes to a JavaScript string with line breaks.
  toString: function(buf){
    if(buf.length % 4 > 0){
      throw new RangeError("base64.toString: input buffer length not multiple of 4: " + buf.length);
    }
    var str = "";
    var lineLen = 0;
    function buildLine(c1, c2, c3, c4) {
      switch (lineLen) {
      case 76:
        str += "\r\n" + c1 + c2 + c3 + c4;
        lineLen = 4;
        break;
      case 75:
        str += c1 + "\r\n" + c2 + c3 + c4;
        lineLen = 3;
        break;
      case 74:
        str += c1 + c2 + "\r\n" + c3 + c4;
        lineLen = 2;
        break;
      case 73:
        str += c1 + c2 + c3 + "\r\n" + c4;
        lineLen = 1;
        break;
      default:
        str += c1 + c2 + c3 + c4;
        lineLen += 4;
        break;
      }
    }
    function validate(c){
      if(c >= 65 && c <= 90){
        return true
      }
      if(c >= 97 && c <= 122){
        return true
      }
      if(c >= 48 && c <= 57){
        return true
      }
      if(c === 43){
        return true
      }
      if(c === 47){
        return true
      }
      if(c === 61){
        return true
      }
      return false;
    }
    for(var i = 0; i < buf.length; i += 4){
      for(var j = i; j < i+4; j +=1){
        if(!validate(buf[j])){
          throw new RangeError("base64.toString: buf["+j+"]: "+buf[j]+" : not valid base64 character code");
        }
      }
      buildLine(String.fromCharCode(buf[i]), String.fromCharCode(buf[i+1]), String.fromCharCode(buf[i+2]), String.fromCharCode(buf[i+3]));
      
    }
    return str;
  },
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0).Buffer))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// This module exposes the public encoding, decoding and conversion functions.
// Its private functions provide the disassembling and interpetation of the source and destination encoding types.
// In the case of Unicode encodings, private functions determine the presence of Byte Order Marks (BOMs), if any.
//
// Throws "TypeError" exceptions on input errors.
//
"use strict;"
var _this = this;
var trans = __webpack_require__(1);

/* types */
var UTF8     = "UTF8";
var UTF16    = "UTF16";
var UTF16BE  = "UTF16BE";
var UTF16LE  = "UTF16LE";
var UTF32    = "UTF32";
var UTF32BE  = "UTF32BE";
var UTF32LE  = "UTF32LE";
var UINT7    = "UINT7";
var ASCII    = "ASCII";
var BINARY   = "BINARY";
var UINT8    = "UINT8";
var UINT16   = "UINT16";
var UINT16LE = "UINT16LE";
var UINT16BE = "UINT16BE";
var UINT32   = "UINT32";
var UINT32LE = "UINT32LE";
var UINT32BE = "UINT32BE";
var ESCAPED  = "ESCAPED";
var STRING   = "STRING";

/* private functions */
// Find the UTF8 BOM, if any.
var bom8 = function(src) {
  src.type = UTF8;
  var buf = src.data;
  src.bom = 0;
  if(buf.length >= 3){
    if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
      src.bom = 3;
    }
  }
}
// Find the UTF16 BOM, if any, and determine the UTF16 type.
// Defaults to UTF16BE.
// Throws TypeError exception if BOM does not match the specified type.
var bom16 = function(src) {
  var buf = src.data;
  src.bom = 0;
  switch (src.type) {
  case UTF16:
    src.type = UTF16BE;
    if(buf.length >= 2){
      if (buf[0] === 0xFE && buf[1] === 0xFF) {
        src.bom = 2;
      }else if (buf[0] === 0xFF && buf[1] === 0xFE) {
        src.type = UTF16LE;
        src.bom = 2;
      }
    }
    break;
  case UTF16BE:
    src.type = UTF16BE;
    if(buf.length >= 2){
      if (buf[0] === 0xFE && buf[1] === 0xFF) {
        src.bom = 2;
      }else if (buf[0] === 0xFF && buf[1] === 0xFE) {
        throw new TypeError('src type: "' + UTF16BE + '" specified but BOM is for "' + UTF16LE + '"');
      }
    }
    break;
  case UTF16LE:
    src.type = UTF16LE;
    if(buf.length >= 0){
      if (buf[0] === 0xFE && buf[1] === 0xFF) {
        throw new TypeError('src type: "' + UTF16LE + '" specified but BOM is for "' + UTF16BE + '"');
      }else if (buf[0] === 0xFF && buf[1] === 0xFE) {
        src.bom = 2;
      }
    }
    break;
  default:
    throw new TypeError('UTF16 BOM: src type "' + src.type + '" unrecognized');
  }
}
//Find the UTF32 BOM, if any, and determine the UTF32 type.
//Defaults to UTF32BE.
//Throws exception if BOM does not match the specified type.
var bom32 = function(src) {
  var buf = src.data;
  src.bom = 0;
  switch (src.type) {
  case UTF32:
    src.type = UTF32BE;
    if(buf.length >= 4){
      if (buf[0] === 0 && buf[1] === 0 && buf[2] === 0xFE && buf[3] === 0xFF) {
        src.bom = 4;
      }
      if (buf[0] === 0xFF && buf[1] === 0xFE && buf[2] === 0 && buf[3] === 0) {
        src.type = UTF32LE;
        src.bom = 4;
      }
    }
    break;
  case UTF32BE:
    src.type = UTF32BE;
    if(buf.length >= 4){
      if (buf[0] === 0 && buf[1] === 0 && buf[2] === 0xFE && buf[3] === 0xFF) {
        src.bom = 4;
      }
      if (buf[0] === 0xFF && buf[1] === 0xFE && buf[2] === 0 && buf[3] === 0) {
        throw new TypeError('src type: ' + UTF32BE + ' specified but BOM is for ' + UTF32LE + '"');
      }
    }
    break;
  case UTF32LE:
    src.type = UTF32LE;
    if(buf.length >= 4){
      if (buf[0] === 0 && buf[1] === 0 && buf[2] === 0xFE && buf[3] === 0xFF) {
        throw new TypeError('src type: "' + UTF32LE + '" specified but BOM is for "' + UTF32BE + '"');
      }
      if (buf[0] === 0xFF && buf[1] === 0xFE && buf[2] === 0 && buf[3] === 0) {
        src.bom = 4;
      }
    }
    break;
  default:
    throw new TypeError('UTF32 BOM: src type "' + src.type + '" unrecognized');
  }
}
// Validates the source encoding type and matching data.
// If the BASE64: prefix is present, the base 64 decoding is done here as the initial step.
// - For type STRING, data must be a JavaScript string.
// - For type BASE64:*, data may be a string or Buffer.
// - For all other types, data must be a Buffer.
// - The BASE64: prefix is not allowed for type STRING.
var validateSrc = function(type, data){
  function getType(type){
    var ret = {
        type: "",
        base64: false
    }
    var rx = /^(base64:)?([a-zA-Z0-9]+)$/i;
    var result = rx.exec(type);
    if (result) {
      if (result[2]) {
        ret.type = result[2].toUpperCase();
      }
      if (result[1]) {
        ret.base64 = true;
      }
    }
    return ret;
  }
  if (typeof(type) !== "string" || type === "") {
    throw new TypeError('type: "' + type + '" not recognized');
  }
  var ret = getType(type.toUpperCase());
  if(ret.base64){
    /* handle base 64 */
    if(ret.type === STRING){
      throw new TypeError('type: "' + type + ' "BASE64:" prefix not allowed with type '+STRING);
    }
    if(Buffer.isBuffer(data)){
      ret.data = trans.base64.decode(data);
    }else if(typeof(data) === "string"){
      var buf = Buffer.from(data, "ascii");
      ret.data = trans.base64.decode(buf);
    }else{
      throw new TypeError('type: "' + type + ' unrecognized data type: typeof(data): ' + typeof(data));
    }
  }else{
    ret.data = data;
  }
  switch (ret.type) {
  case UTF8:
    bom8(ret);
    break;
  case UTF16:
  case UTF16BE:
  case UTF16LE:
    bom16(ret);
    break;
  case UTF32:
  case UTF32BE:
  case UTF32LE:
    bom32(ret);
    break;
  case UINT16:
    ret.type = UINT16BE;
    break;
  case UINT32:
    ret.type = UINT32BE;
    break;
  case ASCII:
    ret.type = UINT7;
    break;
  case BINARY:
    ret.type = UINT8;
    break;
  case UINT7:
  case UINT8:
  case UINT16LE:
  case UINT16BE:
  case UINT32LE:
  case UINT32BE:
  case STRING:
  case ESCAPED:
    break;
  default:
    throw new TypeError('type: "' + type + '" not recognized');
  }
  if(ret.type === STRING){
    if(typeof(ret.data) !== "string"){
      throw new TypeError('type: "' + type + '" but data is not a string');
    }
  }else{
    if(!Buffer.isBuffer(ret.data)){
      throw new TypeError('type: "' + type + '" but data is not a Buffer');
    }
  }
  return ret;
}
// Disassembles and validates the destination type.
// `chars` must be an Array of integers.
// The :BASE64 suffix is not allowed for type STRING.
var validateDst = function(type, chars){
  function getType(type){
    var fix, rem;
    var ret = {
        crlf: false,
        lf: false,
        base64: false,
        type: ""
    }
    /*prefix, if any */
    while(true){
      rem = type;
      fix = type.slice(0, 5);
      if(fix === "CRLF:"){
        ret.crlf = true;
        rem = type.slice(5);
        break;
      }
      fix = type.slice(0, 3);
      if(fix === "LF:"){
        ret.lf = true;
        rem = type.slice(3);
        break;
      }
      break;
    }
    /*suffix, if any */
    fix = rem.split(":");
    if(fix.length === 1){
      ret.type = fix[0];
      
    }else if(fix.length === 2 && fix[1] === "BASE64"){
      ret.base64 = true;
      ret.type = fix[0];
    }
    return ret;
  }
  if(!Array.isArray(chars)){
    throw new TypeError('dst chars: not array: "' + typeof(chars));
  }
  if (typeof(type) !== "string") {
    throw new TypeError('dst type: not string: "' + typeof(type));
  }
  ret = getType(type.toUpperCase());
  switch (ret.type) {
  case UTF8:
  case UTF16BE:
  case UTF16LE:
  case UTF32BE:
  case UTF32LE:
  case UINT7:
  case UINT8:
  case UINT16LE:
  case UINT16BE:
  case UINT32LE:
  case UINT32BE:
  case ESCAPED:
    break;
  case STRING:
    if(ret.base64){
      throw new TypeError('":BASE64" suffix not allowed with type '+STRING);
    }
    break;
  case ASCII:
    ret.type = UINT7;
    break;
  case BINARY:
    ret.type = UINT8;
    break;
  case UTF16:
    ret.type = UTF16BE;
    break;
  case UTF32:
    ret.type = UTF32BE;
    break;
  case UINT16:
    ret.type = UINT16BE;
    break;
  case UINT32:
    ret.type = UINT32BE;
    break;
  default:
    throw new TypeError('dst type unrecognized: "' + type + '" : must have form [crlf:|lf:]type[:base64]');
  }
  return ret;
}
// Select and call the requested encoding function.
var encode = function(type, chars){
  switch(type){
  case UTF8:
    return trans.utf8.encode(chars);
  case UTF16BE:
    return trans.utf16be.encode(chars);
  case UTF16LE:
    return trans.utf16le.encode(chars);
  case UTF32BE:
    return trans.utf32be.encode(chars);
  case UTF32LE:
    return trans.utf32le.encode(chars);
  case UINT7:
    return trans.uint7.encode(chars);
  case UINT8:
    return trans.uint8.encode(chars);
  case UINT16BE:
    return trans.uint16be.encode(chars);
  case UINT16LE:
    return trans.uint16le.encode(chars);
  case UINT32BE:
    return trans.uint32be.encode(chars);
  case UINT32LE:
    return trans.uint32le.encode(chars);
  case STRING:
    return trans.string.encode(chars);
  case ESCAPED:
    return trans.escaped.encode(chars);
  default:
    throw new TypeError('encode type "'+type+'" not recognized')
  }
}
// Select and call the requested decoding function.
// `src` contains BOM information as well as the source type and data.
var decode = function(src){
  switch(src.type){
  case UTF8:
    return trans.utf8.decode(src.data, src.bom);
  case UTF16LE:
    return trans.utf16le.decode(src.data, src.bom);
  case UTF16BE:
    return trans.utf16be.decode(src.data, src.bom);
  case UTF32BE:
    return trans.utf32be.decode(src.data, src.bom);
  case UTF32LE:
    return trans.utf32le.decode(src.data, src.bom);
  case UINT7:
    return trans.uint7.decode(src.data);
  case UINT8:
    return trans.uint8.decode(src.data);
  case UINT16BE:
    return trans.uint16be.decode(src.data);
  case UINT16LE:
    return trans.uint16le.decode(src.data);
  case UINT32BE:
    return trans.uint32be.decode(src.data);
  case UINT32LE:
    return trans.uint32le.decode(src.data);
  case STRING:
    return trans.string.decode(src.data);
  case ESCAPED:
    return trans.escaped.decode(src.data);
  default:
    throw new TypeError('decode type "'+src.type+'" not recognized')
  }
}

// The public decoding function. Returns an array of integers.
exports.decode = function(type, data) {
  var src = validateSrc(type, data);
  return decode(src);
}
// The public encoding function. Returns a Buffer-typed byte array.
exports.encode = function(type, chars) {
  var c, buf;
  var dst = validateDst(type, chars);
  if(dst.crlf){
    /* prefix with CRLF line end conversion, don't contaminate caller's chars array */
    c = trans.lineEnds.crlf(chars);
    buf = encode(dst.type, c);
  }else if(dst.lf){
    /* prefix with LF line end conversion, don't contaminate caller's chars array */
    c = trans.lineEnds.lf(chars);
    buf = encode(dst.type, c);
  }else{
    buf = encode(dst.type, chars);
  }
  if(dst.base64){
    /* post base 64 encoding */
    buf = trans.base64.encode(buf);
  }
  return buf;
}
// Converts data of type `srcType` to data of type `dstType`.
// `srcData` may be a JavaScript String, or node.js Buffer, depending on the corresponding type.
exports.convert = function(srcType, srcData, dstType) {
  return _this.encode(dstType, _this.decode(srcType, srcData));
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0).Buffer))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// This function is used to generate a browser-accessible copy of `apg-lib`.
(function(){
  var converter =  __webpack_require__(2);
  this.apgConv = {
      convert: converter.convert,
      encode: converter.encode,
      decode: converter.decode,
      transformers: __webpack_require__(1),
      Buffer: Buffer
  }
})()

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0).Buffer))

/***/ })
/******/ ]);