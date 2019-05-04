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

const reduceTo = function(arr, n) {
  if (arr.length <= n || arr.length <= 5) {
    return arr
  }

  //try filtering-down by # of non-zero digits used
  // let tmp = preferZeros(arr, n)
  // if (tmp.length > 0 && tmp.length <= n) {
  //   return tmp
  // }

  //otherwise, remove every other selection (less good)
  while (arr.length > n) {
    arr = arr.filter((o, i) => {
      return i % 2 === 0
    })
    if (arr.length <= n || arr.length <= 5) {
      return arr
    }
  }
  return arr
}
module.exports = reduceTo
