const R = require('ramda');
const fs = require('fs');

let that = {};
const shiftsInMonth = 31;

function genShifts(num) {
    return R.range(0, num)
        .map(() => Math.random() >= 0.5);
} 
let array = Array(31);
array = array.map((val, index, array) => {
    return Math.random() >= 0.5;
});
// console.log(genShifts(shiftsInMonth));

const iterable = R.range(
    'a'.charCodeAt(0),
    'z'.charCodeAt(0)+1
)
    .map((num) => String.fromCharCode(num));
// console.log(iterable);
for (let user of iterable) {
    that[user] = genShifts(shiftsInMonth);
}
console.log(that);

fs.writeFileSync('availability.json', JSON.stringify(that), "utf8");
