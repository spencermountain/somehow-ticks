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

<a href="https://spencermounta.in/somehow-ticks">
  <img src="https://user-images.githubusercontent.com/399657/52904717-02cdb280-31fe-11e9-902d-8b012e72ed15.gif" />
</a>

```js
const somehowTicks=require('somehow-ticks')

let ticks=somehowTicks(0, 200, 5)
// [
// { label: "0", value: 0 }
// { label: "50", value: 50 }
// { label: "100", value: 100 }
// { label: "150", value: 150 }
// { label: "200", value: 200 }
// ]
```

This library has some opinions:
* ticks should always be `spaced evenly`, even if this means less ticks
* a tick should appear **x.0** or **x.5**
* they don't need to begin or end at the start and end.
* *less ticks* are better than too-many ticks

it was built for labelling an x-axis in a space-limited way, but you can use it for whatever weird stuff.

## See also:
* [spacetime-ticks](https://github.com/spencermountain/spacetime-ticks) - same api for dates

MIT
