"use strict";

const md5 = require('md5');

function findPassword(input) {
    let start = new Date();
    let done = false;
    let i = 0;
    let pwdLen = 0;
    let password = "";
    while (!done) {
        if (i % 100000 == 0) console.log(i);
        let hash = md5(input + i);
        if (hash.startsWith('00000')) {
            password += hash[5];
            console.log(hash[5] + ': ' + i + ' - ' + hash + ' t: ' + (new Date() - start));
            pwdLen++;
        }
        if (pwdLen > 7) done = true;
        i++;
    }
    return password;
}

// console.log(md5('abc3231929'));

console.log("Password: " + findPassword('wtnhxymk'));
