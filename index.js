process.config = {
  api: 'http://localhost:8675'
};

var express = require('express'),
    app = express(),

    //Load the controllers
    User = require('./controllers/user');

//Allows the serving of static files from the public directory
app.use(express.static(__dirname + '/website/app/index.html'));

//Some Server configuration
app.use(express.bodyParser());
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  User.get(function(err, users) {
    if(err) {
      console.log(err);
      return res.render('index', {users: []});
    }

    res.render('index', {users: users});
  });
});

// app.get('/user/:id', function(req, res) {
//   User.get(req.params.id, function(err, user) {
//     if(err) {
//       console.log(err);
//       return res.render('user', {});
//     }

//     res.render('user', user);
//   });
// });

// app.get('/new', function(req, res) {
//   res.render('new');
// });

// //Save a movie, set it to the latest
// app.post('/user', function(req, res) {
//   User.create(req.body, function(err, user) {
//     if(err) {
//       return res.send(err);
//     }

//     //sanatize the data
//     delete user._id;
//     delete user.__v;

//     res.send(user);
//   });
// });

//Start the app
app.listen(2013);