const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
const items = ["eat", "code", "sleep", "repeat"];
const workItems = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/", function (req, res) {
  const day = date.getDate();
  res.render("list", { ListTitle: day, newlistItems: items });
});

app.post("/", function (req, res) {
  if (req.body.list === "work") {
    workItems.push(req.body.newitem);
    res.redirect("/work");
  } else {
    items.push(req.body.newitem);
    res.redirect("/");
  }
});
app.get("/work", function (req, res) {
  res.render("list", { ListTitle: "work", newlistItems: workItems });
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.listen(process.env.PORT || 3000, function () {
  console.log("server running on port 3000");
});
