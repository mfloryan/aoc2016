"use strict";

const io = require('./io.js');

function decompress(input) {
    let output = "";
    let inMarker = false;
    let characterCount = 0;
    let repeat = 0;
    let buffer = "";

    for (let c of input) {
        if (inMarker) {
            if (c == 'x') {
                characterCount = Number.parseInt(buffer);
                buffer = "";
            } else if (c == ')') {
                repeat = Number.parseInt(buffer);
                inMarker = false;
                buffer = "";
            } else {
                buffer += c;
            }
        } else if (characterCount > 0) {
            buffer += c;
            characterCount--;
            if (characterCount == 0) {
                // console.log(buffer + ' r:' + repeat);
                output += buffer.repeat(repeat);
                repeat = 0;
            }
        } else if (c == '(') {
            inMarker = true;
            buffer="";
        } else {
            output += c;
        }
    }

    return output;
}

// console.log(decompress("ADVENT"));
// console.log(decompress("A(1x5)BC"));
// console.log(decompress("(3x3)XYZ"));
console.log(decompress("A(2x2)BCD(2x2)EFG"));
console.log(decompress("(6x1)(1x3)A"));
console.log(decompress("X(8x2)(3x3)ABCY"));


io.readFromFile('day09.txt')
.then((lines) => {
    let result = decompress(lines[0]);
    console.log(result.length);
});
