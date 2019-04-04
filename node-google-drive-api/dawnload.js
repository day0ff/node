const url = 'https://drive.google.com/open?id=1yRcZ17t3ciBhDaqSXMwcHqcS43--Fsmy';

const https = require('https');
const fs = require('fs');

const download = function(url, dest, cb) {
  let file = fs.createWriteStream(dest);
  let request = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);
    }).on('error', (e) => {
      console.error(e);
    });
  }).on('error', (e) => {
    console.error(e);
  });
}

download(url, './db/test.js', () => console.log('finish'));
