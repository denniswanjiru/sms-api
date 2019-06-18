import express from 'express';

import MessagesController from '../controllers/messages.mjs';
// import Validator from '../middlewares/messagesValidator';

const router = express.Router();

router.get('/', MessagesController.getMessages);
router.post('/', MessagesController.sendMessage);
router.get('/:id', MessagesController.getMessage);
router.patch('/:id', MessagesController.updateMessage);
router.delete('/:id', MessagesController.deleteMessage);

export default router;