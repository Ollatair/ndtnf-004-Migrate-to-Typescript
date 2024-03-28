import "reflect-metadata";
import { injectable } from "inversify";
import { Book as BookType } from "../types/book";
import Book from "../models/book";
import { BooksRepository } from "../repositories/BooksRepository";

interface createBookDTO {
	id: BookType["id"];
	title: BookType["title"];
	description: BookType["description"];
	authors: BookType["authors"];
	favorite: BookType["favorite"];
	fileName: BookType["fileName"];
	filecover: BookType["fileCover"];
	filebook: BookType["fileBook"];
}

@injectable()
export default class BookService extends BooksRepository { 
	async createBook(book: BookType): Promise<any> {
		const newBook = new Book(book);
		await newBook.save();
		return newBook;
	}

	async getBook(bookId: string): Promise<any> {
            const book = await Book.findById(bookId);
            return book;
    }

	async getBooks(): Promise<any> {
		const books = await Book.find();
        return books;
	}

	async updateBook(bookId: string, book: BookType): Promise<any> {
		await Book.findByIdAndUpdate(bookId, book);
	}

	async deleteBook(bookId: string): Promise<any> {
		await Book.findByIdAndDelete(bookId);
	}

}