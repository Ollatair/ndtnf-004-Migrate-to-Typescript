import express  from "express";

const fileMulter = require('../../middleware/file');

import {
  getBooks,
  getBook,
  getBookCover,
  createBook,
  updateBook,
  deleteBook,
} from '../../controllers/booksApi';

const apiBooksRouter = express.Router();

apiBooksRouter.get('/', getBooks);
apiBooksRouter.get('/:id', getBook);
apiBooksRouter.get('/:id/download', getBookCover);
apiBooksRouter.post('/', fileMulter.single('fileBook'), createBook);
apiBooksRouter.put('/:id', fileMulter.single('fileBook'), updateBook);
apiBooksRouter.delete('/:id', deleteBook);

module.exports = router;
