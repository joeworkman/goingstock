var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    db = mongoose.connection

    //Load in the models
    User = require('./models/user').init(mongoose);

//Helps parse the request body for JSON POSTs
app.use(express.bodyParser());

//Listen to some database connection events
db.on('error', console.error);
db.once('open', function() {
  console.log('Database Connected.');
});

//Connect to the database
mongoose.connect('mongodb://read:only@mongo.onmodulus.net:27017/iGi9gavy');

app.get('/symbols', function(req, res) {
  User.getAll(function(err, dudes) {
    if(err) {
      res.send({
        error: err.message
      });
    }

    res.send(dudes);
  });
});

app.get('/symbol/:id', function(req, res) {
  User.get(req.params.id, function(err, dude) {
    if(err) {
      res.send({
        error: err.message
      });
    }

    res.send(dude);
  });
});

app.post('/symbol', function(req, res) {
  if(!req.body.username) {
    return res.send({
      error: 'Users require at least a username.'
    });
  }

  User.create(req.body, function(err, dude) {
    if(err) {
      res.send({
        error: err.message
      });
    }

    res.send(dude);
  });
});

app.delete('/symbol/:id', function(req, res) {
  User.delete(req.params.id, function(err) {
    if(err) {
      res.send({
        error: err.message
      });
    }

    res.send({});
  });
});

//Start the server
app.listen(8675); //309