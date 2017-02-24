const express    = require('express'),
      synaptic   = require('synaptic'),
      path       = require('path'),
      bodyParser = require('body-parser'),
      PORT       = 3000,
      app        = express();

var inputLayer  = new synaptic.Layer(2);
var hiddenLayer = new synaptic.Layer(3);
var outputLayer = new synaptic.Layer(1);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

/* Server */
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Endpoints
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, './index.html')); });
app.post('/train-network', (req, res) => {  res.send('Not Implemented');  });
app.post('/input', (req, res) => {  res.send(myNetwork.activate(req.body.data)); });
app.get('/*', (req, res) => { res.status(404).send('Not found'); })
// Listen
app.listen(PORT, () => { console.log('app is listening on port: ' + PORT); });
/* End Server */

// Initialize Nerwork
var myNetwork = new synaptic.Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
});

// Train the network
var learningRate = .3;
for (var i = 0; i < 20000; i++){
    //Training XOR Neural Network
    // 0,0 => 0
    myNetwork.activate([0,0]);
    myNetwork.propagate(learningRate, [0]);
    // 0,1 => 1
    myNetwork.activate([0,1]);
    myNetwork.propagate(learningRate, [1]);
    // 1,0 => 1
    myNetwork.activate([1,0]);
    myNetwork.propagate(learningRate, [1]);
    // 1,1 => 0
    myNetwork.activate([1,1]);
    myNetwork.propagate(learningRate, [0]);
}

// Quick console.log test
console.log(myNetwork.activate([0,0])); // [ 0.00006256959329031066 ]
console.log(myNetwork.activate([0,1])); // [ 0.9995991812402573 ]
console.log(myNetwork.activate([1,0])); // [ 0.9995991812402573 ]
console.log(myNetwork.activate([1,1])); // [ 0.0000991812402573 ]
