process.config = {
  api: 'http://localhost:8675'
};

var express = require('express'),
    app = express(),

    //Load the controllers
    stock = require('./controllers/stock');

//Allows the serving of static files from the public directory
app.use(express.static(__dirname + '/public'));

//Some Server configuration
app.use(express.bodyParser());
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  stock.get(function(err, stocks) {
    if(err) {
      console.log(err);
      return res.render('index', {stocks: []});
    }

    res.render('index', {stocks: stocks});
  });
});

app.get('/stock/:id', function(req, res) {
  stock.get(req.params.id, function(err, stock) {
    if(err) {
      console.log(err);
      return res.render('stock', {});
    }

    res.render('stock', stock);
  });
});

app.get('/new', function(req, res) {
  res.render('new');
});

//Save a movie, set it to the latest
app.post('/stock', function(req, res) {
  stock.create(req.body, function(err, stock) {
    if(err) {
      return res.send(err);
    }

    //sanatize the data
    delete stock._id;
    delete stock.__v;

    res.send(stock);
  });
});

//Start the app
var port = process.env.PORT || 2013;
app.listen(port);
console.log('front end site running on port ' + port);