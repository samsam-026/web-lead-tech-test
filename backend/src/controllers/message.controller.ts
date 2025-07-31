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
    const { userId, content } = req.body;
    const newMessage: Message = { id: Date.now(), userId, content, timestamp: new Date() };
    messages.push(newMessage);
    fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), err => {
      if (err) {
        return next(err);
      }
      res.status(201).json(newMessage);
    });
  } catch (error) {
    next(error);
  }
};

// Read all messages
export const getMessages = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(messages);
  } catch (error) {
    next(error);
  }
};
