"use strict";

const md5 = require('md5');

function getTriplet(hash) {
    let ret = false;
    for (let i=0; i < hash.length-2; i++) {
        if ((hash[i] == hash[i+1]) && hash[i] == hash[i+2]) {
            ret = hash[i];
            break;
        }
    }
    return ret;
}

function hasFiveOf(character, hash) {
    return hash.includes(character.repeat(5));
}

function getStretchedHash(salt, index) {
    let hash = md5(salt+index);
    for (let i = 0; i< 2016; i++) {
        hash = md5(hash);
    }
    return hash;
}

var hashesCache = {};

function getHash(salt, index) {
    if (hashesCache[index]) return hashesCache[index];
    let hash = getStretchedHash(salt, index);
    hashesCache[index] = hash;
    return hash;
}

var i = 0;
var found = 0;
var salt = 'ahsbgdzn';

while (found < 64) {
    i++;
    let hash = getHash(salt, i);
    let triplet = false;
    if ((triplet = getTriplet(hash)) != false) {
        for (let j=i; j < i + 1000; j++) {
            if (hasFiveOf(triplet, getHash(salt, j+1))) {
                found++;
                console.log('found 5:' + i + ' ('+ triplet + ') ' + j+1 + ' -> ' + found);
                break;
            }
        }
    }
}
console.log(i);
