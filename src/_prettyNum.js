const n = require('./_constants')

const prettyNum = function(num) {
  num = parseFloat(num)
  if (num >= n.trillion) {
    num = parseInt(num / 100000000000, 10) * 100000000000
    return num / n.trillion + 't'
  }
  if (num >= n.billion) {
    num = parseInt(num / 100000000, 10) * 100000000
    return num / n.billion + 'b'
  }
  if (num >= n.million) {
    num = parseInt(num / 100000, 10) * 100000
    return num / n.million + 'm'
  }
  if (num >= n.tenThousand) {
    num = parseInt(num / n.thousand, 10) * n.thousand
    return num / n.thousand + 'k'
  }
  if (num >= n.thousand) {
    num = parseInt(num / n.hundred, 10) * n.hundred
    return num / n.thousand + 'k'
  }
  return num.toLocaleString()
}
module.exports = prettyNum
