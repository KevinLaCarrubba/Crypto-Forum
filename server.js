const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const session = require("express-session");
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  resave: false,
  saveUninitialized: false,
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(routes);

// sync sequelize models to the database, then turn on the server

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});

//add session for Server
