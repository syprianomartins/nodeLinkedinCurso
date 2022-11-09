var express = require('express');

var app = express();

app.use(express.static(__dirname));

let messages = [
    {name: 'Sypriano', message: 'Hello, guys'},
    {name: 'Victor', message: 'Hello, gurys'},
]

app.get('/messages', (req, res) => {
    res.send(messages);
});

var server = app.listen(4000,'192.168.3.39', () => {
    console.log('Server is listening on port: ' + server.address().port);
});