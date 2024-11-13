const express = require("express");
const MysqlConnection = require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  // SQL query to insert the data into the database
  const query = "Select * from student.user;";

  MysqlConnection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data from the database");
      return;
    }
    res.render("pages/home", { users: results });
  });
});

app.get("/add", (req, res) => {
  res.render("pages/form");
});

app.post("/submit-form", (req, res) => {
  const { username, email } = req.body;

  // SQL query to insert the data into the database
  const query = "INSERT INTO student.user (username, email) VALUES (?, ?)";

  MysqlConnection.query(query, [username, email], (err, results) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Error saving data to the database");
      return;
    }
    res.redirect("/");
  });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
