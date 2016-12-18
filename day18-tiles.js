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

let rows =[];
let currentRow = firstRow;
for (let i =0; i < 40; i++) {
    rows.push(currentRow);
    currentRow = getNextRow(currentRow);
}

console.log(rows);

console.log(
    rows.map(row => row.split('').filter(t => t == safe)).map(i => i.length).reduce((p,c)=> p+c ,0));
