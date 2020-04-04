var row = 0, col = 0;
module.exports = function solveSudoku(matrix) {
  // your solution
  //return solve(matrix) ? matrix : false;

  /*let matrix = [
    [6, 5, 0, 7, 3, 0, 0, 8, 0],
    [0, 0, 0, 4, 8, 0, 5, 3, 0],
    [8, 4, 0, 9, 2, 5, 0, 0, 0],
    [0, 9, 0, 8, 0, 0, 0, 0, 0],
    [5, 3, 0, 2, 0, 9, 6, 0, 0],
    [0, 0, 6, 0, 0, 0, 8, 0, 0],
    [0, 0, 9, 0, 0, 0, 0, 0, 6],
    [0, 0, 7, 0, 0, 0, 0, 5, 0],
    [1, 6, 5, 3, 9, 0, 4, 7, 0]
  ];*/

  if (solve(matrix)) {
    //printMatrix(matrix);
    return matrix;
  } else {
    console.log("no solution");
  }
}

function unassigned_spot(matrix) {
  let list = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] == 0)
        return [i, j]; // row, col
    }
  }
  return [-1, -1]; // no 0's 
}



function isUsedInCol(matrix, col, num) {
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][col] == num) {
      return true;
    }
  }
  return false;
}

function isUsedInRow(matrix, row, num) {
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[row][i] == num) {
      return true;
    }
  }
  return false;
}

function isUsedInBox(matrix, new_row, new_col, num) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (matrix[i + new_row][j + new_col] == num) return true;
    }
  }
  return false;
}

function isSafe(matrix, row, col, num) {
  return (!isUsedInRow(matrix, row, num) &&
    !isUsedInCol(matrix, col, num) &&
    !isUsedInBox(matrix, (row - row % 3), (col - col % 3), num)) &&
    (matrix[row][col] == 0);
}


function solve(matrix) {
  let cell = unassigned_spot(matrix);
  if (cell[0] == "-1" || cell[1] == "-1") return true; // no zeros left
  for (let num = 0; num <= 9; num++) {
    if (isSafe(matrix, cell[0], cell[1], num)) {
      matrix[cell[0]][cell[1]] = num; // try number
      if (solve(matrix)) {
        return true;
      }
      else {
        matrix[cell[0]][cell[1]] = 0; // replace number with 0 try again
      }
    }
  }
  return false; // the current state isn't possible to solve
}

function printMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    let line = "";
    for (let j = 0; j < matrix.length; j++) {
      line += matrix[i][j] + " ";
    }
    console.log(line);
  }
}