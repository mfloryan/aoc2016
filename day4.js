"use strict";

const readline = require('readline');
const fs = require('fs');

let room1 = "aaaaa-bbb-z-y-x-123[abxyz]";
let room2 = "a-b-c-d-e-f-g-h-987[abcde]";
let room3 = "not-a-real-room-404[oarel]";
let room4 = "totally-real-room-200[decoy]";
let room5 = "wifilzof-wbiwifuny-lyuwkocmcncih-864[iwcfl]"; //true

function parseRoom(room) {
  let parts = room.split('-');
  let sectorAndSum = parts.pop().split('[');
  return {
    name: parts.join(''),
    sector: Number.parseInt(sectorAndSum[0]),
    checksum: sectorAndSum[1].substr(0,sectorAndSum[1].length-1),
  };
}

function histogram(string) {
  let dict = [];
  for (let c of string) {
    var letterEntry = dict.find(e => e.letter == c);
    if (letterEntry) {
      letterEntry.n++;
    } else {
      dict.push({letter:c,n:1})
    }
  }
  dict.sort((a,b) => {
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

function getChecksum(room) {
  let h = histogram(room.name);
  return h.slice(0,5).map(h => h.letter).join('');
}

function validateChecksum(room) {
  let c =getChecksum(room);
  room.c = c;
  return c == room.checksum;
};

// var r = parseRoom(room4);
// console.log(r);
// console.log(histogram(r.name));
// console.log(validateChecksum(r));

ReadFromFile();

function ReadFromFile() {
  const rl = readline.createInterface({
    input: fs.createReadStream('day4.input')
  });

  var result = 0;
  var count = 0;

  rl.on('line', (line) => {
    count++;
    let r = parseRoom(line);
    let isValid = validateChecksum(r);
    if (isValid) result += r.sector;
  });

  rl.on('close', () => {
    console.log(count);
    console.log(result);
  });
}
