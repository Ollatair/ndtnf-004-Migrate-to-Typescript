const router = require('express').Router();
const fileMulter = require('../middleware/file');

const {
  renderIndex,
  renderCreate,
  createBook,
  renderView,
  renderUpdate,
  updateBook,
  deleteBook,
} = require('../controllers/booksPages');

router.get('/', renderIndex);
router.get('/create', renderCreate);
router.post('/create', fileMulter.single('fileBook'), createBook);

router.get('/:id', renderView);
router.get('/update/:id', renderUpdate);
router.post('/update/:id', fileMulter.single('fileBook'), updateBook);
router.post('/delete/:id', deleteBook);

module.exports = router;
