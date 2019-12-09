const fs = require('fs');
let currentLocation = {"x": 0, "y": 0};
let breadcrumbs = new Set();
let cross = new Set();
let travel = {};
let travelA = 0;
let travelB = 0;

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
    currentLocation = {"x": 0, "y": 0}; 
    moves.forEach((m) => {
      this.moveGridA(m);      
    });
    currentLocation = {"x": 0, "y": 0}; 
    movesDeux.forEach((m) => {
      this.moveGridB(m);      
    });
    //console.log(cross);
     let min = 9999999999;
    let total = 0;
    let answer = ""
    for (var key in travel) {
      total = travel[key].a + travel[key].b;
      if (total < min) min = total;
    }
    console.log(travel);
    return min; //341 is too low, 167846 is too high
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
      this.recordTravelA("y", distance);
      currentLocation.y += distance;
    } else if (direction == "D") {
      this.recordTravelA("y", distance * -1);
      currentLocation.y -= distance;
    } else if (direction == "R") {
      this.recordTravelA("x", distance);
      currentLocation.x += distance;
    } else if (direction == "L") {
      this.recordTravelA("x", distance * -1);
      currentLocation.x -= distance;
    } 
  }
  
  moveGridB(vector) {
    let direction = vector.substring(0,1);
    let distance = this.calcDistance(vector);
    let travel = 0;
    if (direction == "U") {
      this.recordTravelB("y", distance);
      currentLocation.y += distance;
    } else if (direction == "D") {
      this.recordTravelB("y", distance * -1);
      currentLocation.y -= distance;
    } else if (direction == "R") {
      this.recordTravelB("x", distance);
      currentLocation.x += distance;
    } else if (direction == "L") {
      this.recordTravelB("x", distance * -1);
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
  
  recordTravelA(axis, distance) {
    let i = 0;

    if (axis == "x") {
      if (distance > 0) {
        i = currentLocation.x + 1;
        while (i <= (currentLocation.x + distance)) {
          travelA++;
          if(cross.has(i + "," + currentLocation.y)) {
            if (travel[i + "," + currentLocation.y] == undefined) travel[i + "," + currentLocation.y] = {};
            if (travel[i + "," + currentLocation.y].a  == undefined) {
              travel[i + "," + currentLocation.y].a = travelA; 
            }
          }
          i++;
        }
      } else {
        i = currentLocation.x - 1;
        while (i >= (currentLocation.x + distance)) {
          travelA++;
          if(cross.has(i + "," + currentLocation.y)) {
            if (travel[i + "," + currentLocation.y] == undefined) travel[i + "," + currentLocation.y] = {};
            if (travel[i + "," + currentLocation.y].a  == undefined) {
              travel[i + "," + currentLocation.y].a = travelA; 
            }
          }
          i--;
        }
      }
    } else if (axis == "y") {
      if (distance > 0) {
        i = currentLocation.y + 1;
        while (i <= (currentLocation.y + distance)) {
          travelA++;
          if(cross.has(currentLocation.x + "," + i)) {
            if (travel[currentLocation.x + "," + i] == undefined) travel[currentLocation.x + "," + i] = {};
            if(travel[currentLocation.x + "," + i].a  == undefined) {
              travel[currentLocation.x + "," + i].a = travelA; 
            }
          }
          i++;
        }
      } else {
        i = currentLocation.y - 1;
        while (i >= (currentLocation.y + distance)) {
          travelA++;
          if(cross.has(currentLocation.x + "," + i)) {
            if (travel[currentLocation.x + "," + i] == undefined) travel[currentLocation.x + "," + i] = {};
            if (travel[currentLocation.x + "," + i].a  == undefined) {
              travel[currentLocation.x + "," + i].a = travelA; 
            }
          }
          i--;
        }
      }
    }
  }
  
  recordTravelB(axis, distance) {
    let i = 0;
    
    if (axis == "x") {
      if (distance > 0) {
        i = currentLocation.x + 1;
        while (i <= (currentLocation.x + distance)) {
          travelB++;
          if(cross.has(i + "," + currentLocation.y)) {
            if (travel[i + "," + currentLocation.y] == undefined) travel[i + "," + currentLocation.y] = {};
            if (travel[i + "," + currentLocation.y].b  == undefined) {
              travel[i + "," + currentLocation.y].b = travelB; 
            }
          }
          i++;
        }
      } else {
        i = currentLocation.x - 1;
        while (i >= (currentLocation.x + distance)) {
          travelB++;
          if(cross.has(i + "," + currentLocation.y)) {
            if (travel[i + "," + currentLocation.y] == undefined) travel[i + "," + currentLocation.y] = {};
            if (travel[i + "," + currentLocation.y].b  == undefined) {
              travel[i + "," + currentLocation.y].b = travelB; 
            }
          }
          i--;
        }
      }
    } else if (axis == "y") {
      if (distance > 0) {
        i = currentLocation.y + 1;
        while (i <= (currentLocation.y + distance)) {
          travelB++;
          if(cross.has(currentLocation.x + "," + i)) {
            if (travel[currentLocation.x + "," + i] == undefined) travel[currentLocation.x + "," + i] = {};
            if(travel[currentLocation.x + "," + i].b  == undefined) {
              travel[currentLocation.x + "," + i].b = travelB; 
            }
          }
          i++;
        }
      } else {
        i = currentLocation.y - 1;
        while (i >= (currentLocation.y + distance)) {
          travelB++;
          if(cross.has(currentLocation.x + "," + i)) {
            if (travel[currentLocation.x + "," + i] == undefined) travel[currentLocation.x + "," + i] = {};
            if (travel[currentLocation.x + "," + i].b  == undefined) {
              travel[currentLocation.x + "," + i].b = travelB; 
            }
          }
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
