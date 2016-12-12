"use strict";

var fs = require('fs');

var lines = fs.readFileSync('day3.input', {'encoding': 'UTF-8'}).split('\n');

var result =
  lines.map(line =>
    line
      .trim()
      .split(/ +/)
      .map(s => Number.parseInt(s))
  )
  .filter(a => (a.length == 3))
  .map(array => isTriangle(array))
  .reduce((a,b) => {return a + (b?1:0)},0);

console.log(result);

function isTriangle(a) {
  return (
    (a[0] + a[1] > a[2]) &&
    (a[1] + a[2] > a[0]) &&
    (a[0] + a[2] > a[1]))
}
