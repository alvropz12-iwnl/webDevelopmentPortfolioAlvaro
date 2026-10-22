const sw = require("star-wars-quotes");
const superheroes = require("superheroes");
const supervillains = require("supervillains");
const fs = require("fs");

console.log("Hello, world");
console.log(sw());
console.log(`${superheroes.random()} battles ${supervillains.random()}!`);
console.log(fs.readFileSync(`${__dirname}/data/input.txt`, "utf8"));
