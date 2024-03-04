const BookService = require('../services/BookService');
const container = require('../containers/container');

const repo = container.get(BookService);

// получить все книги | получаем массив всех книг
module.exports.getBooks = (req, res) => {
  repo.getBooks()
    .then((books) => res.status(200).json(books))
    .catch((e) => {
      console.log(e);
    });
};
 
// получить книгу по **ID** | получаем объект книги, если запись не найдена, вернём **Code: 404**
module.exports.getBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await repo.getBook(id).orFail();
    res.json(book);
  } catch (error) {
    if (error.name === 'DocumentNotFoundError') {
      res.status(404).json('404 | книга не найдена');
    } else {
      res.status(500).json(error.message);
    }
  }
};

// Метод отдаёт на скачиваение файл книги по её **:id**.
module.exports.getBookCover = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await repo.getBook(id).orFail();
    const filePath = book.fileBook;
    // Отправка файла на скачивание
    res.download(filePath, (err) => {
      if (err) {
        res.status(404);
        res.json('404 | Файл не найден');
      }
    });
  } catch (error) {
    if (error.name === 'DocumentNotFoundError') {
      res.status(404).json('404 | книга не найдена');
    } else {
      res.status(500).json(error.message);
    }
  }
};

// создать книгу | создаём книгу и возвращаем её же вместе с присвоенным **ID**
module.exports.createBook = (req, res) => {
  console.log(req.body);
  const {
    title, description, authors, favorite,
    fileCover, fileName,
  } = req.body;
  const fileBook = req.file ? req.file.path : null;
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
module.exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const {
    title, description, authors, favorite,
    fileCover, fileName,
  } = req.body;
  let fileBook = null;
  if (req.file) {
    const { path } = req.file;
    fileBook = path;
  }
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
  } catch (error) {
    if (error.name === 'DocumentNotFoundError') {
      res.status(404).json('404 | книга не найдена');
    } else {
      res.status(500).json(error.message);
    }
  }
};

// удалить книгу по **ID** | удаляем книгу и возвращаем ответ: **'ok'**
module.exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await repo.deleteBook(id).orFail();
    res.json('ok');
  } catch (error) {
    if (error.name === 'DocumentNotFoundError') {
      res.status(404).json('404 | книга не найдена');
    } else {
      res.status(500).json(error.message);
    }
  }
};
