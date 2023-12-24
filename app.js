const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT
const db = require('./db/index');
const path = require('path');
const logger = require('./logger');
const { validateUserCreation } = require('./users/user.middleware');
const { createUser } = require('./users/user.controller');
const sendBirthday = require('./cronHandler')

db.connect();

app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.set('views' , __dirname + '/views');


app.get('/', function(req, res, next){
    const error = req.query.error;
    const UserMessage = error ? new Error(decodeURIComponent(error)) : null;
    res.locals.UserMessage = UserMessage;
    res.render('index', {UserMessage});
});
app.post('/register', validateUserCreation, createUser)





// function to send birthday wishes
sendBirthday();



app.use((error, req, res, next) => {
    if (error.status == 404) return res.status(404).sendFile(404);
    res.status(error.status ?? 500)
    logger.error({ErrorHandler: error})
    res.send(error.message)
  })


app.listen(PORT, ()=>{
    logger.info (`server started at PORT: ${PORT}`)
});

module.exports = app;