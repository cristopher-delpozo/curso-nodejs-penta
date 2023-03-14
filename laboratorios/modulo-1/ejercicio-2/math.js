const _ = require('lodash');

function add(a, b) {
    return a + b;
}

function sum() {
    let numbers = Array.from(arguments);
    let sum = 0;
    numbers.forEach((num) => (sum += num));
    return sum;
}

function sumArray() {
    let arr = arguments[0];
    if (arguments.length > 0) {
        arr = _.concat(...arguments);
    }
    return sum(...arr);
}

module.exports = {
    add,
    sum,
    sumArray
};
