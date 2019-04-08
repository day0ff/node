const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const adapter = new FileAsync('./db/db.json');
low(adapter)
  .then(db => {

    app.get('/', (req, res) => {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      fs.readFile('.public/index.html', null, (error, data) => {
        if (error) {
          res.writeHead(404);
          res.write('Whoops! File not found!');
        } else {
          res.write(data);
        }
        res.end();
      });
    });


    app.get('/api', (req, res) => {
      const record = db.get('root')
        .value();
      res.send(record);
    });

    app.get('/api/all', (req, res) => {
      const record = db.get('root')
        .value();
      res.send(record);
    });

    app.get('/api/:field', (req, res) => {
      const record = db.get(`root.${req.params.field}`)
        .value();
      res.send(record);
    });

    app.put('/api/:field', (req, res) => {
      db.get(`root.${req.params.field}`)
        .assign(req.body)
        .write()
        .then(field => res.send(field));
    });

    app.put('/api/users', (req, res) => {
      db.get('users')
        .find({
          "id": parseInt(req.body.id, 10)
        })
        .assign(req.body)
        .write()
        .then(user => res.send(user));
    });

    app.post('/api/submit', (req, res) => {
      db.get(`root`)
        .assign(req.body)
        .write()
        .then(root => res.send(root));
    });

    app.post('/api/:field', (req, res) => {
      db.get(`root.${req.params.field}`)
        .assign(req.body)
        .write()
        .then(field => res.send(field));
    });

    app.post('/api/users', (req, res) => {
      const ID = db.get('users').size().value() + 1;
      db.get('users')
        .push(req.body)
        .last()
        .assign({
          "id": ID
        })
        .write()
        .then(user => res.send(user));
    });

    app.get('/api/users/:id', (req, res) => {
      const user = db.get('users')
        .find({
          "id": parseInt(req.params.id, 10)
        })
        .value();

      res.send(user)
    });


    app.delete('/api/users/:id', (req, res) => {
      db.get('users')
        .remove({
          "id": parseInt(req.params.id, 10)
        })
        .write()
        .then(user => res.send(user[0]));
    });

  })
  .then(() => {
    app.listen(3000, () => console.log('listening on port 3000'))
  });
