import { injectable } from "inversify";
import { Book as BookType } from "../types/book";
import Book from "../models/book";
import { BooksRepository } from "../repositories/BooksRepository";

interface createBookDTO {
	title: BookType["title"];
	description: BookType["description"];
	authors: BookType["authors"];
	favorite: BookType["favorite"];
	fileName: BookType["fileName"];
	fileCover: BookType["fileCover"];
	fileBook: BookType["fileBook"];
}

@injectable()
export default class BookService extends BooksRepository { 
	async createBook(book: createBookDTO) {
		const newBook = new Book(book);
		await newBook.save();
		return newBook;
	}

	async getBook(bookId: string): Promise<any> {
            const book = await Book.findById(bookId);
            return book;
    }

	async getBookByName(bookName: string): Promise<any> {
            const book = await Book.findOne({ title: bookName });
            return book;
    }

	async getBooks(): Promise<any> {
		const books = await Book.find();
        return books;
	}

	async updateBook(bookId: string, book: createBookDTO): Promise<any> {
		await Book.findByIdAndUpdate(bookId, book);
	}

	async deleteBook(bookId: string): Promise<any> {
		await Book.findByIdAndDelete(bookId);
	}

}