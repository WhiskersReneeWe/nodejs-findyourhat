const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// Field class
class Field {
  constructor(field){
    this.field = field;
    this.currLoc = [0,0];
  }

  print() {
    return this.field.map(row => row.join(' ')).join('\n');

    // let result = '';
    // for (let row of this.field) {
    //   let rowString = '';
    //   for (let cell of row) {
    //     rowString += cell + ' ';  
    //   }
    //   console.log(rowString);
    //   result += rowString + '\n';
    // }
    // return result;
  }

  getWidth () {
    return this.field[0].length
  }

  getHeight () {
    return this.field.length
  }

  getCurrentLocAfterMovingTo(moveDirection) {
    // let currLoc = [0, 0];
    if (moveDirection === 'u'){
      if (this.currLoc[0] === 0){
        console.log("You can\'t move up.");
      } else {
        // can move up and update currLoc
        console.log("Great! You can move Up!")
        this.currLoc = [this.currLoc[0]-1, this.currLoc[1]]
      }
      // return currLoc;
      } 
      
      if (moveDirection === 'l') {
        if(this.currLoc[1] === 0){
          console.log("You can\'t move left.");
        } else {
          // can move left and update currLoc
          console.log("Great! You can move Left!")
          this.currLoc = [this.currLoc[0], this.currLoc[1] - 1]
        }
      } 
      
      if(moveDirection === 'r'){
          if(this.currLoc[1] === this.getWidth()){
            console.log("You can\'t move right.");
          } else {
        // can move Right and update currLoc
        console.log("Great! You can move Right!")
          this.currLoc = [this.currLoc[0], this.currLoc[1] + 1]
      }
      }

      if (moveDirection === 'd'){
        if(this.currLoc[0] === this.getHeight()){
          console.log("You can\'t move down.");
        } else {
        // can move Down and update currLoc
          console.log("Great! You can move down!")
          this.currLoc = [this.currLoc[0] + 1, this.currLoc[1]];
      }
      } 
      console.log(`The value at your chosen location is ${this.field[this.currLoc[0]][this.currLoc[1]]}`);
      return this.currLoc;
    }

    getCurrentMapField(currLocRow, currLocCol) {
      this.field[currLocRow][currLocCol] = '*';
      const currFieldMap = new Field(this.field);
      return currFieldMap;
    }

    getHatLocation() {
        // return this.field.map(row => row.indexOf('^'));
        let hatLoc = [];
        for (let row of this.field){
            if (row.indexOf('^') !== -1){
            hatLoc = [this.field.indexOf(row), row.indexOf('^')];
            }
        }
        return hatLoc;
    }

    getHolesLocation() {
        let holesLoc = [];

        // Loop through rows
        for (let i = 0; i < this.field.length; i++) {

        // Loop through columns 
        for (let j = 0; j < this.field[i].length; j++) {

            // Check for match
            if (this.field[i][j] === '0') {
                holesLoc.push([i, j]); // Push row, col for match
            }

        }

        }
        return holesLoc;
    }

    isCurrLocInHole() {
        const [currLocRow, currLocCol] = this.currLoc;
        const holesLoc = this.getHolesLocation();
        for (let holeLoc of holesLoc) {
            if (JSON.stringify(holeLoc) === JSON.stringify(this.currLoc)){
                return true;
            }
        }
        return false;
    }


}

const myField = new Field(
  [
    ['*', '░', '░', '0'],
    ['░', '0', '░', '░'],
    ['░', '^', '░', '0'],
  ]
);

myField.print();
console.log(`Starting field is \n ${myField.print()}`);
const [hatLocRow, hatLocCol] = myField.getHatLocation();
console.log(`The locations of the first hole is ${myField.getHolesLocation()[0]}`);
const [firstHoleR, firstHoleC] = myField.getHolesLocation()[0]; 
console.log(`${JSON.stringify([firstHoleR, firstHoleC]) === JSON.stringify([0,3])}`);
// console.log(`The hat is at ${[hatLocRow, hatLocCol]} and the symbol is ${myField.field[hatLocRow][hatLocCol]}`);
// const moveDirection = prompt("Which way do you want to move? u,d,l,r?");
// console.log(`You want to move ${moveDirection}`);
// const currLoc = myField.getCurrentLocAfterMovingTo(moveDirection);
// console.log(`Your current location is ${currLoc}`);
// const currFieldMap = myField.getCurrentMapField(currLoc);
// console.log(`Your current map looks like ${currFieldMap.print()}`);
// console.log(`The hat is at [2,1], the symbol is ${myField.field[2][1]}`);

// let findHat = false;
// const [hatLocRow, hatLocCol] = myField.getHatLocation();

// while(!findHat) {
//     console.log(`Starting field is \n ${myField.print()}`);
//     const moveDirection = prompt("Which way do you want to move? u,d,l,r?");
//     console.log(`You want to move ${moveDirection}`);
//     const [currLocRow, currLocCol] = myField.getCurrentLocAfterMovingTo(moveDirection);
    
//     const currFieldMap = myField.getCurrentMapField(currLocRow, currLocCol);
//     console.log(`Your current location is ${[currLocRow, currLocCol]} and The value at current location in the original map is ${myField.field[currLocRow][currLocCol]}`);
//     console.log(`Your current map looks like ${currFieldMap.print()}`);
//     if (currLocRow === hatLocRow && currLocCol === hatLocCol) {
//       console.log("You found the hat!");
//       findHat = true;
//     }
//     else {
//         console.log('Sorry, keep moving!');
//       }
// }