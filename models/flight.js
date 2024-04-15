const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const flightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  airport: { type: String,
    enum: ['AUS', 'DFW', 'HOU', 'LAX', 'SAN']
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999
  },
  date: {
    type: Number,
    default: function() {
      return new Date().getFullYear();
    },
    min: 2025
  },
}, {
  timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('flight', flightSchema);