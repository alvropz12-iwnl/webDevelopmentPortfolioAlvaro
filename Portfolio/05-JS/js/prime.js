/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

var getPrimeFactors = function (n) {
  "use strict";

  function isPrime(n) {
    var i;

    if (n < 2) {
      return false;
    }

    for (i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }

    return true;
  }

  var i,
    sequence = [];

  var valueCameFromPage = n === undefined;

  if (valueCameFromPage) {
    n = Number(document.getElementById("num").value);
  }

  if (!Number.isInteger(n) || n < 2) {
    if (valueCameFromPage) {
      document.getElementById("pf").textContent =
        "Please enter an integer greater than 1.";
    }

    return sequence;
  }

  //TODO: Check which numbers are factors of n and also check if
  // that number also happens to be a prime
  for (i = 2; i <= n; i++) {
    while (n % i === 0 && isPrime(i)) {
      sequence.push(i);
      n = n / i;
    }
  }

  if (valueCameFromPage) {
    document.getElementById("pf").textContent =
      sequence.join(", ");
  }

  return sequence;
};

// the prime factors for this number are: [ 2, 3, 5, 7, 11, 13 ]
console.log(getPrimeFactors(30030));