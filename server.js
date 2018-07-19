const app = require('./app');

const port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log('Watson Token Generator listening on http://localhost:%s/', port);
});
