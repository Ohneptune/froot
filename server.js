require("dotenv").config();
const express = require("express");
const app = express();
// const fruits = require("./models/fruits");
const Fruit = require("./models/fruits");
const mongoose = require("mongoose");

app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
// ===== Connection to Database ===== //
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});
// ===== Middleware ===== //
app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});
app.use(express.urlencoded({ extended: false }));

// ===== Routes ===== //
// I.N.D.U.C.E.S
// Index, New, Delete, Update, Create, Edit, Show

// Index
app.get("/fruits", (req, res) => {
  Fruit.find({}, (error, allFruits) => {
    res.render("Index", {
      fruits: allFruits,
    });
  });
});

// New
app.get("/fruits/new", (req, res) => {
  res.render("New");
});

// Delete

// Update

// Create
app.post("/fruits", (req, res) => {
  if (req.body.readyToEat === "on") {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true; //do some data correction
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false; //do some data correction
  }

  Fruit.create(req.body, (error, createdFruit) => {
    res.redirect('/fruits');
  });
});

// Edit

// Show used to get individual fruit
app.get("/fruits/:id", (req, res) => {
  Fruit.findById(req.params.id, (err, foundFruit) => {
    res.render('Show', {
      fruit: foundFruit
    });
  });
});

//run server test to see if works
app.listen(3000, () => {
  console.log("listening");
});