"use strict";

const readline = require('readline');
const fs = require('fs');

const input = ["eedadn",
    "drvtee",
    "eandsr",
    "raavrd",
    "atevrs",
    "tsrnev",
    "sdttsa",
    "rasrtv",
    "nssdts",
    "ntnada",
    "svetve",
    "tesnvt",
    "vntsnd",
    "vrdear",
    "dvrsen",
    "enarar"];

function turnArrayAround(array) {
    var result = [];
    let row = 0;
    array.forEach(e => {
        let column = 0;
        for (let c of e) {
            if (!result[column]) result[column] = [];
            result[column][row] = c;
            column++;
        }
        row++;
    });
    return result;
}

function transpose(matrix) {
    return Object.keys(matrix[0])
        .map(colNumber => matrix.map(rowNumber => rowNumber[colNumber]));
}

function histogram(string) {
    let dict = [];
    for (let c of string) {
        var letterEntry = dict.find(e => e.letter == c);
        if (letterEntry) {
            letterEntry.n++;
        } else {
            dict.push({
                letter: c,
                n: 1
            });
        }
    }
    dict.sort((a, b) => {
        if (a.n > b.n) return -1;
        else if (a.n < b.n) return 1;
        else {
            if (a.letter > b.letter) return 1;
            else if (a.letter < b.letter) return -1;
            else return 0;
        }
    });
    return dict;
}

function ReadFromFile(whenDone) {
    const rl = readline.createInterface({
        input: fs.createReadStream('day6.txt')
    });

    var lines = [];
    rl.on('line', (line) => {
        lines.push(line);
    });

    rl.on('close', () => {
        whenDone(lines);
    });
}

ReadFromFile((lines) => {
    var message = transpose(lines)
      .map(word => histogram(word.join('')))
      .map(h => h.pop().letter)
      .join('');
    console.log(message);
});
