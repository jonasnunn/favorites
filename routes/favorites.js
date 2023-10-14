const express = require('express');
const router = express.Router();

const favController = require("../controllers/favorites")

router.get('/', favController.getAll);
router.get('/:id', favController.getSingle);
router.post('/', favController.postBook);
router.put('/:id', favController.editBook);
router.delete('/:id', favController.deleteBook);

module.exports = router;