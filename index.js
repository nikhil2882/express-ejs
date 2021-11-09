const express = require('express')
const app = express()
const port = 3000

var session = require('express-session');

app.use(express.static("public"))

app.set('view engine', 'ejs');
//app.set('views', __dirname+"/abc");

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use(express.urlencoded({ extended:true }));

app.get('/', (req, res) => 
{
  const { username } = req.session;

  if(!username)
  {
    res.redirect("/login");
    return
  }

  res.render("home", { name: username, books: ["jungle book", "harry potter", "0 to 1" , "the secret"] });
})



app.get("/login", function(req, res)
{
  res.sendFile(__dirname+"/views/login.html");
})

app.post("/login", function(req, res)
{
  const { username } = req.body;
  //const username = req.body.username;

  req.session.username = username;

  res.redirect("/")
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
