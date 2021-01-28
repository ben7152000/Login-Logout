const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')

// Express-Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.listen(PORT, console.log(`The server is running on localhost${PORT}`))
