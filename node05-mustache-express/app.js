const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');

const app = express();
app.use(bodyParser.json());

app.engine('mst', mustacheExpress());
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

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

app.get('/person', (req, res) => {
  res.render('index', {name: 'Harry'})
});

app.use((req, res) => {
  res.status(400);
  res.render('404', {title: '404: File Not Found', url: `${req.protocol}://${req.get('host')}${req.originalUrl}`});
});

app.use((error, req, res) => {
  res.status(500);
  res.render('404', {title: '500: Internal Server Error', error: error});
});

app.listen(3000, function () {
  console.log('listening on port 3000');
});