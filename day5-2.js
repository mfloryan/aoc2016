"use strict";

const md5 = require('md5');

function findPassword(input) {
    let start = new Date();
    let done = false
    let i = 0;
    let pwdLen = 0;
    let password = Array.from("________");
    while (!done) {
        if (i % 100000 == 0) process.stdout.write(i + " ");
        let hash = md5(input + i);
        if (hash.startsWith('00000')) {
            let position = hash[5];
            let letter = hash[6];
            if (position >= 0 && position <= 7) {
                if (password[position] == "_") {
                    password[position] = letter;
                    console.log("\n" + password.join('') + ' (' + i + ') - ' + hash + ' t: ' + (new Date() - start));
                    pwdLen++;
                }
            }
        }
        if (pwdLen > 7) done = true;
        i++;
    }
    return password.join('');
}

// console.log(md5('abc3231929'));

// console.log("Password: " + findPassword('wtnhxymk'));
console.log("Password: " + findPassword('wtnhxymk'));
