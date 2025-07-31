import { Router } from 'express';

import { createMessage, getMessages } from '../controllers/message.controller';

const route = Router();

route.get('/:senderId/:recipientId', getMessages);
route.post('/', createMessage);

export default route;
