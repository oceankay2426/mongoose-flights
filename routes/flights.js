const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const flightsCtrl = require('../controllers/flights');
	
// GET /flights
router.get('/', flightsCtrl.index);
// GET /flights/new
router.get('/new', flightsCtrl.new);
// POST /flights
router.post('/', flightsCtrl.create);
	
module.exports = router;
