const express = require('express');
const router = express.Router();
const showController = require("../controllers/shows.js")
const validation = require("../middleware/validate")

//Show routes
router.get('/', validation.requiresAuth(), showController.getAllShows);
router.get('/:id', validation.requiresAuth(), validation.validateId, showController.getShow);
router.post('/',  validation.requiresAuth(), validation.validateShow, showController.postShow);
router.put('/:id', validation.requiresAuth(), validation.validateShow, showController.putShow);
router.delete('/:id', validation.requiresAuth(), validation.validateId, showController.deleteShow);

module.exports = router;