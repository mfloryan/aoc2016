"use strict";

let assembunny = [
    'cpy 41 a',
    'inc a',
    'inc a',
    'dec a',
    'jnz a 2',
    'dec a'
];

let assembunny2 = [
    'cpy 1 a',
    'cpy 1 b',
    'cpy 26 d',
    'jnz c 2',
    'jnz 1 5',
    'cpy 7 c',
    'inc d',
    'dec c',
    'jnz c -2',
    'cpy a c',
    'inc a',
    'dec b',
    'jnz b -2',
    'cpy c b',
    'dec d',
    'jnz d -6',
    'cpy 16 c',
    'cpy 17 d',
    'inc a',
    'dec d',
    'jnz d -2',
    'dec c',
    'jnz c -5'
];

function execute(code) {
    let registers = {a:0, b:0, c:1, d:0};
    let pc = 0;

    while (pc < code.length) {
        let instruction = code[pc].split(' ');
        if (instruction[0] == 'cpy') {
            let value = Number.parseInt(instruction[1]);
            if (Number.isNaN(value)) {
                value = registers[instruction[1]];
            }
            let register = instruction[2];
            registers[register] = value;
            pc++;
        }

        if (instruction[0] == 'inc') {
            registers[instruction[1]]++;
            pc++;
        }

        if (instruction[0] == 'dec') {
            registers[instruction[1]]--;
            pc++;
        }

        if (instruction[0] == 'jnz') {
            let value = Number.parseInt(instruction[1]);
            if (Number.isNaN(value)) {
                value = registers[instruction[1]];
            }
            if (value != 0) {
                pc += Number.parseInt(instruction[2]);
            } else {
                pc++;
            }
        }
        // console.log(pc);

    }

    return registers;
}


console.log(execute(assembunny2));
