const Flight = require('../models/flight');

module.exports = {
  show,
  index,
  new: newflight,
  create
};

async function create(req, res) {
  
  if (req.body.cast) req.body.cast = req.body.cast.split(/\s*,\s*/);
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    await Flight.create(req.body);
    // Always redirect after CUDing data
    // We'll refactor to redirect to the flightss index after we implement it
    res.redirect('/flights');  // Update this line
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('flights/new', { errorMsg: err.message });
  }
}

function newflight(req, res) {
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('flights/new', { errorMsg: '' });
}

async function index(req, res) {
  const flights = await Flight.find({});
  res.render('flights/index', { flights });
}

async function show(req, res) {

  const flight = await Flight.findById(req.params.id);
  
  res.render('flights/show', { title: 'Flight Detail', flight });
};


