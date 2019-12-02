const fs = require('fs');
module.exports = class Run {
  loadData() {
    this.data = fs.readFileSync('./input.txt', 'UTF-8');
  }

  getSolution() {
    const arr = this.data.split(",");
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

  }
  
  writeData() {
    fs.writeFileSync('./output.txt', this.data);
  }
}