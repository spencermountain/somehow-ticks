<div align="center">
  <div>somehow-ticks</div>
  <img src="https://cloud.githubusercontent.com/assets/399657/23590290/ede73772-01aa-11e7-8915-181ef21027bc.png" />
  <div><a href="https://spencermounta.in/somehow-ticks/">demo</a></div>
  <a href="https://npmjs.org/package/somehow-ticks">
    <img src="https://img.shields.io/npm/v/somehow-ticks.svg?style=flat-square" />
  </a>
  <a href="https://unpkg.com/somehow-ticks">
    <img src="https://badge-size.herokuapp.com/spencermountain/somehow-ticks/master/builds/somehow-ticks.min.js" />
  </a>
</div>

**work in progress**

calculate some sensible break-points between two numbers

`npm i somehow-ticks`

```js
const somehowTicks = require('somehow-ticks')

let ticks = somehowTicks(0, 5000, 5)
/*
[ { label: '1k', number: 1000, value: 0.2 },
  { label: '2k', number: 2000, value: 0.4 },
  { label: '3k', number: 3000, value: 0.6 },
  { label: '4k', number: 4000, value: 0.8 } ]
*/
```

This library has some opinions:

- ticks should always be `spaced evenly`, even if this means less ticks
- a tick should appear **x.0** or **x.5**
- they don't need to begin or end at the start and end.
- _less ticks_ are better than too-many ticks

it was built for labelling an x-axis in a space-limited way, but you can use it for whatever weird stuff.

## See also:

- [somehow](https://github.com/spencermountain/somehow) - sneaky infographics library
- [spacetime-ticks](https://github.com/spencermountain/spacetime-ticks) - same api, but for dates

MIT
