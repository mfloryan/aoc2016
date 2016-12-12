"use strict";

const io = require('./io.js');

let instructions = [
    'value 5 goes to bot 2',
    'bot 2 gives low to bot 1 and high to bot 0',
    'value 3 goes to bot 1',
    'bot 1 gives low to output 1 and high to bot 0',
    'bot 0 gives low to output 2 and high to output 0',
    'value 2 goes to bot 2',
];

function parseInstructions(instructions) {
    var bots = {};

    function getBot(number) {
        if (!bots[number]) bots[number] = {input : []};
        return bots[number];
    }

    instructions.forEach(i => {
        let words = i.split(' ');
        if (words[0] == 'value') {
            let botNo = Number.parseInt(words[5]);
            let value = Number.parseInt(words[1]);
            let bot = getBot(botNo);
            bot.input.push(value);
        }

        if (words[0] == 'bot') {
            let botNo = Number.parseInt(words[1]);
            let lowNo = Number.parseInt(words[6]);
            let highNo = Number.parseInt(words[11]);
            let bot = getBot(botNo);
            if (words[5] == "output") {
                bot.low = {output : lowNo };
            } else {
                bot.low = {bot: lowNo};
            }

            if (words[10] == "output") {
                bot.high = {output : highNo };
            } else {
                bot.high = {bot: highNo};
            }
        }
    });

    return bots;
}


io.readFromFile('day10.txt')
.then((lines) => {

    let setup = parseInstructions(lines);

    //iterate through bots and ...
    function iterate(setup) {
        for (let botIndex in setup) {
            let bot = setup[botIndex];

            if (bot.input.length == 2 && !bot.parsed) {
                let sortedInput = bot.input.sort();

                if (bot.low.hasOwnProperty('bot')) {
                    setup[bot.low.bot].input.push(sortedInput[0]);
                }

                if (bot.high.hasOwnProperty('bot')) {
                    setup[bot.high.bot].input.push(sortedInput[1]);
                }
                bot.parsed = true;
            }
        }
    }

    for (let i=0; i < Object.keys(setup).length; i++) {
        iterate(setup);
    }

    let index = Object.keys(setup).find(i => {return (setup[i].input[0] == 17 && setup[i].input[1] == 61);});
    console.log(index);
    console.log(
        setup[index]
    );


});
