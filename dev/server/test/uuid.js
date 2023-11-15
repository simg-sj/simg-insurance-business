const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

var u1 = uuidv1();
var u2 = uuidv4();

console.log(u1.toUpperCase());
console.log(u2.toUpperCase());