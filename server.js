var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var dbURL = 'mongodb+srv://user:user@learning-node.ispphkp.mongodb.net/?retryWrites=true&w=majority';

// define Model
var Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        if (err)
            res.send(500);

        res.send(messages);
    })
});
app.post('/messages', (req, res) => {
    var message = new Message(req.body);

    message.save()
        .then(() => {
            console.log('saved');
            return Message.findOne({ message: 'badword' });
        })
        .then((censored) => {
            if (censored) {
                console.log('Censored words found', censored.message);
                return Message.deleteOne({ _id: censored.id });
            }

            io.emit('message', req.body);
            res.sendStatus(200);
        })
        .catch(err => {
            sendStatus(500);
            return console.error(err);
        })

});

Message.findOne({ message: 'badword' }, (err, censored) => {


})


io.on('connection', (socket) => {
    console.log('a user connected');
});

mongoose.connect(dbURL, (err) => {
    console.log('MongoDB connected', err);
});

var server = http.listen(4000, () => {
    console.log('Server is listening on port: ' + server.address().port);
});