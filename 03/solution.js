const fs = require('fs');
let currentLocation = {"x": 0, "y": 0};
let breadcrumbs = new Set();
let cross = new Set();
let distance = {};

module.exports = class Run {
  loadData() {
    return fs.readFileSync('./input.txt', 'UTF-8');
  }
  
  getSolution() {
    let data = this.loadData();
    let row = data.split("\n");
    let moves = row[0].split(",");
    moves.forEach((m) => {
      this.moveGrid(m);      
    });
    currentLocation = {"x": 0, "y": 0}; 
    let movesDeux = row[1].split(",");
    movesDeux.forEach((m) => {
      this.moveGridDeux(m);      
    });
    let dist = 0;
    let recordDist = 99999999999;
    /*
    cross.forEach((c) => {
      dist = this.taxiDistance(c);
      if (dist < recordDist && dist != 0) {
        recordDist = dist;
      }
    });
    */
    moves.forEach((m) => {
      this.moveGridA(m);      
    });
    movesDeux.forEach((m) => {
      this.moveGridB(m);      
    });
    return recordDist;
  }
  
  taxiDistance(coord) {
    let x = parseInt(coord.split(",")[0]);
    let y = parseInt(coord.split(",")[1]);
    return Math.abs(x) + Math.abs(y);
  }
  
  moveGrid(vector) {
    let direction = vector.substring(0,1);
    let distance = this.calcDistance(vector);
    if (direction == "U") {
      this.dropBreadcrumbs("y", distance);
      currentLocation.y += distance;
    } else if (direction == "D") {
      this.dropBreadcrumbs("y", distance * -1);
      currentLocation.y -= distance;
    } else if (direction == "R") {
      this.dropBreadcrumbs("x", distance);
      currentLocation.x += distance;
    } else if (direction == "L") {
      this.dropBreadcrumbs("x", distance * -1);
      currentLocation.x -= distance;
    } 
  }
  
  moveGridA(vector) {
    let direction = vector.substring(0,1);
    let distance = this.calcDistance(vector);
    let travel = 0;
    if (direction == "U") {
      this.dropBreadcrumbs("y", distance);
      currentLocation.y += distance;
    } else if (direction == "D") {
      this.dropBreadcrumbs("y", distance * -1);
      currentLocation.y -= distance;
    } else if (direction == "R") {
      this.dropBreadcrumbs("x", distance);
      currentLocation.x += distance;
    } else if (direction == "L") {
      this.dropBreadcrumbs("x", distance * -1);
      currentLocation.x -= distance;
    } 
  }
  
  moveGridDeux(vector) {
    let direction = vector.substring(0,1);
    let distance = this.calcDistance(vector);
    if (direction == "U") {
      this.recordIntersection("y", distance);
      currentLocation.y += distance;
    } else if (direction == "D") {
      this.recordIntersection("y", distance * -1);
      currentLocation.y -= distance;
    } else if (direction == "R") {
      this.recordIntersection("x", distance);
      currentLocation.x += distance;
    } else if (direction == "L") {
      this.recordIntersection("x", distance * -1);
      currentLocation.x -= distance;
    } 
  }
  
  dropBreadcrumbs(axis, distance) {
    let i = 0;
    if (axis == "x") {
      if (distance > 0) {
        i = currentLocation.x + 1;
        while (i <= (currentLocation.x + distance)) {
          breadcrumbs.add(i + "," + currentLocation.y);
          i++;
        }
      } else {
        i = currentLocation.x - 1;
        while (i >= (currentLocation.x + distance)) {
          breadcrumbs.add(i + "," + currentLocation.y);
          i--;
        }
      }
    } else if (axis == "y") {
      if (distance > 0) {
        i = currentLocation.y + 1;
        while (i <= (currentLocation.y + distance)) {
          breadcrumbs.add(currentLocation.x + "," + i);
          i++;
        }
      } else {
        i = currentLocation.y - 1;
        while (i >= (currentLocation.y + distance)) {
          breadcrumbs.add(currentLocation.x + "," + i);
          i--;
        }
      }
    }
  }
  
  recordIntersection(axis, distance) {
    let i = 0;
    if (axis == "x") {
      if (distance > 0) {
        i = currentLocation.x + 1;
        while (i <= (currentLocation.x + distance)) {
          if(breadcrumbs.has(i + "," + currentLocation.y)) cross.add(i + "," + currentLocation.y);
          i++;
        }
      } else {
        i = currentLocation.x - 1;
        while (i >= (currentLocation.x + distance)) {
          if(breadcrumbs.has(i + "," + currentLocation.y)) cross.add(i + "," + currentLocation.y);
          i--;
        }
      }
    } else if (axis == "y") {
      if (distance > 0) {
        i = currentLocation.y + 1;
        while (i <= (currentLocation.y + distance)) {
          if(breadcrumbs.has(currentLocation.x + "," + i)) cross.add(currentLocation.x + "," + i);
          i++;
        }
      } else {
        i = currentLocation.y - 1;
        while (i >= (currentLocation.y + distance)) {
          if(breadcrumbs.has(currentLocation.x + "," + i)) cross.add(currentLocation.x + "," + i);
          i--;
        }
      }
    }
  }
  
  myLocation() {
    return currentLocation;
  }
  
  myBreadcrubs() {
    return breadcrumbs;
  }
  
  calcDistance(vector) {
    return parseInt(vector.substring(1, vector.length));
  }
  
  
  
  writeData() {
    fs.writeFileSync('./output.txt', this.data);
  }
}
