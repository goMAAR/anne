const express = require('express');
const path = require ('path');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  console.log('hey im workin');
  res.send(200);
});

http.listen(3000, ()=>{
  console.log('listening on 3000');
});

module.exports = app;