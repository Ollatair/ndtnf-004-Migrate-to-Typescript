const express = require('express');

const router = express.Router();

const {
  sendMessage,
  getMessage,
} = require('../../controllers/messageApi');

router.get('/:id', getMessage);
router.post('/', sendMessage);

module.exports = router;
