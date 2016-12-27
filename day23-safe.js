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

    noop() {
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

    tgl(valueOrRegister) {
        let distance = Number.parseInt(valueOrRegister);
        if (Number.isNaN(distance)) {
            distance = this.registers[valueOrRegister];
        }
        if (distance == 0) {
            this.code[this.pc] = {f: this.inc, a: [valueOrRegister]};
        } else {
            let toggledInstruction = this.code[this.pc + Number.parseInt(distance)];

            if (toggledInstruction) {
                if (toggledInstruction.a.length == 1){
                    if (toggledInstruction.f == this.inc) {
                        toggledInstruction.f = this.dec;
                    } else {
                        toggledInstruction.f = this.inc;
                    }
                } else if (toggledInstruction.a.length == 2) {
                    if (toggledInstruction.f == this.jnz) {
                        toggledInstruction.f = this.cpy;
                    } else {
                        toggledInstruction.f = this.jnz;
                    }
                }
            }
        }

        this.pc++;
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
        }
        return this.registers;
    }
}

let computer = new Computer(assembunny);

console.log(
    computer.execute({a:0})
);
