const fs = require('fs');
module.exports = class Run {
  loadData() {
    this.data = fs.readFileSync('./input.txt', 'UTF-8');
    //this.data = "1,1,1,4,99,5,6,0,99";
  }

  calc(first, second) {
    const arr = this.data.split(",");
    arr[1] = first;
    arr[2] = second;
    let total = 0;
    let x = 0;
    for (let i = 0; i < arr.length; i = i + 4) {
      if (arr[i] == 1) {
        arr[parseInt(arr[i+3])] = parseInt(arr[parseInt(arr[i+1])]) + parseInt(arr[parseInt(arr[i+2])]);
      } else if (arr[i] == 2) {
        arr[parseInt(arr[i+3])] = parseInt(arr[parseInt(arr[i+1])]) * parseInt(arr[parseInt(arr[i+2])]);
      } else if (arr[i] == 99) {
        break;
      }
    }
    return arr[0];
  }
  
  getSolution() {
    for (let x = 0; x < 100; x++) {
      for (let y = 0; y < 100; y++) {
        //console.log(this.calc(x,y));
        if (this.calc(x,y) === 19690720) {
          return `x=${x} y${y}`;
        }
      }
    }
  }
  
  writeData() {
    fs.writeFileSync('./output.txt', this.data);
  }
}