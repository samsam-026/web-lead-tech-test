import { Request, Response, NextFunction } from 'express';

import { Message } from '../models/message';

import fs from 'fs';
import path from 'path';

const messagesFile = path.join(__dirname, '../../messages.json');
let messages: Message[] = [];

// Load messages from file if exists
if (fs.existsSync(messagesFile)) {
  try {
    const data = fs.readFileSync(messagesFile, 'utf-8');
    messages = JSON.parse(data);
  } catch (err) {
    messages = [];
  }
}

// Create an item
export const createMessage = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { senderId, recipientId, content } = req.body;
    const newMessage: Message = { id: Date.now(), senderId, recipientId, content, timestamp: new Date() };
    messages.push(newMessage);
    // fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), err => {
    //   if (err) {
    //     return next(err);
    //   }
    //   res.status(201).json(newMessage);
    // });
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

// Read all messages
export const getMessages = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { senderId, recipientId } = req.params;
    const filteredMessages = messages.filter(
      message =>
        (message.senderId === Number(senderId) || message.recipientId === Number(senderId)) &&
        (message.recipientId === Number(recipientId) || message.senderId === Number(recipientId))
    );
    res.json(filteredMessages);
  } catch (error) {
    next(error);
  }
};
