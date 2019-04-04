const express = require('express')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

const app = express()
app.use(bodyParser.json())

const adapter = new FileAsync('./db/db.json')
low(adapter)
  .then(db => {

    app.get('/api/users', (req, res) => {
      const users = db.get('users')
        .value();
      res.send(users)
    });

    app.get('/api/users/:id', (req, res) => {
      const user = db.get('users')
        .find({
          "id": parseInt(req.params.id, 10)
        })
        .value();

      res.send(user)
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
    })

    app.delete('/api/users/:id', (req, res) => {
      db.get('users')
        .remove({
          "id": parseInt(req.params.id, 10)
        })
        .write()
        .then(user => res.send(user[0]));
    });

    app.put('/api/users', (req, res) => {
      const user = db.get('users')
        .find({
          "id": parseInt(req.body.id, 10)
        })
        .assign(req.body)
        .write()
        .then(user => res.send(user));
    });

  })
  .then(() => {
    app.listen(3000, () => console.log('listening on port 3000'))
  })
