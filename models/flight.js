const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ['American Airlines', 'Delta', 'United', 'Southwest' ]
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'HOU', 'LAX', 'SAN']
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
    require: true
  },
  departs: {
    type: Date,
    default: function () {
      const today = new Date();
      const year = today.getFullYear();
      return today.setFullYear(year + 1);
    }
  }
},);

// Compile the schema into a model and export it
module.exports = mongoose.model('flight', flightSchema);