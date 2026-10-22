const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", (req, res) => {
  const weight = Number(req.body.weight);
  const height = Number(req.body.height);

  if (
    !Number.isFinite(weight) || weight <= 0 ||
    !Number.isFinite(height) || height <= 0
  ) {
    return res.status(400).send(`
      <main style="font-family: Arial, sans-serif; margin: 2rem;">
        <h1>Invalid measurements</h1>
        <p>Enter a weight and height greater than zero.</p>
        <a href="/">Back to the calculator</a>
      </main>
    `);
  }

  const bmi = (weight / height ** 2) * 10000;

  res.send(`
    <main style="font-family: Arial, sans-serif; margin: 2rem;">
      <h1>Your BMI is ${bmi.toFixed(2)}</h1>
      <a href="/">Back to the calculator</a>
    </main>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
