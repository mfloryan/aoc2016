"use strict";

var fs = require('fs');

var lines = fs.readFileSync('day3.input', {'encoding': 'UTF-8'}).split('\n');

var arraysOfValues =
  lines.map(line =>
    line
      .trim()
      .split(/ +/)
      .map(s => Number.parseInt(s))
  )
  .filter(a => (a.length == 3));

var triangles = [];
for (var i = 0; i < arraysOfValues.length; i+= 3) {
  triangles.push([arraysOfValues[i][0], arraysOfValues[i+1][0], arraysOfValues[i+2][0]]);
  triangles.push([arraysOfValues[i][2], arraysOfValues[i+1][2], arraysOfValues[i+2][2]]);
  triangles.push([arraysOfValues[i][1], arraysOfValues[i+1][1], arraysOfValues[i+2][1]]);
}

var result = triangles
  .map(isTriangle)
  .reduce((a,b) => a + (b?1:0),0);

console.log(result);

function isTriangle(a) {
  return (
    (a[0] + a[1] > a[2]) &&
    (a[1] + a[2] > a[0]) &&
    (a[0] + a[2] > a[1]))
}
