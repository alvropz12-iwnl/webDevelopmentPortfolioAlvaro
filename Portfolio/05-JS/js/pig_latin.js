/*
Pig Latin
*/

function igpayAtinlay(str) {
  // TODO: Initialize the word array properly
  var returnArray = [],
    wordArray = str.trim().split(/\s+/);

  // TODO: make sure that the output is being properly built to produce the desired result.
  for (var i = 0; i < wordArray.length; i++) {
    var word = wordArray[i];
    var beginning = word.charAt(0);

    if (/[aeiouAEIOU]/.test(beginning)) {
      returnArray.push(word + "way");
      continue;
    }

    var firstVowelPosition = -1;

    for (var ii = 1; ii < word.length; ii++) {
      if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
        firstVowelPosition = ii;
        break;
      } else {
        beginning += word.charAt(ii);
      }
    }

    if (firstVowelPosition === -1) {
      returnArray.push(word + "ay");
    } else {
      returnArray.push(
        word.slice(firstVowelPosition) +
          beginning +
          "ay"
      );
    }
  }

  return returnArray.join(" ");
}

document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("btn");
  var input = document.getElementById("txtVal");
  var output = document.getElementById("pigLatLbl");

  button.addEventListener("click", function () {
    var text = input.value.trim();

    if (text === "") {
      output.textContent = "Please enter a word.";
      return;
    }

    output.textContent = igpayAtinlay(text);
  });
});

// Some examples of expected outputs
console.log(igpayAtinlay("pizza")); // "izzapay"
console.log(igpayAtinlay("apple")); // "appleway"
console.log(igpayAtinlay("happy meal")); // "appyhay ealmay"