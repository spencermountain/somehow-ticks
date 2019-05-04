const reduceTo = require('./_reduce')
const prettyNum = require('./_prettyNum')

const roundTo = function(n, unit) {
  return Math.round(unit * n) / unit
}

//increment by this unit
const allTicks = function(start, end, unit) {
  let ticks = []
  start = start += unit
  start = roundTo(start, unit)
  while (start < end) {
    ticks.push(start)
    start = start += unit
  }
  return ticks
}

const formatTicks = function(arr, fmt, start, end) {
  let delta = end - start
  return arr.map(s => {
    let percent = (s - start) / delta
    return {
      label: prettyNum(s),
      number: s,
      value: parseInt(percent * 1000, 10) / 1000
    }
  })
}

const methods = {
  millions: (start, end, n) => {
    let ticks = allTicks(start, end, 1000000)
    ticks = reduceTo(ticks, n)
    ticks = formatTicks(ticks, 'm', start, end)
    return ticks
  },
  hundredKs: (start, end, n) => {
    let ticks = allTicks(start, end, 100000)
    ticks = reduceTo(ticks, n)
    ticks = formatTicks(ticks, 'k', start, end)
    return ticks
  },
  thousands: (start, end, n) => {
    let ticks = allTicks(start, end, 1000)
    ticks = reduceTo(ticks, n)
    ticks = formatTicks(ticks, 'm', start, end)
    return ticks
  },
  hundreds: (start, end, n) => {
    let ticks = allTicks(start, end, 100)
    ticks = reduceTo(ticks, n)
    ticks = formatTicks(ticks, 'm', start, end)
    return ticks
  },
  tens: (start, end, n) => {
    let ticks = allTicks(start, end, 10)
    ticks = reduceTo(ticks, n)
    ticks = formatTicks(ticks, '', start, end)
    return ticks
  },
  ones: (start, end, n) => {
    let ticks = allTicks(start, end, 1)
    ticks = reduceTo(ticks, n)
    ticks = formatTicks(ticks, '', start, end)
    return ticks
  },
  tenths: (start, end, n) => {
    let ticks = allTicks(start, end, 0.1)
    ticks = reduceTo(ticks, n)
    ticks = formatTicks(ticks, '', start, end)
    return ticks
  },
  hundredths: (start, end, n) => {
    let ticks = allTicks(start, end, 0.01)
    ticks = reduceTo(ticks, n)
    ticks = formatTicks(ticks, '', start, end)
    return ticks
  }
}
module.exports = methods
