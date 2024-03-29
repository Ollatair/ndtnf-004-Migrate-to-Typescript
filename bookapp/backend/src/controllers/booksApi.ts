import { Request, Response } from "express";
import BookService from "../services/BookService";
import container from "../containers/container";
import defaultList from '../utils/constants';

const repo = container.get(BookService);

export const addBooks = async () => {
  try {
    const promises = defaultList.map(async (book) => {
      const existingBook = await repo.getBookByName(book.title);
      if (!existingBook) {
        await repo.createBook(book);
        console.log(`Книга "${book.title}" успешно добавлена в базу данных`);
      } else {
        console.log(`Книга "${book.title}" уже существует в базе данных`);
      }
    });

    await Promise.all(promises);
  } catch (error) {
    console.error('Ошибка при добавлении книг:', error);
  }
};

// получить все книги | получаем массив всех книг
export const getBooks = (req: Request, res: Response) => {
  repo.getBooks()
    .then((books) => res.status(200).json(books))
    .catch((e) => {
      console.log(e);
    });
};
 
// получить книгу по **ID** | получаем объект книги, если запись не найдена, вернём **Code: 404**
export const getBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await repo.getBook(id);
    res.json(book);
  } catch (error: Error | any) {
    if (error.name === 'DocumentNotFoundError') {
      res.status(404).json('404 | книга не найдена');
    } else {
      res.status(500).json(error.message);
    }
  }
};

// Метод отдаёт на скачиваение файл книги по её **:id**.
export const getBookCover = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await repo.getBook(id);
    const filePath = book.fileBook;
    // Отправка файла на скачивание
    res.download(filePath, (err) => {
      if (err) {
        res.status(404);
        res.json('404 | Файл не найден');
      }
    });
  } catch (error: Error | any) {
    if (error.name === 'DocumentNotFoundError') {
      res.status(404).json('404 | книга не найдена');
    } else {
      res.status(500).json(error.message);
    }
  }
};

// создать книгу | создаём книгу и возвращаем её же вместе с присвоенным **ID**
export const createBook = (req: Request, res: Response) => {
  const {
    title, description, authors, favorite,
    fileCover, fileName,
  } = req.body;
  // const fileBook = req.file ? req.file.path : null;
  const fileBook = '';
  repo.createBook({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  }).then((newBook) => res.status(201).json(newBook))
    .catch((e) => {
      console.log(e);
    });
};

// редактировать книгу по **ID** | редактируем объект книги, если не найдена, вернём **Code: 404**
export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    title, description, authors, favorite,
    fileCover, fileName,
  } = req.body;
  let fileBook = '';
  // if (req.file) {
  //   const { path } = req.file;
  //   fileBook = path;
  // }
  try {
    const book = await repo.updateBook(id, {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook,
    });
    res.json(book);
  } catch (error: Error | any) {
    if (error.name === 'DocumentNotFoundError') {
      res.status(404).json('404 | книга не найдена');
    } else {
      res.status(500).json(error.message);
    }
  }
};

// удалить книгу по **ID** | удаляем книгу и возвращаем ответ: **'ok'**
export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await repo.deleteBook(id);
    res.json('ok');
  } catch (error: Error | any) {
    if (error.name === 'DocumentNotFoundError') {
      res.status(404).json('404 | книга не найдена');
    } else {
      res.status(500).json(error.message);
    }
  }
};
