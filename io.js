const readline = require('readline');
const fs = require('fs');

exports.readFromFile = function(name) {
    let rs = fs.createReadStream(name);

    return new Promise((resolve, reject) => {
        var lines = [];

        rs.on('error', (error) => {
            reject(error);
        });

        let rl = readline.createInterface({
            input: rs
        });

        rl.on('line', (line) => {
            lines.push(line);
        });

        rl.on('error', (error) => {
            reject(error);
        });

        rl.on('close', () => {
            resolve(lines);
        });
    });
};
