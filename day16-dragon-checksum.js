"use strict";

function generateData(initialData, desiredLength) {

    function step(data, desiredLength) {
        let newData =
            data +
            "0" +
            data.split('')
                .reverse()
                .map(a => a=="0"?"1":(a=="1"?"0":a))
                .join("");

        if (newData.length >= desiredLength) return newData;
        else return step(newData, desiredLength);
    }

    let diskData = step(initialData, desiredLength).substring(0, desiredLength);
    return diskData;
}

function calculateChecksum(data) {

    function reduce(data) {
        let result = "";
        for (let i=0; i < data.length; i+=2) {
            let pair = data[i] + data[i+1];
            if (pair == "00" || pair == "11") {
                result += "1";
            } else result += "0";
        }
        if (result.length %2 == 1) return result;
        else return reduce(result);
    }

    return reduce(data);
}

console.log(calculateChecksum(generateData("10000",20)));
console.log(calculateChecksum(generateData("01111001100111011",272)));
console.log(calculateChecksum(generateData("01111001100111011",35651584)));

// console.log(calculateChecksum('110010110100'));
