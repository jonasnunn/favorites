const express = require('express');
const router = express.Router();
const bookController = require("../controllers/books")
const validation = require("../middleware/validate")

// Book routes
router.get('/', bookController.getAll);
router.get('/:id', validation.validateId, bookController.getSingle);
router.post('/', validation.validateBook, bookController.postBook);
router.put('/:id', validation.validateBook, bookController.editBook);
router.delete('/:id', validation.validateId ,bookController.deleteBook);

module.exports = router;