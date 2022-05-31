const express = require("express");
const app = express();
const connect = require("./server/database/database");

const hbs = require("express-handlebars");

const path = require("path");
const router = require("./server/router/router");
app.use(express.json());

//Serving static files
app.use(express.static(path.join(__dirname, "public")));

//Conect mongodb
connect();
//Setup view engine
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultView: "default",
    layoutsDir: path.join(__dirname, "views"),
    partialsDir: path.join(__dirname, "views/partials"),
  })
);

app.use("/", router);

app.listen(3000, () => {
  console.log(`Server is running on  http://localhost:3000`);
});
