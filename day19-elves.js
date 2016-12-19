"use strict";

let elves = 3005290;
let elvesWithPresents = Array(elves).fill(1).map((p,i) => {return {e:i+1, p:p};});

function movePresentsOnce(circle) {
    for (let i=0; i < circle.length; i++) {
        let next = (i+1)%circle.length;
        if (circle[i].p > 0) {
            circle[i].p += circle[next].p;
            circle[next].p = 0;
        }
    }
    return circle;
}

while (elvesWithPresents.length > 1) {
    movePresentsOnce(elvesWithPresents);
    elvesWithPresents = elvesWithPresents.filter(e => e.p > 0);
}

console.log(elvesWithPresents[0].e);
