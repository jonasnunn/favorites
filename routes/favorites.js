const express = require('express');
const router = express.Router();

const favController = require("../controllers/favorites")
const validation = require("../middleware/validate")

router.get('/', favController.getAll);
router.get('/:id', favController.getSingle);
router.post('/', validation.validateBook, favController.postBook);
router.put('/:id', validation.validateBook, favController.editBook);
router.delete('/:id', favController.deleteBook);

module.exports = router;