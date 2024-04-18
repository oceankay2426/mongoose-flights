const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  seat: {
    type: String,
  },
  price: {
    type: Number,
    min: 0
  },
  flight: {
    type: Schema.Types.ObjectId,
    ref: 'Flight'
  }
}, {
  timestamps: true
});

const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'HOU', 'LAX', 'SAN']
  },
  arrival: {
    type: Date,
    default: function () {
      return new Date().getFullYear();
    }
  }
}, {
  timestamps: true
});

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ['American Airlines', 'Delta', 'United', 'Southwest']
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
  },
  destinations: [destinationSchema],
  ticket: [ticketSchema]
},);

// Compile the schema into a model and export it
module.exports = mongoose.model('Flight', flightSchema);