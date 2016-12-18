"use strict";

const trapRules = ['^^.', '.^^', '^..', '..^'];
const trap = '^';
const safe = '.';

function getNextRow(currentRow) {
    let currentRowExtended = '.' + currentRow + '.';
    let nextRow = "";

    for (let i=0; i < currentRow.length; i++) {
        let decisionTiles = currentRowExtended[i] + currentRowExtended[i+1] + currentRowExtended[i+2];
        if (trapRules.includes(decisionTiles)) {
            nextRow += trap;
        } else nextRow += safe;
    }

    return nextRow;
}

let firstRow = ".^^^^^.^^.^^^.^...^..^^.^.^..^^^^^^^^^^..^...^^.^..^^^^..^^^^...^.^.^^^^^^^^....^..^^^^^^.^^^.^^^.^^";

let total = 0;
let currentRow = firstRow;
for (let i =0; i < 400000; i++) {
    total += currentRow.split('').filter(t => t == safe).length;
    currentRow = getNextRow(currentRow);
}

console.log(total);
