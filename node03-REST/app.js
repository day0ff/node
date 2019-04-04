var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();
app.use(cors());
var jsonParser = bodyParser.json();
app.use(bodyParser.urlencoded({ extended: true }));

// For sending file.
var path = require('path');

// For uploading file.
const multer = require('multer');

app.use(express.static(__dirname + "/public"));
// получение списка данных
app.get("/api/users", function(req, res) {

  var content = fs.readFileSync("users.json", "utf8");
  var users = JSON.parse(content);
  res.send(users);
});
// получение одного пользователя по id
app.get("/api/users/:id", function(req, res) {

  var id = req.params.id; // получаем id
  var content = fs.readFileSync("users.json", "utf8");
  var users = JSON.parse(content);
  var user = null;
  // находим в массиве пользователя по id
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      user = users[i];
      break;
    }
  }
  // отправляем пользователя
  if (user) {
    res.send(user);
  } else {
    res.status(404).send();
  }
});
// получение отправленных данных
app.post("/api/users", jsonParser, function(req, res) {

  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  var userName = req.body.name;
  var userAge = req.body.age;
  var user = {
    name: userName,
    age: userAge
  };

  var data = fs.readFileSync("users.json", "utf8");
  var users = JSON.parse(data);

  // находим максимальный id
  var id = Math.max.apply(Math, users.map(function(o) {
    return o.id;
  }))
  // увеличиваем его на единицу
  user.id = id + 1;
  // добавляем пользователя в массив
  users.push(user);
  var data = JSON.stringify(users);
  // перезаписываем файл с новыми данными
  fs.writeFileSync("users.json", data);
  res.send(user);
});
// удаление пользователя по id
app.delete("/api/users/:id", function(req, res) {

  var id = req.params.id;
  var data = fs.readFileSync("users.json", "utf8");
  var users = JSON.parse(data);
  var index = -1;
  // находим индекс пользователя в массиве
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    // удаляем пользователя из массива по индексу
    var user = users.splice(index, 1)[0];
    var data = JSON.stringify(users);
    fs.writeFileSync("users.json", data);
    // отправляем удаленного пользователя
    res.send(user);
  } else {
    res.status(404).send();
  }
});
// изменение пользователя
app.put("/api/users", jsonParser, function(req, res) {

  if (!req.body) return res.sendStatus(400);

  var userId = req.body.id;
  var userName = req.body.name;
  var userAge = req.body.age;

  var data = fs.readFileSync("users.json", "utf8");
  var users = JSON.parse(data);
  var user;
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == userId) {
      user = users[i];
      break;
    }
  }
  // изменяем данные у пользователя
  if (user) {
    user.age = userAge;
    user.name = userName;
    var data = JSON.stringify(users);
    fs.writeFileSync("users.json", data);
    res.send(user);
  } else {
    res.status(404).send(user);
  }
});

// отправкай файла пользователю
app.get("/api/download", function(req, res) {
  let file = `${__dirname}/downloads/download.txt`;
  console.log(`download :: download.txt`);
  res.download(file);
});

app.get("/api/download/:type", function(req, res) {
  let type = req.params.type;
  let file = `${__dirname}/downloads/download.${type}`;
  res.download(file);
  console.log(`download :: download.${type}`);
});

// загрузка файла на сервер
app.post('/api/upload', function(req, res) {
  let storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, './uploads');
    },
    filename: function(req, file, callback) {
      callback(null, `${file.fieldname}-${Date.now()}.pdf`);
    }
  });
  let upload = multer({
    storage: storage
  }).single('fileToUpload');
  upload(req, res, function(err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    console.log(`uploaded :: download.pdf`);
    res.end("File is uploaded");
  });
});

app.post('/api/upload/:type', function(req, res) {
  let type = req.params.type;
  let storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, './uploads');
    },
    filename: function(req, file, callback) {
      callback(null, `${file.fieldname}-${Date.now()}.${type}`);
    }
  });

  let upload = multer({
    storage: storage
  }).single('fileToUpload');

  upload(req, res, function(err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    console.log(`uploaded :: download.${type}`);
    res.end("File is uploaded");
  });
});

app.listen(3000, function() {
  console.log("Сервер ожидает подключения...");
});
