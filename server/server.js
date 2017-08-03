var express = require('express');
var mysql = require('mysql');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});
connection.connect();

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
        id: id,
        name: body.name,
        number: body.number,
        phone: body.phone
    });
    
    var insertsql = 'INSERT INTO test_table (id,number,name,phone) VALUES (?,?,?,?)';
    var insertparam = [id,body.number,body.name,body.phone];
    id++;
    //connection.connect();
    connection.query(insertsql,insertparam, function (err0, res0) {
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

    var deletesql = 'DELETE FROM test_table where id=?';
    var deleteparam = [userId];
    connection.query(deletesql, deleteparam, function (err1, res1) {
        if (err1){
            console.log(err1);
        }
        else{
            console.log("DELETE Return ==> ");
            console.log(res1);
        }

    });
    //connection.connect();
    /**/
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
    var modifysql = 'UPDATE test_table SET number = ?,name = ?,phone=? WHERE Id = ?'
    var modifyparam = [body.number,body.name,body.phone,body.id];
    connection.query(modifysql, modifyparam, function (err2, res2) {
        if (err2){
            console.log(err2);
        }
        else{
            console.log("MODIFY Return ==> ");
            console.log(res2);
        }

    });
    res.send(JSON.stringify({
        status: 1
    }));
});

var server = app.listen(8888, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server listening at http://%s:%s", host, port);
});
