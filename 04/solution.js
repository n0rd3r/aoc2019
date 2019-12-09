const fs = require('fs');


module.exports = class Run {
  loadData() {
    return fs.readFileSync('./input.txt', 'UTF-8');
  }
  
  getSolution() {
    //let data = this.loadData();
    let x = 0
    let i = 231832
    while (i <= 767346) {
      if(this.testNumber(i)) x++;
      i++;
    }
    return x;
  }
  
  testNumber(i) {

    return this.hasRepeat(i.toString()) && !this.hasDecrease(i.toString())
    && this.oneHasTwo(i.toString());
  }
  
  hasRepeat(x) {
    let prev = "";
    for (let i=0; i<x.length;i++) {
      if (prev == x[i]) return true;
      prev = x[i];
    }
    return false;
  }
  
  hasDecrease(x) {
    let prev = 0;
    for (let i=0; i<x.length;i++) {
      if (prev > parseInt(x[i])) return true;
      prev = x[i];
    }
    return false;
  }
  
  oneHasTwo(x) {
    let map = new Map();
    let value = 0
    for (let i=0; i<x.length;i++) {

      value = map.get(x[i]);
      if(value == undefined) {
        map.set(x[i], 1);
        
      } else {
        map.set(x[i], ++value);
      }
    }

    for (var [k, v] of map) {
      if (v == 2) return true;
    }
    return false
  }
  
  writeData() {
    fs.writeFileSync('./output.txt', this.data);
  }
}
