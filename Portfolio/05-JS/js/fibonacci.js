/*
    Fibonacci Sequence - Enter a number and have the program
    generate the Fibonacci sequence to that number or to the Nth number.
*/

// This array will keep memory of the previous fibonacci numbers
var memo = {};

function fibonacci() {
  "use strict";

  var input = document.getElementById("num");
  var resultLabel = document.getElementById("fibonacciLbl");
  var n = Number(input.value);

  if (!Number.isInteger(n) || n < 0) {
    resultLabel.textContent =
      "Please enter a non-negative integer.";

    return;
  }

  var val = f(n);

  resultLabel.textContent =
    "Fibonacci(" + n + ") = " + val;

  return val;
}

function f(n) {
  n = Number(n);

  var value;

  // Check if the memory array already contains the requested number
  if (memo.hasOwnProperty(n)) {
    value = memo[n];
  } else {
    //TODO: Implement the fibonacci function here!
    if (n === 0) {
      value = 0;
    } else if (n === 1) {
      value = 1;
    } else {
      value = f(n - 1) + f(n - 2);
    }

    memo[n] = value;
  }

  return value;
}

document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("btn");

  button.addEventListener("click", fibonacci);
});

console.log(f(15));