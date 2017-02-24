const express    = require('express'),
      synaptic   = require('synaptic'),
      path       = require('path'),
      bodyParser = require('body-parser'),
      port       = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
  console.info('app is listening on port: ' + port);
});

app.post('/train-model', (req, res) => {
  res.send('trained');
});

app.post('/input', (req, res) => {
  res.send('data');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});
