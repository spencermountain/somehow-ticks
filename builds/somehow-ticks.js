/* somehow v0.0.3
   github.com/spencermountain/somehow-ticks
   MIT
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.somehowTicks = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  trillion: 1000000000000,
  billion: 1000000000,
  million: 1000000,
  hundredThousand: 100000,
  tenThousand: 10000,
  thousand: 1000,
  hundred: 100,
  ten: 10,
  one: 1,
  tenth: 0.1,
  hundredth: 0.01,
  thousandth: 0.01
};

},{}],2:[function(_dereq_,module,exports){
"use strict";

var n = _dereq_('./_constants');

var prettyNum = function prettyNum(num) {
  num = parseFloat(num);

  if (num >= n.trillion) {
    num = parseInt(num / 100000000000, 10) * 100000000000;
    return num / n.trillion + 't';
  }

  if (num >= n.billion) {
    num = parseInt(num / 100000000, 10) * 100000000;
    return num / n.billion + 'b';
  }

  if (num >= n.million) {
    num = parseInt(num / 100000, 10) * 100000;
    return num / n.million + 'm';
  }

  if (num >= n.tenThousand) {
    num = parseInt(num / n.thousand, 10) * n.thousand;
    return num / n.thousand + 'k';
  }

  if (num >= n.thousand) {
    num = parseInt(num / n.hundred, 10) * n.hundred;
    return num / n.thousand + 'k';
  }

  return num.toLocaleString();
};

module.exports = prettyNum;

},{"./_constants":1}],3:[function(_dereq_,module,exports){
"use strict";

// const zeroPad = (str, len = 2) => {
//   let pad = '0'
//   str = str + ''
//   return str.length >= len
//     ? str
//     : new Array(len - str.length + 1).join(pad) + str
// }
//
// const preferZeros = function(arr, ticks) {
//   const max = String(arr[arr.length - 1] || '').length
//   const zeroArr = arr.map(a => {
//     let str = zeroPad(String(a), max)
//     const zeros = (str.match(/0/g) || []).length
//     return [a, zeros]
//   })
//   let ranked = zeroArr.sort((a, b) => (a[1] < b[1] ? 1 : -1))
//   console.log(ranked)
//   return ranked
//     .map(a => a[0])
//     .slice(0, ticks)
//     .sort()
// }
var reduceTo = function reduceTo(arr, n) {
  if (arr.length <= n || arr.length <= 5) {
    return arr;
  } //try filtering-down by # of non-zero digits used
  // let tmp = preferZeros(arr, n)
  // if (tmp.length > 0 && tmp.length <= n) {
  //   return tmp
  // }
  //otherwise, remove every other selection (less good)


  while (arr.length > n) {
    arr = arr.filter(function (o, i) {
      return i % 2 === 0;
    });

    if (arr.length <= n || arr.length <= 5) {
      return arr;
    }
  }

  return arr;
};

module.exports = reduceTo;

},{}],4:[function(_dereq_,module,exports){
"use strict";

var methods = _dereq_('./methods');

var chooseMethod = function chooseMethod(start, end) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;
  var diff = Math.abs(end - start);

  if (diff === 0) {
    return [];
  } //1 million


  if (diff > 3000000) {
    return methods.millions(start, end, n);
  } //100k


  if (diff > 300000) {
    return methods.hundredKs(start, end, n);
  } //1k


  if (diff > 3000) {
    return methods.thousands(start, end, n);
  } //100


  if (diff > 300) {
    return methods.hundreds(start, end, n);
  } //10


  if (diff > 30) {
    return methods.tens(start, end, n);
  } //1


  if (diff > 3) {
    return methods.ones(start, end, n);
  } //.1


  if (diff > 0.3) {
    return methods.tenths(start, end, n);
  } //.01


  return methods.hundredths(start, end, n);
}; //flip it around backwards


var reverseTicks = function reverseTicks(ticks) {
  ticks = ticks.map(function (o) {
    o.value = 1 - o.value;
    return o;
  });
  return ticks.reverse();
}; //


var somehowTicks = function somehowTicks(start, end, n) {
  var reverse = false;
  start = Number(start);
  end = Number(end); //reverse them, if necessary

  if (start > end) {
    reverse = true;
    var tmp = start;
    start = end;
    end = tmp;
  }

  var ticks = chooseMethod(start, end, n); //support backwards ticks

  if (reverse === true) {
    ticks = reverseTicks(ticks);
  }

  return ticks;
};

module.exports = somehowTicks;

},{"./methods":5}],5:[function(_dereq_,module,exports){
"use strict";

var reduceTo = _dereq_('./_reduce');

var prettyNum = _dereq_('./_prettyNum');

var c = _dereq_('./_constants');

var roundDown = function roundDown(n, unit) {
  return Math.floor(n / unit) * unit;
}; //increment by this unit


var allTicks = function allTicks(start, end, unit) {
  var inc = unit / 2; //increment by .5

  var ticks = [];
  start = start += unit;
  start = roundDown(start, unit);

  while (start < end) {
    ticks.push(start);
    start = start += inc;
  }

  return ticks;
};

var formatTicks = function formatTicks(arr, fmt, start, end) {
  var delta = end - start;
  return arr.map(function (s) {
    var percent = (s - start) / delta;
    return {
      label: prettyNum(s),
      number: s,
      value: parseInt(percent * 1000, 10) / 1000
    };
  });
};

var methods = {
  millions: function millions(start, end, n) {
    var ticks = allTicks(start, end, c.million);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, 'm', start, end);
    return ticks;
  },
  hundredKs: function hundredKs(start, end, n) {
    var ticks = allTicks(start, end, c.hundredThousand);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, 'k', start, end);
    return ticks;
  },
  thousands: function thousands(start, end, n) {
    var ticks = allTicks(start, end, c.thousand);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, 'm', start, end);
    return ticks;
  },
  hundreds: function hundreds(start, end, n) {
    var ticks = allTicks(start, end, c.hundred);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, 'm', start, end);
    return ticks;
  },
  tens: function tens(start, end, n) {
    var ticks = allTicks(start, end, c.ten);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, '', start, end);
    return ticks;
  },
  ones: function ones(start, end, n) {
    var ticks = allTicks(start, end, c.one);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, '', start, end);
    return ticks;
  },
  tenths: function tenths(start, end, n) {
    var ticks = allTicks(start, end, c.tenth);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, '', start, end);
    return ticks;
  },
  hundredths: function hundredths(start, end, n) {
    var ticks = allTicks(start, end, c.hundredth);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, '', start, end);
    return ticks;
  }
};
module.exports = methods;

},{"./_constants":1,"./_prettyNum":2,"./_reduce":3}]},{},[4])(4)
});
