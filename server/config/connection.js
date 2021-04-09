const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'cluster0-shard-00-02.bj2jv.mongodb.net:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

module.exports = mongoose.connection;
