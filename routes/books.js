const express = require('express');
const router = express.Router();
const bookController = require("../controllers/books")
const validation = require("../middleware/validate")

// Book routes
router.get('/', validation.requiresAuth(), bookController.getAll);
router.get('/:id', validation.requiresAuth(), validation.validateId, bookController.getSingle);
router.post('/', validation.requiresAuth(), validation.validateBook, bookController.postBook);
router.put('/:id', validation.requiresAuth(), validation.validateBook, bookController.editBook);
router.delete('/:id', validation.requiresAuth(), validation.validateId ,bookController.deleteBook);

module.exports = router;