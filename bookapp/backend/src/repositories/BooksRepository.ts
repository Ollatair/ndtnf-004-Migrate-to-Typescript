import { Book } from "../types/book";

export abstract class BooksRepository {
    abstract getBooks(): Promise<Book[] | null>;
    abstract getBook(id: string): Promise<Book | null>;
    abstract createBook(book: Book): void;
    abstract updateBook(id: string, book: Book): void;
    abstract deleteBook(id: string): void;
  }
