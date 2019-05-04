const reduceTo = require('./_reduce')
const prettyNum = require('./_prettyNum')
const c = require('./_constants')

const roundDown = function(n, unit) {
  return Math.floor(n / unit) * unit
}

//increment by this unit
const allTicks = function(start, end, unit) {
  let inc = unit / 2 //increment by .5
  let ticks = []
  start = start += unit
  start = roundDown(start, unit)
  while (start < end) {
    ticks.push(start)
    start = start += inc
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
    let ticks = allTicks(start, end, c.million)
    ticks = reduceTo(ticks, n)
    ticks = formatTicks(ticks, 'm', start, end)
    return ticks
  },
  hundredKs: (start, end, n) => {
    let ticks = allTicks(start, end, c.hundredThousand)
    ticks = reduceTo(ticks, n)
    ticks = formatTicks(ticks, 'k', start, end)
    return ticks
  },
  thousands: (start, end, n) => {
    let ticks = allTicks(start, end, c.thousand)
    ticks = reduceTo(ticks, n)
    ticks = formatTicks(ticks, 'm', start, end)
    return ticks
  },
  hundreds: (start, end, n) => {
    let ticks = allTicks(start, end, c.hundred)
    ticks = reduceTo(ticks, n)
    ticks = formatTicks(ticks, 'm', start, end)
    return ticks
  },
  tens: (start, end, n) => {
    let ticks = allTicks(start, end, c.ten)
    ticks = reduceTo(ticks, n)
    ticks = formatTicks(ticks, '', start, end)
    return ticks
  },
  ones: (start, end, n) => {
    let ticks = allTicks(start, end, c.one)
    ticks = reduceTo(ticks, n)
    ticks = formatTicks(ticks, '', start, end)
    return ticks
  },
  tenths: (start, end, n) => {
    let ticks = allTicks(start, end, c.tenth)
    ticks = reduceTo(ticks, n)
    ticks = formatTicks(ticks, '', start, end)
    return ticks
  },
  hundredths: (start, end, n) => {
    let ticks = allTicks(start, end, c.hundredth)
    ticks = reduceTo(ticks, n)
    ticks = formatTicks(ticks, '', start, end)
    return ticks
  }
}
module.exports = methods
