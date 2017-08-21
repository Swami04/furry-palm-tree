const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000; //Heroku sets environment variable, if not, use 3000
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); //app.use is how to register middleware

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Raj',
  //   likes: [
  //     'Swimming',
  //     'Yoga'
  //   ]
  // });
  res.render('home.hbs', {
    welcomeMessage: "Welcome to our website",
    pageTitle: 'Home Page',
//    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
//  res.send('About Page');
res.render('about.hbs', {
  pageTitle: 'About Page',
//  currentYear: new Date().getFullYear()
});
});

app.get('/projects', (req, res) => {
res.render('projects.hbs', {
  pageTitle: 'Projects Page',
});
});

app.get('/bad', (req, res) => {
  res.send({
    errorCode: '405',
    errorMessage:'Error handling request'});
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
