import { Request, Response } from "express";
const Message = require('../models/message');

// getMessage
export const getMessage = (req: Request, res: Response) => {
  const { id } = req.params;
  Message.find({ bookid: id })
    .then((messages: any) => res.status(200).json(messages))
    .catch((e: Error | any) => {
      console.log(e);
    });
};

// sendMessage
export const sendMessage = (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(403).json('Нет доступа');
  }
  const {
    bookid, username, message,
  } = req.body;
  Message.create({
    bookid, username, message,
  }).then((newMessage: any) => res.status(201).json(newMessage))
    .catch((e: Error | any) => {
      console.log(e);
    });
};
