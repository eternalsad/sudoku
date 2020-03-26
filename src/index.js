module.exports = function solveSudoku(matrix) {
  // your solution
  //return solve(matrix) ? matrix : false;
  let ans = solve(matrix);
  //printMatrix(matrix);
  return matrix;
}

var row = 0, col = 0;
function solve(matrix) {
  //let row = 0, col = 0;
  if (!findUnassignedLocation(matrix)) return true;
  for (let num = 1; num <= 9; num++) {
    if (isSafe(matrix, row, col, num)) {
      matrix[row][col] = num;
      if (solve(matrix)) {
        return true;
      }
      matrix[row][col] = 0;
    }
  }
  return false;
}

function findUnassignedLocation(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] == 0) {
        row = i;
        col = j;
        return true;
      }
    }
  }
  return false;
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
function printMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i]);
  }
}