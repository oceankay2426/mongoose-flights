const Flights = require('../models/flight');

module.exports = {
  index,
  new: newflight,
  create
};

async function index(req, res) {
  const flights = await flights.find({});
  res.render('flights/index', { flights });
}

function newflight(req, res) {
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('flights/new', { errorMsg: '' });
}

async function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // remove any whitespace at start and end of cast
  req.body.cast = req.body.cast.trim();
  // split cast into an array if it's not an empty string - using a regular expression as a separator
  if (req.body.cast) req.body.cast = req.body.cast.split(/\s*,\s*/);
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    await Flights.create(req.body);
    // Always redirect after CUDing data
    // We'll refactor to redirect to the flightss index after we implement it
    res.redirect('/flights');  // Update this line
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('flights/new', { errorMsg: err.message });
  }
}