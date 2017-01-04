"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const WatsonAuth = require('watson-developer-cloud/authorization/v1');

// when running in bluemix, automatically redirect http to https
if (process.env.VCAP_APPLICATION) {
  app.use(require('express-secure-only')());
}

app.use(express.static('./public'));

// post so that credentials don't get stored in logs
app.use(bodyParser.urlencoded({extended: false}));
app.post('/api/token', (req, res) => {

  res.type('text/plain');

  if (!req.body.username || !req.body.password || !req.body.url) {
    return res.status(400).send('Error: username, password, and url are required');
  }

  new WatsonAuth({
    username: req.body.username,
    password: req.body.password,
    url: req.body.url
  }).getToken((err, token) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message || err);
    }
    // note: tokens are percent-encoded already and must not be double-encoded
    res.send(token);
  });
});

const port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log('Watson Token Generator listening on http://localhost:%s/', port);
});
