const e = require("express");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/ig/cats`);
  console.log(`Server is running on http://localhost:${port}/rolldice`);
});

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/rolldice", (req, res) => {
  let roll = Math.floor(Math.random() * 6) + 1;
  res.render("home.ejs", { roll });
});

app.get("/ig/:username", (req, res) => {
  let { username } = req.params;
  const instadata = require("./data.json");
  const data = instadata[username];
  console.log(data);
  if (data) {
    res.render("instagram.ejs", { data });
  } else {
    res.status(404).send("User not found");
  }
});
