"use strict";

const io = require('./io.js');

class Screen {
    constructor(width, heigth) {
        this.display = [];
        for (let i = 0; i < heigth; i++) {
            let row = [];
            for (var j = 0; j < width; j++) {
                row.push('.');
            }
            this.display.push(row);
        }
    }

    rect(wide, tall) {
        for (let i = 0; i < tall; i++) {
            for (let j=0; j < wide; j++) {
                this.display[i][j] = '#';
            }
        }
    }

    rotateRow(row,offset) {
        let oldRow = Array.from(this.display[row].join(''));
        let width = this.display[row].length
        for (let i =0; i < width; i++) {
            let oldPosition = i;
            let newPosition = (i + offset) % width;
            this.display[row][newPosition] = oldRow[oldPosition];
        }
    }

    rotateColumn(column, offset) {
        let height = this.display.length;
        let oldColumn = [];
        for (let i =0; i < height; i++) {
            oldColumn.push(this.display[i][column]);
        }

        for (let i =0; i < height; i++) {
            let oldPosition = i;
            let newPosition = (i + offset) % height;
            this.display[newPosition][column] = oldColumn[oldPosition];
        }
    }

    print() {
        console.log(
            this.display.map(r => r.join('')).join('\n')
        );
        console.log();
    }

    countPixels() {
        return this.display.reduce((p,c) => {return p + c.reduce(
            (p,c) => p + (c=='#'?1:0),0
        ) ;},0);
    }

}

io.readFromFile('day08.txt')
.then((lines) => {
    var screen = new Screen(50,6);
    lines.forEach(line => {
        let l = line.split(' ');
        if (l[0] == 'rect') {
            let dim = l[1].split('x');
            screen.rect(Number.parseInt(dim[0]), Number.parseInt(dim[1]));
        } else if (l[0] == "rotate") {
            let index = Number.parseInt(l[2].split('=')[1]);
            let offset = Number.parseInt(l[4]);
            if (l[1] == "row") {
                screen.rotateRow(index, offset);
            } else if (l[1] == "column") {
                screen.rotateColumn(index, offset);
            }
        }
    });
    screen.print();
    console.log(screen.countPixels());
});
