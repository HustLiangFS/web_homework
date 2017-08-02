var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());

var jsonParser = bodyParser.json()

var id = 0;
var students = {
    data: []
};
 
app.post('/info/all', jsonParser, function (req, res) {
    res.send(JSON.stringify(students));
});

app.post('/info/add', jsonParser, function (req, res) {
    var body = req.body;
    students.data.push({
        id: id++,
        name: body.name,
        number: body.number,
        phone: body.phone
    });

    res.send(JSON.stringify({
        status: 1
    }));
});

app.post('/info/delete', jsonParser, function (req, res) {
    var userId = req.body.id;
    for (var i = 0; i < students.data.length; i++) {
        if (students.data[i].id == userId) {
            students.data.splice(i, 1);
            break;
        }
    }

    res.send(JSON.stringify({
        status: 1
    }));
});

app.post('/info/modify', jsonParser, function (req, res) {
    var body = req.body;

    for (var i = 0; i < students.data.length; i++) {
        if (students.data[i].id == body.id) {
            students.data[i].name = body.name;
            students.data[i].number = body.number;
            students.data[i].phone = body.phone;
            break;
        }
    }

    res.send(JSON.stringify({
        status: 1
    }));
});

var server = app.listen(8888, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server listening at http://%s:%s", host, port);
});
