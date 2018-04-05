
const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

//Making new express app
const app = express()


hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs')

app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
  var now = new Date().toString()
  var log1 = `${now} ${req.method} ${req.originalUrl}`
  console.log(log1);
  fs.appendFile('server.log', log1 + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
   })
  next()
})

app.use((req, res, next) => {
  res.render('maintenance.hbs')
})

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express !</h1>')
  /*res.send({
    name: 'Rashmi',
    likes: ['Movies',
            'Music',
            'Travelling'
          ]
  })*/
  res.render('home.hbs', {
    title: 'Welcome',
    pageTitle: 'Welcome Page',
    pagePara: 'Welcome to my website',

  })
})

// app.get('/about', (req, res) => {
//   res.send('<h1>About Page</h1>')
// })

app.get('/about', (req, res) => {
  //render renders any of template that is set up
  //res.render('about.hbs') //for static
  res.render('about.hbs', {
    pageTitle: 'About Page',

  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage:'Error message has arrived'
  })
})


//second parameter of listen is optional
app.listen(8080, () => {
 console.log('Server is up and running');
})
