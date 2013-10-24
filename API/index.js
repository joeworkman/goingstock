var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    db = mongoose.connection

    //Load in the models
    Stock = require('./models/stock').init(mongoose);

//Helps parse the request body for JSON POSTs
app.use(express.bodyParser());

//Listen to some database connection events
db.on('error', console.error);
db.once('open', function() {
  console.log('Database Connected.');
});

//Connect to the database
mongoose.connect('mongodb://write:n0d3@mongo.onmodulus.net:27017/iGi9gavy');

app.get('/stocks', function(req, res) {
  Stock.getAll(function(err, dudes) {
    if (err) res.send({error: err.message});
    res.send(dudes);
  });
});

app.get('/stock/:id', function(req, res) {
  Stock.get(req.params.id, function(err, dude) {
    if (err) res.send({error: err.message});
    res.send(dude);
  });
});

app.post('/stock', function(req, res) {
  if (!req.body.symbol)  return res.send({error: 'Stocks require a stock symbol.'});
  if (!req.body.companyName) return res.send({error: 'Stocks require a company name.'});

  Stock.create(req.body, function(err, dude) {
    if (err) res.send({error: err.message});
    res.send(dude);
  });
});

app.delete('/stock/:id', function(req, res) {
  Stock.delete(req.params.id, function(err) {
    if (err) res.send({error: err.message});
    res.send({});
  });
});

//Start the server
var port = process.env.PORT || 8675;
app.listen(port);
console.log('Server running on port ' + port);