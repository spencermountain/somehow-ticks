const methods = require('./methods')

const chooseMethod = function(start, end, n = 6) {
  let diff = end - start
  //1 million
  if (diff > 3000000) {
    return methods.millions(start, end, n)
  }
  //100k
  if (diff > 300000) {
    return methods.hundredKs(start, end, n)
  }
  //1k
  if (diff > 3000) {
    return methods.thousands(start, end, n)
  }
  //100
  if (diff > 300) {
    return methods.hundreds(start, end, n)
  }
  //10
  if (diff > 30) {
    return methods.tens(start, end, n)
  }
  //1
  if (diff > 3) {
    return methods.ones(start, end, n)
  }
  //.1
  if (diff > 0.3) {
    return methods.tenths(start, end, n)
  }
  //.01
  if (diff > 0.3) {
    return methods.hundredths(start, end, n)
  }
  return []
}

//flip it around backwards
const reverseTicks = function(ticks) {
  ticks = ticks.map(o => {
    o.value = 1 - o.value
    return o
  })
  return ticks.reverse()
}

//
const somehowTicks = function(start, end, n) {
  let reverse = false
  start = Number(start)
  end = Number(end)
  //reverse them, if necessary
  if (start > end) {
    reverse = true
    let tmp = start
    start = end
    end = tmp
  }

  let ticks = chooseMethod(start, end, n)
  //support backwards ticks
  if (reverse === true) {
    ticks = reverseTicks(ticks)
  }
  return ticks
}
module.exports = somehowTicks
