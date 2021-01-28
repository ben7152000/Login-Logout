const express = require('express')
const app = express()
const PORT = 3000
const exphbs = require('express-handlebars')
const router = require('./routes/index')

// Express-Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// setting router
app.use(router)

app.listen(PORT, console.log(`The server is running on localhost${PORT}`))
