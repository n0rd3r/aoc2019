const Solution = require('./solution.js');
let x = new Solution();
x.loadData();


console.log(x.calculateFuel(12));
console.log(x.calculateFuel(14));
console.log(x.calculateFuel(1969));
console.log(x.calculateFuel(100756));
console.log(x.getSolution());