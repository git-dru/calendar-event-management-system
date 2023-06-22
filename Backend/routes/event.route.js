const express = require('express');
const controller = require('../controllers/event.controller')

const router = express.Router();
router.route('/').get(controller.getAll);
router.route('/create').post(controller.create);
router.route('/:id').put(controller.update);
router.route('/:id').delete(controller.remove);

module.exports = router;