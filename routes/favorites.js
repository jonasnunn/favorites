const express = require('express');
const router = express.Router();

const favController = require("../controllers/favorites.js")

router.get('/', favController.getAll);
router.get('/:id', favController.getSingle);

module.exports = router;