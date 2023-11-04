const express = require('express');
const router = express.Router();
const showController = require("../controllers/shows.js")
const validation = require("../middleware/validate")

//Show routes
router.get('/', showController.getAllShows);
router.get('/:id', validation.validateId, showController.getShow);
router.post('/', validation.validateShow, showController.postShow);
router.put('/:id', validation.validateShow, showController.putShow);
router.delete('/:id', validation.validateId, showController.deleteShow);

module.exports = router;