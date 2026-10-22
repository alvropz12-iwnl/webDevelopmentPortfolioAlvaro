const express = require("express");
const ejs = require("ejs");
const path = require("path");

const app = express();
const names = [];
const tasks = [];

app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "html"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/js", express.static(path.join(__dirname, "js")));

function showIndex(res, error = "", status = 200) {
  res.status(status).render("index", { names, tasks, error });
}

function readText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validIndex(value, list) {
  return typeof value === "string" && /^\d+$/.test(value) &&
    Number(value) < list.length;
}

app.get("/", (req, res) => {
  showIndex(res);
});

app.get("/greet", (req, res, next) => {
  // An index opens the greeting for a registered person.
  if (req.query.index !== undefined) {
    if (!validIndex(req.query.index, names)) {
      const error = new Error("That person is not in the list.");
      error.status = 404;
      return next(error);
    }

    return res.render("wazzup", { name: names[Number(req.query.index)] });
  }

  const name = readText(req.query.name);

  if (!name) {
    return showIndex(res, "Please enter a name.", 400);
  }

  console.log(name);
  names.push(name);
  res.redirect(303, "/");
});

app.put("/greet", (req, res) => {
  const name = readText(req.query.name);

  if (!name) {
    return res.status(400).json({ error: "Please enter a name." });
  }

  names.push(name);
  res.json(names);
});

app.get("/task", (req, res) => {
  res.json(tasks);
});

app.post("/task", (req, res) => {
  const task = readText(req.body.task);

  if (!task) {
    return showIndex(res, "Please enter a task.", 400);
  }

  tasks.push(task);
  res.redirect(303, "/");
});

app.delete("/task/:index", (req, res) => {
  if (!validIndex(req.params.index, tasks)) {
    return showIndex(res, "That task is not in the list.", 404);
  }

  tasks.splice(Number(req.params.index), 1);
  res.redirect(303, "/");
});

app.post("/task/:index/move", (req, res) => {
  if (!validIndex(req.params.index, tasks)) {
    return showIndex(res, "That task is not in the list.", 404);
  }

  const direction = req.body.direction;

  if (direction !== "up" && direction !== "down") {
    return showIndex(res, "Please choose up or down.", 400);
  }

  const index = Number(req.params.index);
  const nextIndex = index + (direction === "up" ? -1 : 1);

  // Only move the task when there is a neighbor in that direction.
  if (nextIndex >= 0 && nextIndex < tasks.length) {
    const task = tasks[index];
    tasks[index] = tasks[nextIndex];
    tasks[nextIndex] = task;
  }

  res.redirect(303, "/");
});

app.use((error, req, res, next) => {
  showIndex(res, error.status === 404 ? error.message : "The request could not be completed.", error.status || 500);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
