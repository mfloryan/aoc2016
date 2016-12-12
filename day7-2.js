"use strict";

const io = require('./io.js');

let examples = [
    'aba[bab]xyz',
    'xyx[xyx]xyx',
    'aaa[kek]eke',
    'zazbz[bzb]cdb'
];

function split(ip7) {
    return ip7.split(/[\[\]]/);
}

function extractAba(part) {
    let abas = [];
    for (let i = 0; i < part.length - 2; i++) {
        if (part[i] == part[i+2] && part[i] != part[i+1]) {
            abas.push([part[i], part[i+1], part[i+2]].join(''));
        }
    }
    return abas;
}

function hasCorresponding(aba, babs) {
    var rv = false;
    babs.forEach(_ => {
        if (aba == (_[1] + _[0] + _[1])) {
            rv = true;
        }
    });
    return rv;
}

function supportsSsl(parts) {
    let ex = parts
    .map((_,i) => {return {hm:(i%2==1), a:extractAba(_)};})
    .reduce(
            (p,c) => {
                if (c.a.length) {
                    if (c.hm) c.a.forEach(_ => p.in.push(_));
                    else c.a.forEach(_ => p.out.push(_));
                }
                return p;
            },
    {in:[], out: []});
    
    if (!ex.out.length) return false;
    var rv = false;
    ex.out.forEach(_ => {
        var has = hasCorresponding(_,ex.in);
        if (has) rv = true;
    });
    return rv;
}

console.log("Parsing examples.");
console.log(
    examples.map(e => supportsSsl(split(e)))
);

console.log("Parsing file.");

io.readFromFile('day7.txt')
.then((lines) => {
    let r = lines.map(e => supportsSsl(split(e)));
    console.log(r.length);
    console.log(r.filter(_ => _).length);
})
.catch(error => {
    console.log("Error reading file: " + error);
});
