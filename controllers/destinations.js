const Flight = require('../models/flight');

module.exports = {
    create
  };
  
  async function create(req, res) {
    const flight = await Flight.findById(req.params.id);
    // We can push (or unshift) subdocs into Mongoose arrays
    flight.destinations.push(req.body);
    try {
      // Save any changes made to the flight doc
      await flight.save();
    } catch (err) {
      console.log(err);
    }
    res.redirect(`/flights/${flight._id}`);
  }