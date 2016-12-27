"use strict";

let assembunny = [
    'cpy 2 a',
    'tgl a',
    'tgl a',
    'tgl a',
    'cpy 1 a',
    'dec a',
    'dec a',
];

let assembunny2 = [
];

class Computer {

    cpy(valueOrRegister, register) {
        let value = Number.parseInt(valueOrRegister);
        if (Number.isNaN(value)) {
            value = this.registers[value];
        }
        this.registers[register] = value;
        this.pc++;
    }

    inc(register) {
        this.registers[register]++;
        this.pc++;
    }

    dec(register) {
        this.registers[register]--;
        this.pc++;
    }

    jnz(valueOrRegister, jump) {
        let value = Number.parseInt(valueOrRegister);
        if (Number.isNaN(value)) {
            value = this.registers[valueOrRegister];
        }

        if (value != 0) {
            this.pc += Number.parseInt(jump);
        } else {
            this.pc++;
        }
    }

    constructor(assemblyCode) {
        this.registers = {a:0, b:0, c:0, d:0};
        this.pc = 0;
        this.code = [];

        assemblyCode.forEach( i => {
            let args = i.split(' ');
            let op = args.shift();
            if (typeof(this[op]) === "function") {
                this.code.push({f: this[op], a: args});
            } else {
                console.log("Unidentified assembly: " + i);
            }
        });
    }

    execute(initialRegisters) {
        this.registers = Object.assign(this.registers, initialRegisters);
        while (this.pc < this.code.length) {
            let currentOperation = this.code[this.pc];
            currentOperation.f.apply(this, currentOperation.a);
            console.log(this.pc);
        }
        return this.registers;
    }
}

let computer = new Computer(assembunny);

console.log(
    computer.execute({a:7})
);
