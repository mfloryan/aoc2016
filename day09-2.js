"use strict";

const io = require('./io.js');

function decompressedLength(input) {
    let length = 0;
    let inMarker = false;
    let characterCount = 0;
    let section = {repeat:0, len:0};
    let buffer = "";

    for (let c of input) {
        if (inMarker) {
            if (c == 'x') {
                section.len = Number.parseInt(buffer);
                buffer = "";
            } else if (c == ')') {
                section.repeat = Number.parseInt(buffer);
                inMarker = false;
                characterCount = section.len;
                buffer = "";
            } else {
                buffer += c;
            }
        } else if (characterCount > 0) {
            buffer += c;
            characterCount--;
            if (characterCount == 0) {
                length += decompressedLength(buffer) * section.repeat;
                section = {repeat:0, len:0};
            }
        } else if (c == '(') {
            inMarker = true;
            buffer="";
        } else {
            length++;
        }
    }

    return length;
}

console.log(decompressedLength("(3x3)XYZ"));
console.log(decompressedLength("X(8x2)(3x3)ABCY"));
console.log(decompressedLength("(27x12)(20x12)(13x14)(7x10)(1x12)A"));

io.readFromFile('day09.txt')
.then((lines) => {
    let result = decompressedLength(lines[0]);
    console.log(result);
});
