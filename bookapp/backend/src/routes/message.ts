import express  from "express";

const apiMessagesRouter = express.Router();

const {
  sendMessage,
  getMessage,
} = require('../controllers/messageApi');

apiMessagesRouter.get('/:id', getMessage);
apiMessagesRouter.post('/', sendMessage);

export default apiMessagesRouter;
