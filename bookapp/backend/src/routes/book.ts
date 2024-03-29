import express  from "express";
 

import {
  getBooks,
  getBook,
  getBookCover,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/booksApi';

const apiBooksRouter = express.Router();

apiBooksRouter.get('/', getBooks);
apiBooksRouter.get('/:id', getBook);
apiBooksRouter.get('/:id/download', getBookCover);
apiBooksRouter.post('/', createBook);
apiBooksRouter.put('/:id', updateBook);
apiBooksRouter.delete('/:id', deleteBook);

export default apiBooksRouter;
