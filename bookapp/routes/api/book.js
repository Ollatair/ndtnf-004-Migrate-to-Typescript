const router = require('express').Router();

const fileMulter = require('../../middleware/file');

const {
  getBooks,
  getBook,
  getBookCover,
  createBook,
  updateBook,
  deleteBook,
} = require('../../controllers/booksApi');

router.get('/', getBooks);
router.get('/:id', getBook);
router.get('/:id/download', getBookCover);
router.post('/', fileMulter.single('fileBook'), createBook);
router.put('/:id', fileMulter.single('fileBook'), updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
