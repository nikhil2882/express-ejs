const express = require('express')
const session = require("express-session");
const app = express()
const port = 3000

console.log(process.env.DB_CONFIG)

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
//app.set("views", __dirname+"/abc")

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret:"random words"
}))

app.get("/", function(req, res) 
{
  if(!req.session.username)
  {
    res.redirect("/login");
    return
  }

  let books = [ "the jungle book", "harry potter", "abcd" , "xyz"];

  res.render("home", { name: req.session.username, books: books });
})

app.get("/login", function(req, res)
{
  res.sendFile(__dirname+"/views/login.html");
})

app.post("/login", function(req, res)
{
  console.log(req.body);

  req.session.username = req.body.username;

  res.redirect("/");
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
