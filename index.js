const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
//app.set('views', __dirname+"/abc");

app.get('/', (req, res) => 
{
  const { name , age} = req.query;

  res.render("home.ejs", { name: name, dob: 'xxxx-xx-xx', books:["harry potter","jungle book","abcd"] });
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
