/*
Run server to persist data
routers in separate files
*/
const express = require('express');
const database = require('./db/database.js');
const path = require('path');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const session = require('express-session');
const csv = require('csvtojson');

// create express instance
const app = express();

// route handlers
const userRoutes = require('./routes/userRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const slideRoutes = require('./routes/slideRoutes');
const classRoutes = require('./routes/classRoutes');
const utilRoutes = require('./routes/utilRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const quizRoutes = require('./routes/quizRoutes');
const findSlidesRoutes = require('./routes/findSlides');
const checkAuth = require('./checkAuth');


// morgan for logging and body parser to parse requests
app.use(morgan('tiny'));
app.use(bodyparser.json());

// set cookie for auth
app.use(session({
  secret: 'super secret',
  cookie: {
    maxAge: 6000000,
    secure: false,
    httpOnly: false
  }
}))

// public file with static routes
app.use(express.static('../frontend/public'));

// app.use(express.static(__dirname + 'frontend/public'));
//add path.join dirname
// -------------------AUTH------------------------- //
app.get('/logout', checkAuth.logout);
app.post('/users', checkAuth.createAccount);
app.post('/login', checkAuth.attemptLoggin);


app.use(checkAuth.checkUser);
app.post('/upload', (req, res) => {
  let csvStr = req.body.result
  let result = []
  csv()
    .fromString(csvStr)
    .on('json',(jsonObj)=>{
      result.push(jsonObj)
     })
    .on('done',()=>{
      res.send(result)
    })
})


// ------------------------------------------------ //

// handle protected routes
app.all('/slides', slideRoutes);
app.all('/slides/*', slideRoutes);
app.all('/users', userRoutes);
app.all('/users/*', userRoutes);
app.all('/lessons', lessonRoutes);
app.all('/lessons/*', lessonRoutes);
app.all('/lesson', lessonRoutes);
app.all('/lesson/*', lessonRoutes);
app.all('/query', utilRoutes);
app.all('/classes', classRoutes);
app.all('/applications', applicationRoutes)
app.all('/quiz', quizRoutes);
app.all('/findslides', findSlidesRoutes)
// redirect any uncaught routes
app.use((req, res) => {
  res.redirect('/');
});

app.get('*', function(req, res) {
  res.status(404).send();
})
// server listens for requests
app.listen(process.env.PORT || 3000);
