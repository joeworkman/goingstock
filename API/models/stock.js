var Stock = {
  init: function(mongoose) {
    //Create a Mongoose Model
    this.model = mongoose.model('Stock', new mongoose.Schema({
      symbol: {type: String, required: true, unique: true},
      companyName: {type: String, required: true, unique: true},
      companyLogoUrl: {type: String, default: 'http://placehold.it/64x64'},
      prices: [Schema.Types.Mixed]}
    }));

    return this;
  },

  create: function(stk, callback) {
    this.model.count(function(err, count) {
      if(err) {
        return callback(err);
      }

      Stock.model.create(stk, callback);
    });
  },

  get: function(symbol, callback) {
    //findOne will return a single object, or null if nothing was found
    this.model.findOne({symbol: symbol}, {__v: 0, _symbol: 0}, callback);
  },

  getAll: function(callback) {
    //find will return an array of users. Without a query for the first
    //param, it will return all users    
    this.model.find({}, {__v: 0, _symbol: 0}, callback);
  },

  delete: function(symbol, callback) {
    this.model.remove({symbol: symbol}, callback);
  }
};

//Allows us to load the model via require
module.exports = Stock;
