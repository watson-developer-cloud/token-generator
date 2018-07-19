
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const WatsonAuth = require('watson-developer-cloud/authorization/v1');
const { IamTokenManagerV1 } = require('watson-developer-cloud/iam-token-manager/v1');

// when running in bluemix, automatically redirect http to https
if (process.env.VCAP_APPLICATION) {
  app.use(require('express-secure-only')());
}

app.use(express.static('./public'));

// post so that credentials don't get stored in logs
app.use(bodyParser.urlencoded({extended: false}));
app.post('/api/token', (req, res) => {
  res.type('text/plain');

  if (!req.body.username && !req.body.iamApikey) {
    return res.status(400).send('Error: (username, password, and url) or iam_apikey are required');
  }

  let tokenManager;

  if (req.body.iamApikey) {
    tokenManager = new IamTokenManagerV1({
      ...req.body,
    });
  } else {
    tokenManager = new WatsonAuth({
      username: req.body.username,
      password: req.body.password,
      url: req.body.url
    });
  }
  tokenManager.getToken((err, token) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message || err);
    }
    // note: tokens are percent-encoded already and must not be double-encoded
    res.send(token);
  });
});

module.exports = app;