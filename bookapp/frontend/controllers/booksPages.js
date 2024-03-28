const booksAPI = require('../utils/bookApi');


// index — просмотр списка всех книг (вывод заголовков);
module.exports.renderIndex = (req, res) => {
  booksAPI.getAllBooks()
  .then((books) => res.status(200).render('books/index', {
    title: 'Книги',
    books,
  }))
  .catch((e) => {
    console.log(e);
  });
  
};

// создать книгу
module.exports.renderCreate = (req, res) => {
  res.render('books/create', {
    title: 'Книга | добавить',
    book: {},
  });
};

// создать книгу
module.exports.createBook = (req, res) => {
  const {
    title, description, authors, favorite,
    fileCover, fileName,
  } = req.body;
  const fileBook = req.file ? req.file.path : '';
  booksAPI.createBook({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  })
  .then(() => res.redirect('/books'))
    .catch((e) => {
      console.log(e);
    });
};

// создать книгу
module.exports.renderView = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await booksAPI.getBookById(id);
    let cnt = 0;
    try {
      const response = await fetch(`${BASE_URL}:${PORT}/counter/${id}/incr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      cnt = data.cnt;
    } catch (error) {
      console.log(error);
    }
    user = req.isAuthenticated() ? req.user : null;
 
    const messages = await Message.find( {bookid: id} ).sort({ createdAt: -1 })
    for (const message of messages) {
      const user = await User.findOne({ username: message.username });
      if (user) {
          message.username = user.displayName;
      }
  }
  
    res.render('books/view', {
      title: `Книга | ${book.title}`,
      book,
      user,
      messages,
      count: cnt,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/404');
  }
};

// update — редактирование книги
module.exports.renderUpdate = (req, res) => {
  const { id } = req.params;
  booksAPI.getBookById(id).orFail()
    .then((book) => res.render('books/update', {
      title: `Книга | ${book.title}`,
      book,
    }))
    .catch((e) => {
      console.log(e);
      res.redirect('/404');
    });
};

// update — редактирование книги
module.exports.updateBook = (req, res) => {
  const { id } = req.params;
  const {
    title, description, authors, favorite,
    fileCover, fileName,
  } = req.body;
  const isFavorite = favorite === 'on' || Boolean(favorite);
  const fileBook = req.file ? req.file.path : null;
  booksAPI.updateBookById(id, {
    title,
    description,
    authors,
    favorite: isFavorite,
    fileCover,
    fileName,
    fileBook,
  }).orFail()
    .then(() => res.redirect(`/books/${id}`))
    .catch((e) => {
      console.log(e);
      res.redirect('/404');
    });
};

// удалить книгу по **ID**
module.exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await booksAPI.deleteBookById(id);
    res.redirect('/books');
  } catch (error) {
    console.log(error);
    res.redirect('/404');
  }
};
