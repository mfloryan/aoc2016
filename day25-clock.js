"use strict";

let assembunny = [
    'cpy a d',
    'cpy 11 c',
    'cpy 231 b',
    'inc d',
    'dec b',
    'jnz b -2',
    'dec c',
    'jnz c -5',
    'cpy d a',
    'jnz 0 0',
    'cpy a b',
    'cpy 0 a',
    'cpy 2 c',
    'jnz b 2',
    'jnz 1 6',
    'dec b',
    'dec c',
    'jnz c -4',
    'inc a',
    'jnz 1 -7',
    'cpy 2 b',
    'jnz c 2',
    'jnz 1 4',
    'dec b',
    'dec c',
    'jnz 1 -4',
    'jnz 0 0',
    'out b',
    'jnz a -19',
    'jnz 1 -21',
];

class Computer {

    cpy(valueOrRegister, register) {
        let value = Number.parseInt(valueOrRegister);
        if (Number.isNaN(value)) {
            value = this.registers[valueOrRegister];
        }
        if (this.registers[register] !== undefined) {
            this.registers[register] = value;
        }
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

        let offset = Number.parseInt(jump);
        if (Number.isNaN(offset)) {
            offset = this.registers[jump];
        }

        if (value != 0) {
            this.pc += Number.parseInt(offset);
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

    out(register) {
        this.output.push(this.registers[register]);
        if (this.outputMonitor) this.terminator = !this.outputMonitor(this.registers[register]);
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
                console.log(op);
                console.log(this[op]);
                console.log("Unidentified assembly: " + i);
            }
        });
    }

    execute(initialRegisters, outMonitor) {
        this.registers = Object.assign(this.registers, initialRegisters);
        this.outputMonitor = outMonitor;
        this.terminator = false;
        this.output = [];
        let i = 0;
        while (this.pc < this.code.length && !this.terminator) {
            let currentOperation = this.code[this.pc];
            currentOperation.f.apply(this, currentOperation.a);
            i++;
            if (i % 1000 == 0 && this.output.length > 20) {
                this.terminator = true;
                console.log("**** MAYBE THIS ONE *****" + i + this.output.join(''));
            }
        }
        return {r: this.registers, o: this.output.join('-')};
    }
}

let computer = new Computer(assembunny);

var expected = null;

function checkClock(output) {
    if (expected) {
        if (output != expected) return false;
    }
    expected = (output == '1'?'0':'1');
    return true;
}

for (let i=10000; i < 50000; i++) {
    // console.log(i);
    expected = null;
    if (!i % 100 == 0) {
        let r = computer.execute({a:i}, checkClock);
        if (i % 103 == 0 || r.o.length > 20) console.log(i + " -> " + r.o);
    }
}
