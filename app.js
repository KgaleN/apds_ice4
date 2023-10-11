const express = require('express')
const app = express()
const mongoose = require('mongoose')

const fs = require('fs');
const cert = fs.readFileSync('keys/localhost.pem');
const options = {
server: {ssLCA: cert }};
const connstring = "mongodb connection string"

const post_route = require('./routes/post');

const user_route = require('./routes/user');

mongoose.connect(connstring)
.then(() =>
{
    console.log('Connected :-)')
})
.catch(() =>
{
console.log('NOT connected :-(')
},options);

app.use(express.json())

app.use((reg,res,next)=>
{
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
 res.setHeader('Access-Control-Allow-Methods', '*');
 next();
});



app.use('/app/posts', postRoutes)

app.use('/app/users', userRoutes)
 

module.exports = app;