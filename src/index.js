module.exports = function solveSudoku(matrix) {
  // your solution
  //return solve(matrix) ? matrix : false;
  let ans = solve(matrix);
  if (ans) return matrix;
}
let row, col;

function solve(matrix) {
  if (!findUnassignedLocation(matrix)) return true;
  for (let num = 1; num < 10; num++) {
    if (isSafe(matrix, num)) {
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
  for (row = 0; row < matrix.length; row++) {
    for (col = 0; col < matrix.length; col++) {
      if (matrix[row][col] == 0) return true;
    }
  }
  return false;
}

function isUsedInCol(matrix, num) {
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][col] == num) {
      return true;
    }
  }
  return false;
}

function isUsedInRow(matrix, num) {
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[row][i] == num) {
      return true;
    }
  }
  return false;
}

function isUsedInBox(matrix, num) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (matrix[i + row][j + col] == num) return true;
    }
  }
  return false;
}

function isSafe(matrix, num) {
  return (!isUsedInRow(matrix, num) &&
    !isUsedInCol(matrix, num) &&
    !isUsedInBox(matrix, num)) ? true : false;
}