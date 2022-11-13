var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let messages = [
    {name: 'Sypriano', message: 'Hello, guys'},
    {name: 'Victor', message: 'Hello, gurys'},
]

app.get('/messages', (req, res) => {
    res.send(messages);
});
app.post('/messages', (req, res) => {
    console.log(req.body);
    messages.push(req.body);
    res.sendStatus(200);
});

var server = app.listen(4000, () => {
    console.log('Server is listening on port: ' + server.address().port);
});