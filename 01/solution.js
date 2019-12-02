const fs = require('fs');
module.exports = class Run {
  loadData() {
    this.data = fs.readFileSync('./input.txt', 'UTF-8');
  }

  getSolution() {
    const arr = this.data.split("\n");
    let total = 0;
    let x = 0;
    arr.forEach((item) => {
      x++;
      total += this.calculateFuel(item);
    });
    console.log(`X is ${x}`);
    return total;
  }
  
  calculateFuel(mass) {
    let x = Math.floor(mass/3) - 2;
    let total = 0;
    while (x > 0) {
      total += x;
      x = Math.floor(x/3) - 2;
    }
    return total;
  }
  
  writeData() {
    fs.writeFileSync('./output.txt', this.data);
  }
}