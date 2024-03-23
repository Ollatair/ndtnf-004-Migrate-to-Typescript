import Book from "../models/Book";

export abstract class BooksRepository {
    abstract getBooks(): Promise<any>;
    abstract getBook(id: string): Promise<any>;
    abstract createBook(book: typeof Book): Promise<any>;
    abstract updateBook(id: string, book: typeof Book): Promise<any>;
    abstract deleteBook(id: string): Promise<any>;
  }
