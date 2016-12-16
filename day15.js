"use strict";

let simpleInput = [
    'Disc #1 has 5 positions; at time=0, it is at position 4.',
    'Disc #2 has 2 positions; at time=0, it is at position 1.'
];

let input = [
    'Disc #1 has 7 positions; at time=0, it is at position 0.',
    'Disc #2 has 13 positions; at time=0, it is at position 0.',
    'Disc #3 has 3 positions; at time=0, it is at position 2.',
    'Disc #4 has 5 positions; at time=0, it is at position 2.',
    'Disc #5 has 17 positions; at time=0, it is at position 0.',
    'Disc #6 has 19 positions; at time=0, it is at position 7.',
    'Disc #7 has 11 positions; at time=0, it is at position 0.'
];


function parseSetup(input) {
    let setup = {};
    input.forEach(l => {
        setup[Number.parseInt(l.match(/#(.)/)[1])] = {
            size: Number.parseInt(l.match(/has (.+) positions/)[1]),
            offset: Number.parseInt(l.match(/it is at position (.+)./)[1])
        };
    });
    return setup;
}

let setup = parseSetup(input);
console.log(setup);

let aligned = false;
let t = 0;

let setupKeys = Object.keys(setup);
do {
    aligned = setupKeys
            .map(key => (t + Number.parseInt(key) + setup[key].offset) % setup[key].size)
            .reduce((p,c) => p+c, 0) == 0;
    t++;
} while (!aligned);

console.log(t-1);
