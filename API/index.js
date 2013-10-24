var csv = require('csv');
var request = require("request");
var moment = require("moment");
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

app.get('/stock/:symbol', function(req, res) {
  Stock.get(req.params.symbol, function(err, dude) {
    if (err) res.send({error: err.message});
    res.send(dude);
  });
});

app.post('/stock', function(req, res) {
	if (!req.body.symbol)  return res.send({error: 'Stocks require a stock symbol.'});
	if (!req.body.companyName) return res.send({error: 'Stocks require a company name.'});

	yahooUrl = "http://ichart.yahoo.com/table.csv?a=0&b=1&c=2013&d=10&e=31&f=2013&g=w&ignore=.csv&s="+req.body.symbol;

	req.body.prices = [];

	request(yahooUrl, function(error, response, body) {
		csv().from.string(body,{comment:'#'}).to.array(function(data){
			for (var i = data.length - 1; i > 0; i--) {
				req.body.prices.push({
					'date'   : moment(data[i][0]).format(),
					'open'   : data[i][1],
					'high'   : data[i][2],
					'low'    : data[i][3],
					'close'  : data[i][4],
					'volume' : data[i][5]
				});
			};
			//console.log(prices);

			console.log(req.body);

			Stock.create(req.body, function(err, dude) {
			  if (err) res.send({error: err.message});
			  res.send(dude);
			});
		});
	});


});

app.delete('/stock/:symbol', function(req, res) {
  Stock.delete(req.params.symbol, function(err) {
    if (err) res.send({error: err.message});
    res.send({});
  });
});

//Start the server
var port = process.env.PORT || 8675;
app.listen(port);
console.log('API running on port ' + port);
