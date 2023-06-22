const express = require('express');

const eventRoutes = require('./event.route')

const router = express.Router();

router.use('/event', eventRoutes);

module.exports = router;