const express = require("express");
const app = express();
const port = 5500;
const { engine } = require("express-handlebars");
const path = require("path");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "Resource/VIEWS"));
app.use("/img", express.static("img"));
app.use(express.static(path.join(__dirname, "PUBLIC/CSS/")));
app.use(express.static(path.join(__dirname, "PUBLIC/JS/")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.render("index.hbs", {
    layout: "main.hbs",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
