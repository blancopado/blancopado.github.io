var express = require('express');
var app = express();
var path = require("path");

app.use('/css', express.static(path.join(__dirname + '/css')));
app.use('/imagenes', express.static(path.join(__dirname + '/imagenes')));
app.use('/js', express.static(path.join(__dirname + '/js')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});