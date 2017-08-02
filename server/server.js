var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'web_homework'
});
connection.connect();
//var insertsql = 'insert into web_table (number,name,phone) values (body.body.name,students.body.phone)';
//var deletesql = 'delete from web_table where number = students.data[i].number and name = students.data[i].name and phone = students.data[i].phone';

app.use(cors());

var jsonParser = bodyParser.json()

var id = 1;
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
    
    var insertsql = 'insert into web_table (number,name,phone) values (students.data.number,students.data.name,students.data.phone)';
    //connection.connect();
    connection.query(insertsql, function (err0, res0) {
    if (err0){
        console.log(err0);
    } 
    else{
        console.log("Insert Return ==> ");
        console.log(res0);
    }
    
    });
    //connection.end();

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

    //connection.connect();
    /*connection.query(deletesql, function (err1, res1) {
    if (err0) console.log(err0);
    console.log("DELETE Return ==> ");
    console.log(res1);
    });*/
    //connection.end();

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
