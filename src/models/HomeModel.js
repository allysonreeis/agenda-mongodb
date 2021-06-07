const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  name: { type: String, requirede: true},
  email: { type: String, requirede: true}
});

const HomeModel = mongoose.model('Home', HomeSchema);

module.exports = HomeModel;