const express = require('express');
const router = express.Router();
const destinationsCtrl = require('../controllers/destinations');

// POST /destinations/:id/destinations (create destination for a destination)
router.post('/flights/:id/destinations', destinationsCtrl.create);

module.exports = router;